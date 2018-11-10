export function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

export const createTypeChecker = type => val =>
  Object.prototype.toString.call(val) === `[object ${getType(type)}]`

export const isDate = value => createTypeChecker(Date)(value)

export const isObject = value => createTypeChecker(Object)(value)

export const isJSON = value => createTypeChecker(JSON)(value)

export const isString = value => typeof value === 'string'

export const isNumber = value => typeof value === 'number'

export const isFunction = value => typeof value === 'function'

export const isUndefined = value => value === undefined

export const isNull = value => value === null

export const isStringNumber = value => isString(value) && !isNaN(+value)
