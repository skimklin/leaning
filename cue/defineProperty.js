!function() {
  function defObserverEnumerable(object, key, val, enumerable) {
    Object.defineProperty(object, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    })
  }

  function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  }

  class Observer {
    constructor(value) {
      this.value = value
      // 这里本来还应该有依赖收集dep,watcher等等,这里就简化了
      defObserverEnumerable(value, '__ob__', this)
    }
    // 此处进行了简化,本来notify是由储存在observer实例下的dep实例来触发的
    notify() {
      console.log('数据已经发生变更 => 通知更新dom')
      console.log(this.value)
    }
  }
  
  function defineReactive(val, bySetter) {
    if (!isObject(val)) {
      return
    }

    const object = val
    const ob = object.hasOwnProperty('__ob__') ? object.__ob__ : void 2333
    if (ob instanceof Observer && !bySetter) {
      return
    } else {
      object.__ob__ = new Observer(object)
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
          if (value === newValue || (value !== value && newValue !== newValue))
            return
          console.log('设置了属性: %s', key)
          object[key] = value = newValue
          defineReactive(value, true)
          // do something
          object.__ob__.notify()
        } 
      })

      if (isObject(value)) {
        defineReactive(value)
      } else if (Array.isArray(value)) {
        // 给数组添加额外监听
      }
    })
  }

  window.defineReactive = defineReactive
}()
