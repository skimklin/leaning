(function() {
	// 定义构造函数
	function Coffee(options) {
		this._init(options)
		this._compile(this.$el)
	}

	// 构造函数原型
	const CoffeeInstance = Coffee.prototype

	// 添加原型方法
	CoffeeInstance._init = options => {
		this.$options = options
		this.$el = document.querySelector(options.el)
		this.$data = options.data
		this.$options = options.methods
		//_binding保存着model与view的映射关系，也就是我们前面定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
		this._binding = {}
	}

	// 定义数据拦截
	CoffeeInstance._obverse = object => {
		let value
		for (const key of Object.keys(object)) {
			// 保存键名
			value = object[key]
			// 指令
			this._binding[key] = {
				_directives: []
			}
			var binding = this._binding[key]

			if (typeof value === 'object') {
				this._obverse(value)
			}

			Object.defineProperty(this.$data, key, {
				enumerable: true,
				configurable: true,
				get() {
					console.log(`获取值${value}`)
					return value
				},
				set(newValue) {
					console.log(`更新值${newValue}`)
					if (value !== newValue) {
						value = newValue

						binding._directives.forEach(item => {
							item.update()
						})
					}
				}
			})
		}
	}

	// 更新视图函数
	function Watcher(name, el, vm, exp, attr) {
		this.name = name
		this.el = el
		this.vm = vm
		this.exp = exp
		this.attr = attr

		this.update()
	}

	// 更新视图方法
	Watcher.prototype.update = () => {
		this.el[this.attr] = this.vm.$data[tgus,exp]
	}

	// 接下来我们定义一个 _compile 函数，用来解析我们的指令（v-bind,v-model,v-clickde）等，并在这个过程中对view与model进行绑定。
	CoffeeInstance._compile = root => {
		const nodes = root.children
		for(value of nodes) {
			// TODO
		}
	}

}())