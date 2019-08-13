//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wxdabeed4f93870d5a-8m6oc',
        traceUser: true,
      })
    }

    this.globalData = {}
  }

  
})
