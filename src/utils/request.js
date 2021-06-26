import axios from 'axios'
import Vue from 'vue'
import Config from '@/setting'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Config.timeout
})

service.interceptors.request.use(
  config => {
    // 让每个请求头携带token
    if (window.localStorage.token) {
      config.headers['Authorization'] = window.localStorage.token
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    //  处理请求成功服务器返回的状态码
    // Vue.prototype.$Message.success(response.data.msg)
    return response
  },
  error => {
    if (error.response.status === 500 || error.response.status === 503) {
      Vue.prototype.$Message.error('服务器异常，请稍后重试!')
    } else if (error.response.status === 404) {
      Vue.prototype.$Message.error('请求页面不存在!!')
    } else if (error.response.status === 403) {
      Vue.prototype.$Message.error('权限不足!!!')
    } else if (error.message.includes('timeout')) {
      Vue.prototype.$Message.error('网络超时')
    }
    return Promise.reject(error)
  }
)

export default service