import request from '@/utils/request.js'
import axios from 'axios'

let configHref = {
  Webdata: '/api/webui/home', // 网站基本信息
  Login: '/api/user/login', // 会员登录
}

let exportObj = {}
for (var k in configHref) {
  let url = configHref[k]
  exportObj[k] = function (data) {
    // const source = axios.CancelToken.source()
    return request({
      url: url,
      method: 'post',
      data,
      // cancelToken: source.token,
      // source : source
    })
  }
}
export default exportObj
