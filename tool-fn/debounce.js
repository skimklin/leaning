function now() {
  return +new Date()
}

function debounce (func, wait = 50, immediate = true) {
  let last, timer, context, args
  const timeoutReset = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...params) {
    // 每次调用更新最后一次点击的时间
    last = now() + wait
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
      clearTimeout(timer)
      timer = timeoutReset()
    }
  }
}

