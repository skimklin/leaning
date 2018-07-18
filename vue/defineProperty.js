class Observer {
  constructor(value) {
    this.value = value
  }
}

function def(object, key, val, enumerable) {
  Object.defineProperty(object, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

function defineReact(val, bySetter) {
  if (typeof val !== 'object' || val === null) {
    return
  }

  const object = val
  if (object.__ob__ instanceof Observer && !bySetter) {
    return
  } else {
    def(object, '__ob__', new Observer(object))
  }

  Object.keys(object).forEach(key => {

    let value = object[key]
    Object.defineProperty(object, key, {
      get() {
        console.log('获取了属性: %s', key)
        // do something
        return value
      },
      set(newValue) {
        if (value === newValue || (value !== value && newValue !== newValue)) return
        console.log('设置了属性: %s', key)
        // do something
        object[key] = value = newValue
        defineReact(value, true)
      }
    })

    if (Object.prototype.toString.call(value) === '[object Object]') {
      defineReact(value)
    } else if (Array.isArray(value)) {
      // 给数组添加监听
    }
  })
}
