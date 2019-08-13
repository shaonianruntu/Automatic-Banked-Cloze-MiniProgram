// 云函数入口文件
const {
  ImageClient
} = require('image-node-sdk');

let AppId = '1253572581'; // 腾讯云 AppId
let SecretId = 'AKID672rWzFOK4ueEdmtkPvHsS4oMjuuoJl2'; // 腾讯云 SecretId
let SecretKey = 'FKJ7pW1ObiiXBdtxpW6Vq02tb7g7NROA'; // 腾讯云 SecretKey

let imgClienst = new ImageClient({ AppId, SecretId, SecretKey });

// 云函数入口函数
exports.main = async (event) => {
  const idCardImageUrl = event.url;
  const result = await imgClient.ocrGeneral({
    data: {
      url: idCardImageUrl,
    },
  });
  console.log(result.body)
  return JSON.parse(result.body)
}



/*
.then((result) => {
    console.log(result.body)
    return JSON.parse(result.body).result_list[0]
  }).catch((e) => {
    console.log(e);
  });
 */
