import { isDate, isPlainObject, encode } from "./util"

export function buildUrl (url: string, params?: any):string {
  if (!params) return url
  const parts: string[] = []
  Object.keys(params).forEach(k => {
    const v = params[k]
    if (v === null || typeof v === 'undefined') {
      return
    }

    let values = []
    if (Array.isArray(v)) {
      values = v
      k += '[]'
    } else {
      values = [v]
    }

    values.forEach((val: any) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(k)}=${encode(val)}`)
    })
  })
  let serializedParmas = parts.join('&')
  if (serializedParmas) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex) // 去掉hash
    }
  }
  url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParmas

  return url
}