import store from '@/store/publicStore.js'
import router from '@/router/index.js'
const alert = utils.dynamicImportComponents('alert')
const loading = utils.dynamicImportComponents('loading')
const password = utils.dynamicImportComponents('password')
const tiops = utils.dynamicImportComponents('tiops')
import QRCode from 'qrcodejs2'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const language = window.localStorage.getItem('language_' + window.siteHeaders.site_tag)
    ? window.localStorage.getItem('language_' + window.siteHeaders.site_tag)
    : window.siteHeaders.language // 语言类
const i18n = new VueI18n({
    locale: window.localStorage.getItem('language_' + window.siteHeaders.site_tag)
        ? window.localStorage.getItem('language_' + window.siteHeaders.site_tag)
        : window.siteHeaders.language, // 语言类型
    messages: {
        CN: require('../language/cn'),
        EN: require('../language/en'),
        TH: require('../language/th'),
        VI: require('../language/vi'),
    },
})
class tool {
    Time(t) {
        // 时间格式化 传时间蹉 或者 new Date()offsetHeight
        let time, year, month, day, hour, minute, second, week, formatTime
        let utc, utcyear, utcmonth, utcday, utchour, utcminute, utcsecond, utcweek, utcformatTime

        if (typeof t === 'object') {
            time = t
        } else {
            t = String(t).length <= 10 ? Number(t) * 1000 : Number(t)
            time = new Date(Number(t))
        }

        year = time.getFullYear()
        month = ('0' + (time.getMonth() + 1)).slice(-2)
        day = ('0' + time.getDate()).slice(-2)
        hour = ('0' + time.getHours()).slice(-2)
        minute = ('0' + time.getMinutes()).slice(-2)
        second = ('0' + time.getSeconds()).slice(-2)
        week = time.getDay()
        formatTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second

        utc = new Date(time.getTime() - 12 * 60 * 60 * 1000)
        utcyear = utc.getFullYear()
        utcmonth = ('0' + (utc.getMonth() + 1)).slice(-2)
        utcday = ('0' + utc.getDate()).slice(-2)
        utchour = ('0' + utc.getHours()).slice(-2)
        utcminute = ('0' + utc.getMinutes()).slice(-2)
        utcsecond = ('0' + utc.getSeconds()).slice(-2)
        utcweek = utc.getDay()

        utcformatTime = utcyear + '-' + utcmonth + '-' + utcday + ' ' + utchour + ':' + utcminute + ':' + utcsecond

        return {
            time: formatTime,
            week: week,
            array: [year, month, day, hour, minute, second],
            year: year + '-' + month + '-' + day,
            utc: {
                // 美东时间
                time: utcformatTime,
                week: utcweek,
                array: [utcyear, utcmonth, utcday, utchour, utcminute, utcsecond],
            },
        }
    }
    Deltimer(tim) {
        // 传时间戳 和 美东  返回 数组[年，月，日，时，分，秒，星期]
        var tims = tim
        var date = new Date(tims)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        var second = date.getSeconds()
        minute = minute < 10 ? '0' + minute : minute
        second = second < 10 ? '0' + second : second
        return y + '-' + m + '-' + d
    }
    GetCookie(cname) {
        // 获取cookie  传cookie名称
        let name = cname + '='
        let ca = document.cookie.split(';')

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1)
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
        }
        return ''
    }

    SetCookie(cname, cvalue, exdays) {
        //设置cookie 传--- cname:cookie名称 cvalue:值 exdays时间:秒数
        let d = new Date()
        d.setTime(d.getTime() + exdays * 1000)
        let expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + '; ' + expires
        return true
    }

    RemoveCookie(cname) {
        // 删除cookie  传cookie名称
        this.SetCookie(cname, '', -1)
    }


    Decimal(money) {
        // 保留两位小数
        money = String(money)
        let floorMoney = ''
        if (money.includes('.')) {
            floorMoney = money.split('.')[0] + money.substr(money.indexOf('.'), 3)
        } else {
            floorMoney = money + '.00'
        }
        return floorMoney
    }

    Alert(data) {
        /* 需要用户操作的提示 */
        let Alert = vm.extend(alert)
        let element = new Alert({
            data: {
                title: data.title || '提示',
                body: typeof data === 'object' ? data.body : data,
                define: data.define || '确定',
                cancel: data.cancel,
                type: data.type ? data.type : 'error', // "true"  // warn
                Define: data.Define || function () { },
                Cancel: data.Cancel || function () { },
                Close: data.Close || function () { },
            },
            i18n
        }).$mount()
        if (!document.getElementById('alert')) {
            document.body.appendChild(element.$el)
        }
    }

    Loading(isShow) {
        // 全局loading
        if (isShow) {
            let Loading = vm.extend(loading)
            let element = new Loading().$mount()
            if (!document.getElementById('loading_g')) {
                document.body.appendChild(element.$el)
            }
        } else {
            document.getElementById('loading_g') ? document.getElementById('loading_g').remove() : ''
        }
    }
    Instructions() {
        /* 自定义指令 */
        vm.directive('background', {
            inserted(el, data) {
                // console.log(data.value)
                if (data.value && Array.isArray(data.value)) {
                    el.style.backgroundImage =
                        process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ?
                            `url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[0]}),url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[2]}),url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[1]})` :
                            `url(img/${process.env.TEMPLATE}/${data.value[0]}),url(img/${process.env.TEMPLATE}/${data.value[2]}),url(img/${process.env.TEMPLATE}/${data.value[1]})`
                    return;
                }
                if (data.value && (data.value.includes('http') || data.value.includes('static/comm'))) {
                    el.style.backgroundImage = 'url(\"' + data.value + '\")'
                    return;
                }
                if (data.value && data.value.includes("common")) {
                    el.style.backgroundImage = process.env.NODE_ENV !== 'production' ? `url(${window.location.origin}/static/img/${data.value})` : `url(${data.value})`
                    // el.style.backgroundImage = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? `url(${window.location.origin}/static/img/${data.value})` : `url(${data.value})`
                } else {
                    el.style.backgroundImage = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? `url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value})` : `url(img/${data.value})`
                }

            },
            update(el, data) {
                let { oldValue, value } = data
                if (oldValue === value) {
                    return
                }
                if (data.value && Array.isArray(data.value)) {
                    el.style.backgroundImage =
                        process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ?
                            `url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[0]}),url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[2]}),url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value[1]})` :
                            `url(img/${process.env.TEMPLATE}/${data.value[0]}),url(img/${process.env.TEMPLATE}/${data.value[2]}),url(img/${process.env.TEMPLATE}/${data.value[1]})`
                    return;
                }
                if (data.value && data.value.includes('http')) {
                    el.style.backgroundImage = 'url(' + data.value + ')'
                    return;
                }
                if (data.value && data.value.includes("common")) {
                    el.style.backgroundImage = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? `url(${window.location.origin}/static/img/${data.value})` : `url(${data.value})`
                } else {
                    el.style.backgroundImage = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? `url(${window.location.origin}/static/img/${process.env.TEMPLATE}/${data.value})` : `url(img/${data.value})`
                }
            },
        })

        vm.directive('src', {
            inserted(el, data) {
                if (!data.value) return
                if (data.value.includes('http')) {
                    el.src = data.value
                    return
                }
                if (data.value && data.value.includes("common")) {
                    el.src = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? window.location.origin + `/static/img/` + data.value : data.value
                } else {
                    el.src = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? window.location.origin + `/static/img/${process.env.TEMPLATE}/` + data.value : 'img/' + data.value
                }

            },
            update(el, data) {
                let { oldValue, value } = data
                if (oldValue === value) {
                    return
                }
                if (data.value.includes('http')) {
                    el.src = data.value
                    return
                }
                if (data.value && data.value.includes("common")) {
                    el.src = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? window.location.origin + `/static/img/` + data.value : data.value
                } else {
                    el.src = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'pre_production' ? window.location.origin + `/static/img/${process.env.TEMPLATE}/` + data.value : 'img/' + data.value
                }
            },
        })

        vm.directive('password', {
            inserted: function (el, data) {
                el.onfocus = function (e) {
                    // 获取焦点
                    let Pas = vm.extend(password)
                    let element = new Pas({
                        data: {
                            userName: data.value.userName,
                            type: 'password',
                            el: e.target,
                        },
                    }).$mount()
                    if (!document.getElementById('password_reg')) {
                        document.body.appendChild(element.$el)
                    }
                }
            },
        })
    }
    Password(data) {
        // 密码强度
        let Pas = vm.extend(password)
        let element = new Pas({
            data: {
                value: data.value,
                type: data.type,
                el: data.el,
            },
        }).$mount()
        if (!document.getElementById('password_reg')) {
            document.body.appendChild(element.$el)
        }
    }
    Tiops(data) {
        //不需要用户操作的提示
        let Tiopss = vm.extend(tiops)
        let element = new Tiopss({
            data: {
                message: typeof data === 'string' ? data : data.message,
                type: data.type || 'correct',
            },
        }).$mount()
        document.body.appendChild(element.$el)
    }
    CodeWy(showCallback, callback) {
        var lang = {
            "CN": "zh-CN",
            "EN": 'en-US',
        }
        // 行为验证码
        let src = 'https://cstaticdun.126.net/load.min.js?t=' + parseInt(new Date().getTime() / 60000)
        let head = document.getElementsByTagName('head')[0]
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = src
        head.appendChild(script)
        this.Loading(true)
        script.onload = (e) => {
            initNECaptcha({
                captchaId: (window.nec && window.nec.captchaId) || window.publicConfig.codeID || 'd1bfd0a8fc46482cad6dc6816fe434be', // 验证码ID
                element: '#captcha', // Dom 节点
                feedbackEnable: false, // 反馈
                lang: lang[window.localStorage.getItem('language_' + window.siteHeaders.site_tag) || window.siteHeaders.language],
                mode: (window.nec && window.nec.mode) || 'popup', // 弹窗类型
                width: '300px', // 图片宽度
                onVerify: (err, data) => {
                    // 回调
                    if (err) {
                        callback(false)
                    } else {
                        callback(data)
                    }
                },
            },
                (onload = (instance) => {
                    showCallback(instance)
                    this.Loading(false)
                }),
                (onerror = (err) => {
                    callback(false)
                })
            )
        }
    }
    QRCode(data) {
        //  安卓  ios二维码
        setTimeout(() => {
            if (data.ios) {
                new QRCode(data.ios, {
                    text: data.url.bases.device_ios,
                    width: data.width,
                    height: data.width,
                    correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
                })
                data.ios.style.backgroundColor = '#ffffff'
                data.ios.style.padding = '3px'
            }
            if (data.android) {
                new QRCode(data.android, {
                    text: data.url.bases.device_android,
                    width: data.width,
                    height: data.width,
                    correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
                })
                data.android.style.backgroundColor = '#ffffff'
                data.android.style.padding = '3px'
            }
            if (data.h5) {
                new QRCode(data.h5, {
                    text: data.url.bases.siteDomain,
                    width: data.width,
                    height: data.width,
                    correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
                })
                data.android.style.backgroundColor = '#ffffff'
                data.android.style.padding = '3px'
            }
        }, 120)
    }
    // gt4行为验证
    gt4Code() {
        // /src地址/
        let src = 'https://static.geetest.com/v4/gt4.js?t=' + parseInt(new Date().getTime() / 60000)
        let head = document.getElementsByTagName('head')[0]
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = src
        head.appendChild(script)
    }
}
const tools = new tool()
export default tools
