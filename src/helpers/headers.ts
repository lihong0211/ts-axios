
import { isPlainObject } from "./util";

function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type') 
  if (isPlainObject(data) && headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  return headers
}

export function parseHeaders (headers: string): any {
  const parsed = Object.create(null)
  if (!headers) return parsed
  headers.split(/\r\n/).forEach(line => {
    let [k, v] = line.split(':')
    k = k.trim().toLowerCase()
    if (v) {
      v = v.trim()
    }
    if (!!k) {
      parsed[k] = v
    }
  })
  return parsed
}
 