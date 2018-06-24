// 单例模式
// 定义: 一个类仅有一个实例,并提供一个访问它的全局访问点

function singleTon(someOption) {
  this.someOption = someOption
}

singleTon.getInstance = function() {
  let instance = null
  return function (someOption) {
    if (!instance) {
      return new singleTon(someOption)
    }
    return instance
  }
}
