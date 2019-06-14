import axios from 'axios'
import qs from 'qs'
import env from '@/assets/env'
import res from '@/assets/result-model'
import {
  errMessage,
  getItem
} from '@/assets/js/utils'

let baseAxios = axios.create({
  baseURL: env.URL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

let __token = null

// 发送信息钩子
baseAxios.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization) {
      if (__token === null) {
        __token = getItem('token') || null
      }
      let tokenValue = __token

      if (tokenValue) {
        config.headers.Authorization = `Bearer ${tokenValue}`;
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 返回消息钩子
baseAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

baseAxios.getUrl = (url, params = {}) => {
  return new Promise(resolve => {
    baseAxios
      .get(url, {
        params
      })
      .then(
        response => {
          let retData = response.data
          resolve(retData)
        },
        error => {
          console.warn(error)
          let errData = res.error('服务器错误', -1, error)
          resolve(errData)
        }
      )
  })
}

baseAxios.postUrl = (url, data = {}, showErrflag = true) => {
  let headers = {}
  let opts = data
  if (Object.prototype.toString.call(data) !== '[object FormData]') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    opts = qs.stringify(data)
  } else { // formData对象一律认为是要发送流文件
    headers['Content-Type'] = 'multipart/form-data'
  }

  return new Promise(resolve => {
    baseAxios
      .post(url, opts, {
        headers
      })
      .then(
        response => {
          let retData = response.data
          if (retData.code != 0) {
            console.warn(url, data, retData)
          }
          if (showErrflag) {
            ifErr(retData)
          }
          resolve(retData)
        },
        error => {
          console.warn(error)
          let errData = res.error('服务器错误', -1, error)
          resolve(errData)
        }
      )
  })
}

function ifErr(retData) {
  if (!retData.isok) {
    errMessage(retData.msg)
  }
}

export default baseAxios
