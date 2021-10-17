import { AxiosPromise, AxiosRequestConfig } from '../types';
import  dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    // 为了支持axsio('url', config) 和 axios(config)  利用函数重载实现
    if (typeof url === 'string') {
      if (config) {
        config.url = url
      } else {
        config = {}
      }
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  _requestWithoutData( method: string, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData( 'get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData( 'delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData( 'head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData( 'options', url, config)
  }

  _requestWithData( method: string, url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('post', url, data, config)
  }

  put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('put', url, data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('patch', url, data, config)
  }
}