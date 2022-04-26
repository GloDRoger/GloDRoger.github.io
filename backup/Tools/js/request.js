import axios from 'axios'
import router from '../router'
import tool from '@/js/public.js'
import store from '../store/publicStore'
const baseURL = process.env.NODE_ENV === "production" ? window.baseAddUrl : process.env.BASS_API;
const service = axios.create({
    baseURL: baseURL,//测试环境请求地址
    timeout: 150000,
})
let url = [
    '/api/user/username/exists',
    '/api/user/new/register',
    '/api/user/login',
    '/api/user/userl',
] // 用户名检测，和注册，登录需要添加请求头
service.interceptors.request.use(
    (config) => {
        if (tool.GetCookie('token')) {
            // 判断cookie携带token
            config.headers['Authorization'] = tool.GetCookie('token')
        }
        config.headers["Requested-Site"] = process.env.NODE_ENV === "production" ? window.siteHeaders.site : process.env.SITE_TAG || "a02";
        config.headers['Requested-Language'] = window.localStorage.getItem('language_' + window.siteHeaders.site_tag) || window.siteHeaders.language
        config.headers['Requested-Device'] = window.siteHeaders.device
        config.headers['Requested-Agent'] = window.siteHeaders.agent

        if (url.includes(config.url)) {
            config.headers['Accept-Cookie'] = store.state.webtoken
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        const res = response.data
        switch (res.status_code) {
            case 200:
            case 406:
                return res
            default:
                return Promise.reject(res)
        }
    },
    (error) => {
        tool.Loading(false)
        if (error.response.status_code == 504) {
            error.message = '服务器繁忙(504)，请稍后再尝试'
        }
        return Promise.reject(error)
    }
)
export default service

/**处理iframe  */
window.onmessage = (e) => {
}
