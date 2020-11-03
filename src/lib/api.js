import { post, get } from './axios'
const CryptoJS = require('crypto-js')
// const reqwest = require('reqwest')
// const xhr = require('xhr')
// const querystring = require('querystring')

const editWebideCode = (filePath, userId, id) => {
  return post('/idecompiler/webideCode/editWebideCode', {
    filePath: filePath,
    userId: userId,
    id: id,
  })
}
const getFileData = filePath => {
  return get(filePath, {}, {})
}

// 系统配置
const config = {
  // 印刷文字多语种 webapi接口地址
  hostUrl: 'https://webapi.xfyun.cn/v1/service/v1/ocr/recognize_document',
  host: 'webapi.xfyun.cn',
  //在控制台-我的应用-印刷文字识别多语种获取
  appid: '5f0c296c',
  // 接口密钥(webapi类型应用开通印刷文字识别多语种服务后，控制台--我的应用---印刷文字识别多语种---服务的apikey)
  apiKey: '31cb1e5568b3a0fc644b775322f574bb',
  uri: '/v1/recognize_document',
  // 本地上传图片
  file: './ocr.jpeg',
}

// 获取当前时间戳
let ts = parseInt(new Date().getTime() / 1000)

// 组装业务参数
function getXParamStr() {
  let xParam = {
    engine_type: 'recognize_document',
  }
  return CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(xParam))
  )
}

// 组装请求头
function getReqHeader() {
  let xParamStr = getXParamStr()
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': config.appid,
    'X-CurTime': ts + '',
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum,
    'Access-Control-Allow-Origin': '*',
  }
}

const recognize = imageData => {
  const options = {
    headers: getReqHeader(),
  }
  return post(config.hostUrl, { image: imageData }, options)
}
export { editWebideCode, getFileData, recognize }
