/**
 * axios interceptor configs
 * @author yang
 * @date 2019/4/9
 */
import Axios from 'axios'
import configs from './config'


Axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '/proxyApi' : process.env.VUE_APP_API
Axios.defaults.timeout = configs.timeout
Axios.defaults.headers = configs.header


Axios.interceptors.request.use((config) => {
  // config.headers.token = getToken()
  return config
})

Axios.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (err) => {
    let msg = ''
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          msg = 'Request error'
          break
        case 401:
          msg = 'Not authorized, please log in'
          break
        case 502:
          msg = 'Gateway error'
          break
        case 503:
          msg = 'Service unavailable'
          break
        case 504:
          msg = 'Gateway timeout'
          break
        case 505:
          msg = 'The HTTP version is not supported'
          break
        default:
          msg = 'Request failed!'
          break
      }
    }
    console.log(msg)
    return Promise.reject(err)
  }
)
export default Axios
