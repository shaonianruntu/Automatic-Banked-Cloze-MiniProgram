# English-Multiple-Choice-And-Cloze-Test-Agent
英语选词填空智能作答机器人

# 代码文件说明
- 微信小程序
    - cloudfunctions： 微信小程序云平台
    - miniprogram： 微信小程序本地客户端
    - project.config.json
    - wxREADME.md： 微信小程序说明文件
- 语言模型预测算法
    - 选词填空句子预测算法.py
- 项目说明文件：
    - README.md

# 实验开发环境 
- 微信小程序基础库版本：2.7.0
- 微信小程序开发语言：JavaScript、WXML、WXSS
- 云服务器操作系统：Ubuntu 16.04
- 语言模型算法开发语言：Python3.7、KenLM

# 微信小程序运行要求
微信小程序的云平台的 parseNameImage 云函数使用了[腾讯云智能图像服务](https://github.com/TencentCloudBase/image-node-sdk)。

运行之前需要在 cloudfunctions/parseNameCard 目录下，运行以下命令，安装相关依赖，从而实现对 [腾讯云通用印刷体识别ocrGeneral](https://cloud.tencent.com/document/product/866/17600) 服务的调用。
```bash
npm i --save image-node-sdk
```
在安装 image-node-sdk 依赖的时候，记得需要删除 parseNameImage 目录下的 package-lock.json 文件。

关于 [腾讯云智能图像服务](https://github.com/TencentCloudBase/image-node-sdk) 和微信小程序云函数调用的进一步了解，请参考：
- [小程序·云开发 - 专业 - 在线学习中心](https://cloud.tencent.com/edu/learning/major-100018)
- [从0到1开发AI智能名片识别小程序-微信小程序开发-精选专业-在线课程-文档学习 - 腾讯云学院 - 在线学习中心](https://cloud.tencent.com/edu/learning/course-100018-1274)
- [文字识别 OCR_文本智能识别_图片文字识别 - 腾讯云](https://cloud.tencent.com/product/ocr)


