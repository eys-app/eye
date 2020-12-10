
import axios from '../js_sdk/gangdiedao-uni-axios/index.js'




/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: [baseURL],
    timeout: 6000,
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
    },
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
    // code...
    _reqlog(config)
    return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
    _reslog(response)
    // code...
})

export default http