function now() {
  return +new Date()
}

function throttle (func, wait = 50, immediate = true) {
  let last, timer, context, args
  const timeoutReset = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...params) {
    // 如果没有创建过计时器,则调用函数并开始计时
    // 如果还在计时中
    if (!timer) {
      timer = timeoutReset()
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else if (now() < last) {
      // last过期之后更新时间
      last = now() + wait
      clearTimeout(timer)
      timer = timeoutReset()
    }
  }
}