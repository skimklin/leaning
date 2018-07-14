const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function changeStatus(status, res) {
  if (this.status === PENDING) {
    Object.defineProperties(this, { 
      status: {
        configurable: false,
        writable: false,
        enumerable: true,
        value: status
      }
    })
    this.result = res
    return true
  } else {
    throw new Error(`Cromise has been changed to ${this.status} and should not to be changed again`)
  }
}
function changeStatusAndCallFnFn(status) {
  return res => {
    if (changeStatus.call(this, status, res))
      callCromise.call(this)
  }
}

// promise链式调用时,后一个的参数为第一个then的返回值
function callCromise() {
  if (this[this.status] && this[this.status].length)
    for (const fn of this[this.status])
      this.result = this.result instanceof Cromise ? this.result.then(fn) : fn(this.result)
}

class Cromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('the first param should be a function')
    }
    this.status = PENDING

    this[FULLFILLED] = []
    this[REJECTED] = []
    this.result = null

    try {
      executor(changeStatusAndCallFnFn.call(this, FULLFILLED), changeStatusAndCallFnFn.call(this, REJECTED))
    } catch(error) {
      changeStatusAndCallFnFn.call(this, REJECTED)(error)
    }
  }

  static resolve() {
     
  }

  static reject() {
    
  }

  static all() {
    
  }

  then(onfulfilled, onrejected) {
    if (this.status === FULLFILLED) {
      onfulfilled && (this[FULLFILLED] = [onfulfilled])
      onrejected && (this[REJECTED] = [onrejected])
      callCromise.call(this)
    } else {
      onfulfilled && this[FULLFILLED].push(onfulfilled)
      onrejected && this[REJECTED].push(onrejected)
    }
    return this
  }

  catch(onrejected) {
    if (this.status === REJECTED) {
      onrejected && (this[REJECTED] = [onrejected])
      callCromise.call(this)
      if (this.result instanceof Cromise) return this.result
    } else {
      onrejected && this[REJECTED].push(onrejected)
    }
    return this
  }
}

window.Cromise = Cromise