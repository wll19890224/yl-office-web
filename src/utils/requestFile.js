import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 150000, // request timeout
  // responseType:"blob",
  // headers:{
  //   // 'content-type':"multipart/form-data"
  //   'content-type': 'application/octet-stream'
  // }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里配置请求头信息、token、参数加密等操作
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 可以在这里根据响应状态码进行统一的错误处理
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
