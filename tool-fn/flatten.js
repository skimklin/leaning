// 扁平化数组
function flatten (array, deep = Infinity) {
  return deep && Array.isArray(array) ? [].concat(...array.map(e => flatten(e, deep - 1))): array
}