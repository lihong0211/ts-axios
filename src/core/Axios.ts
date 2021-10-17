import { 
  AxiosPromise,
  AxiosRequestConfig,
  Interceptors, 
  AxiosInterceptorManager,
  AxiosResponse,
  PromiseChain
} from '../types';
import  dispatchRequest from './dispatchRequest'
import InterceptorManager from './intercepterManager'

export default class Axios {

  interceptors: Interceptors

  constructor () {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

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

    // 实现promise链  intercetor链式调用

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach((interceptor: any) => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach((interceptor: any) => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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