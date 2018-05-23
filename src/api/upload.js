import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.IMAGE_ROOT,
  // 请求超时时间
  timeout: 10000
})

let imageRoot = process.env.IMAGE_ROOT
/**
 * 上传头像url
 * @type {string}
 */
export const uploadAvatar = imageRoot + '/upload/image'

/**
 * 单个上传图片
 * @type {string}

 */
export const uploadImage = imageRoot + '/upload/image'

/**
 * 加载头像图片前缀
 * @type {string}
 */
export const avatarUrl = imageRoot + '/uploaded/img/'

/**
 * 加载原图前缀
 * @type {string}
 */
export const sourceImgUrl = imageRoot + '/uploaded/img/'

/**
 * 根据uuid获取图片
 * @param uuid
 * @returns {string}
 */
export const getBrowseImgUrl = uuid => {
  // 图片不存在
  if (!uuid) {
    return ''
  }
  // 图片包含http 或 https
  if (uuid.indexOf('http://') > -1 || uuid.indexOf('https://') > -1) {
    return uuid
  }
  // 拼接上项目前缀http或https
  return imageRoot + '/uploaded/img/' + uuid
}

/**
 * 生成音频
 * @type {string}
 */
export const uploadAudio = lineNo => {
  return service.get('/upload/audio/generateSample?lineNo=' + lineNo)
}

/**
 * 根据队列号获取音频
 * @param lineNo
 * @returns {string}
 */
export const getAudioUrl = lineNo => {
  // 音频不存在
  if (!lineNo) {
    return ''
  }
  return imageRoot + '/uploaded/audio/' + lineNo + '.mp3'
}
