import axios from 'axios'
import { baseUrl, timeout, withCredentials } from './config.js'

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = timeout
axios.defaults.withCredentials = withCredentials

axios.interceptors.request.use(
  config => {
    if (config.url === 'login') {
      localStorage.removeItem('token')
      return config
    }
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.config.url === baseUrl + 'login') {
      localStorage.setItem('token', response.data.payload.authorization)
    }
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

export const $post = (url, params, needConcel = false) => {
  if (!needConcel) return axios.post(url, params)
  const CancelToken = axios.CancelToken
  let cancel
  const post = axios.post(
    url,
    params,
    { 
      cancelToken: new CancelToken((c) => {
        cancel = c
      })
    }
  )
  return [post, cancel]
}