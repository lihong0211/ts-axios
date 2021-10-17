export function isDate (val: any): val is Date {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'date'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export function extend<T, U> (to: T, from: U): T & U {
  for (let k in from) {
    (to as T & U)[k] = from[k] as any
  }
  return to as T & U
}