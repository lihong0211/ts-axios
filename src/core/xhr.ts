
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers, responseType, timeout  } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)
    // 设置一些request属性
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name] // data 为空时设置content-type没有意义
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) return // 网络错误或者超时错误 status为0
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 网络错误
    request.onerror = function handleError () {
      reject(createError('network error', config, null, request))
    }
    // 超时错误
    request.ontimeout = function handleTimeout () {
      reject(createError(`timeout of ${timeout} ms`, config, 'ECCONNABORTED', request))
    }

    request.send(data)

    function handleResponse (response: AxiosResponse): void {
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(createError(`request failed with status code ${request.status}`, config, null, request, response))
      }
    }
  })
}
