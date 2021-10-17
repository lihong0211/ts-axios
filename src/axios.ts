
import Axios from "./core/Axios"
import { extend } from "./helpers/util"
import { AxiosInstance, AxiosRequestConfig } from "./types"

export function create (): AxiosInstance {
  const ctx = new Axios()
  const instance = Axios.prototype.request.bind(ctx)

  extend(instance, ctx)
  return instance as AxiosInstance
}

const axios = create()

export default axios
