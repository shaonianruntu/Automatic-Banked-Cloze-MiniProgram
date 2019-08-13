//index.js
const app = getApp()

Page({
  //全局函数
  data:{
    csid: '',
    ques_line: "",
    answer_line: "",
    result_line: "",
  },

  onLoad(){
    this.ctx = wx.createCameraContext()
  },

  //拍摄图片
  takePhoto(){
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const filePath = res.tempImagePath
        this.setData({
          src: filePath
        })
        this.uploadFile(filePath)
      }
    })
    //查询数据库的结果，显示在question栏中
    if(this.csid){
      const db = wx.cloud.database()
      db.collection("home").doc(this.csid).get({
        success: res => {
          this.setData({
            ques_line: String(res.data.ques_line)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
          console.log(res.data.ques_line)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }  
  },

  //选取图片
  takeAnotherPhoto() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        this.setData({
          src: filePath
        })
        wx.showLoading({
          title: '图像识别中',
        })
        this.uploadFile(filePath)
      }
    })
  },

  //将拍摄到的图片上传到微信云存储
  uploadFile(filePath){
    const sjs = Math.floor(Math.random() * 1500);
    const cloudPath = sjs + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        app.globalData.fileID = res.fileID
        app.globalData.cloudPath = cloudPath
        app.globalData.imagePath = filePath
        this.getTempFileURL()
      }
    })   
  },

  //从微信云存储中获取图片的临时链接
  getTempFileURL(){
    wx.cloud.getTempFileURL({
      fileList: [app.globalData.fileID],
      success: res => {
        console.log('图片真实链接获取成功：', res.fileList[0])
        const bTempFileURL = res.fileList[0].tempFileURL
        app.globalData.tempFileURL = bTempFileURL
        this.addNameImage()     
      },
      fail: err => {
        wx.showToast({
          title: '获取图片链接失败',
          icon: "none"
        })
      }
    })
  },

  //将图片加载到微信云数据库中 
  addNameImage(){
    const db = wx.cloud.database();
    db.collection("home").add({
      data: {
        fileID: app.globalData.fileID,
        imagePath: app.globalData.filePath,
        cloudPath: app.globalData.cloudPath,
        tempFileURL: app.globalData.tempFileURL,
      },
      success: res => {
        console.log('[图片] [数据库] [新增记录] 成功，记录 _id: ', res._id)
        app.globalData.imageID = res._id
        this.parseImage()
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[图片] [数据库] [新增记录] 失败：', err)
      },
    })
  },

  //调用云函数对图片进行ocr识别解析
  parseImage(){
    //调用云函数接口解析图片
    wx.cloud.callFunction({
      name: 'parseNameImage',
      data: {
        url: app.globalData.tempFileURL
      }
    }).then(res => {
      console.log(res.result)
      if (res.result.code != 0) {
        console.log("解析失败，请重试！！！")
        return;
      }
      console.log("解析成功～")
      this.wordMachining(res.result.data);
      this.addNameImageDetail()
    })
  },

  //将解析出来的图片的文本信息添加到数据库中
  addNameImageDetail() {
    const db = wx.cloud.database();
    let ncId = app.globalData.imageID;
    db.collection('home').doc(ncId).update({
      data:{
        question: app.globalData.question,
        answer: app.globalData.answer
      },
      success: res => {
        console.log('$ [图片] [数据库] [update 记录] [ocr] 成功 $')
        this.showQuestionAnswer()
      }, 
    }) 
  },

  //ocr结果字序列处理程序
  wordMachining(result) {
    console.log(result)
    let question = []
    let answer = []
    let flag = 0
    result.items.forEach(function (item) {
      //console.log(item.itemstring);
      console.log(item)
      if (flag == 0) {
        if (/(\d+\. .+)/.test(item.itemstring)) {
          flag = 1
          question.push(item.itemstring.replace(/(^[^a-zA-Z]*)|([^a-zA-Z]*$)/g, ""))
        }
        else {
          return
        }
      }
      else if (flag == 1) {
        if (/([A-D]\. .+)/.test(item.itemstring)) {
          flag = 2
          answer.push(item.itemstring.replace(/(^[^a-zA-Z]*)|([^a-zA-Z]*$)/g, ""))
        }
        else {
          question.push(item.itemstring.replace(/(^[^a-zA-Z]*)|([^a-zA-Z]*$)/g, ""))
        }
      }
      else if (flag == 2) {
        if (/([A-D]\. .+)/.test(item.itemstring)) {
          answer.push(item.itemstring.replace(/(^[^a-zA-Z]*)|([^a-zA-Z]*$)/g, ""))
        }
        else {
          flag = 3
          return
        }
      }
      else {
        return
      }
    })
    console.log(question)
    console.log(answer)
    app.globalData.question = question
    app.globalData.answer = answer
  },

  //显示问题和候选项的结果
  showQuestionAnswer(){
    wx.hideLoading()
    this.setData({
      ques_line: app.globalData.question.join("\n"),
      answer_line: app.globalData.answer.join("\n")
    })
  },

  //响应Question栏输入结束事件
  bindQuestion(e){
    this.setData({
      ques_line: e.detail.value
    })
  },

  //响应Answer栏输入结束事件
  bindAnswer(e){
    this.setData({
      answer_line: e.detail.value
    })  
  },

  sendQuestion(){
    console.log(this.data.ques_line)
    console.log(this.data.answer_line)
    app.globalData.question = this.data.ques_line.split("\n")
    app.globalData.answer = this.data.answer_line.split("\n")
    this.addNameImageDetail()
    wx.showLoading({
      title: '计算中',
    })

    //运行ngram模型,进行计算

    //下方删去了服务器部分的回传处理代码，用手工示例答案来代替。
    
    var _this = this
    setTimeout(function () {
      console.log("延迟调用============")
      wx.hideLoading()
      _this.setData({
        result_line: "D. to; for"
      })
    }, 3000);

  }

})

