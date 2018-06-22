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

// TODO promise链式调用,promise第二个then依赖第一个then的返回值
instance.callCromise = function(data) {
  if (this[this.status].length)
    for (const fn of this[this.status])
      fn(data)
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