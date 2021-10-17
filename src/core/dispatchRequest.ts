
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types"
import { buildUrl } from "../helpers/url"
import { transformRequest,  transformResponse } from "../helpers/data"
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'

function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig (config: AxiosRequestConfig):void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformHeaders(config)
}

function transformUrl (config:AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformRequestData (config: AxiosRequestConfig): string {
  const { data } = config
  return transformRequest(data)
}

function transformHeaders (config: AxiosRequestConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
 
export default dispatchRequest