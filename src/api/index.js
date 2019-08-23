import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 3000,
  responseType: 'json',
  validateStatus (status) {
    return status === 200
  }
})
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
const request = {
  post (url, params = {}) {
    return instance.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get (url, params) {
    let _params
    let _paramsarr = []
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _paramsarr.push(`${key}=${params[key]}`)
        }
      }
      _paramsarr.length === 0 ? _params = '' : _params = '?' + _paramsarr.join('&')
    }
    return instance.get(`${url}${_params}`)
  }
}

export default request
