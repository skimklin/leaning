const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class Cromise {
  constructor(executor) {
    this.status = PENDING

    this[FULLFILLED] = []
    this[REJECTED] = []

    const getChangeStatusAndCallFnFn = (status) => {
      return (data) => {
        if (this.changeStatus(status))
        this.callCromise(data)
      }
    }

    try {
      executor(getChangeStatusAndCallFnFn(FULLFILLED), getChangeStatusAndCallFnFn(REJECTED))
    } catch(error) {
      getChangeStatusAndCallFnFn(REJECTED)
    }
  }
}

const instance = Cromise.prototype

instance.changeStatus = function(status) {
  if (this.status === PENDING) {
    this.status = status
    return true
  } else {
    throw new Error(`Cromise has been changed to ${this.status} and should not to be changed again`)
  }
}

// promise链式调用时,后一个的参数为第一个then的返回值
instance.callCromise = function(data) {
  if (this[this.status].length)
    for (const [index, fn] of this[this.status].entries())
      this[this.status][index] = fn(index ? this[this.status][index - 1] : data)
}

instance.then = function(onfulfilled, onrejected) {
  this[FULLFILLED].push(onfulfilled)
  this[REJECTED].push(onrejected)
  return this
}

instance.catch = function(onrejected) {
  this[REJECTED].push(onrejected)
  return this
}

window.Cromise = Cromise