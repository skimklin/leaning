class Observer {
  constructor(value) {
    this.value = value
  }
}

function defineReact(val) {
  if (typeof val !== 'object' || val === null) {
    return
  }

  let object = val
  // if (!object._ob_ instanceof Observer) {
  //   object._ob_ = new Observer(val)
  // }

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
        // defineReact(value)
      }
    })

    if (Object.prototype.toString.call(value) === '[object Object]') {
      defineReact(value)
    } else if (Array.isArray(value)) {
      // 给数组添加监听
    }
  })
}

var data = {
  count: 10,
  name: 'qweasd',
  obj: {
    name: 'lqw'
  }
}

defineReact(data)
