import axios from 'axios'
import { getToken,removeToken } from '@/utils/auth'
import router from '@/router'
import { message } from "ant-design-vue";

// axios 全局配置
axios.defaults.baseURL = 'https://api.biospringbok.com/jeecg-boot'
// axios.defaults.baseURL = 'http://192.168.2.238:8081/jeecg-boot/'
axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use(
  
  config => {
    console.log('config',config)
    // 可以在这里配置请求头信息、token、参数加密等操作
    if (getToken()) {
      //让每个请求携带令牌
      //['X-Token']是自定义标头键
      //请根据实际情况修改
      // config.headers['Token'] = getToken()
      // config.headers['Authorization'] = getToken()
      config.headers['X-Access-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log('response',response)
    // 可以在这里根据响应状态码进行统一的错误处理
    if(response.data.code != 200){
      message.error(response.data.message)
    }
    
    return response
  },
  error => {
    // console.log(error.response)
    if(error.response.data.status == 500 && error.response.data.message == "Token失效，请重新登录"){
      // console.log(error.response)
      message.error('Token is invalid, please log in again!')
      removeToken()
      localStorage.clear()
      router.push("/pages/landing-pages/basic")
    }
    return Promise.reject(error)
  }
)

export default axios

// get 方法封装
export function get(url, params,headers=null) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params,headers })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// post 方法封装
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}