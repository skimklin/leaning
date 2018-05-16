typeof
function () {
	// 定义构造函数
	function Coffee(options) {
		this._init(options)
	}

	// 构造函数原型
	const CoffeeInstance = Coffee.prototype

	CoffeeInstance._initLifeHook = function (options) {
		Object.values(CONSTANT.LIFE_CYCLES).forEach(lifeCycleName => {
			if (options[lifeCycleName]) {
				this[`$${lifeCycleName}`] = [options[lifeCycleName]]
			}
		})
	}

	// 添加原型方法
	CoffeeInstance._init = function (options) {
		options.data = typeof options.data === 'function' ? options.data() : options.data
		this.$options = options
		this._initLifeHook(this.$options)

		UTILS.callLifeHook.call(this, CONSTANT.LIFE_CYCLES.beforeCreate)

		this.$el = document.querySelector(options.el)
		this.$data = options.data || {}
		this.$methods = options.methods || {}
		this.$computed = options.computed || {}
		//_binding保存着model与view的映射关系，也就是我们前面定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
		this._binding = {}
		this._obverse(this.$data)
		this._initProxy(this)

		UTILS.callLifeHook.call(this, CONSTANT.LIFE_CYCLES.created)

		this._compile(this.$el)
	}

	// 定义数据拦截
	CoffeeInstance._obverse = function (object) {
		for (const key of Object.keys(object)) {
			let value
			// 初始化数据依赖
			this._binding[key] = {
				// 保存依赖该数据的watchers
				_directives: []
			}
			// 保存键名
			value = object[key]
			// 指令
			let binding = this._binding[key]

			if (typeof value === 'object') {
				this._obverse(value)
			}

			// 定义数据拦截
			Object.defineProperty(this.$data, key, {
				enumerable: true,
				configurable: true,
				get() {
					return value
				},
				set(newValue) {
					if (value !== newValue) {
						value = newValue

						// 数据变动触发watchers更新视图
						binding._directives.forEach(item => {
							item.update()
						})
					}
				}
			})
		}
	}

	// 设置通过this访问的代理 
	// 这里和vue不同,这里的methods存放在实例的$methods下面,
	// 这时通过this访问methods的成员也需要通过代理来实现
	CoffeeInstance._initProxy = function (vue) {
		// 需要代理的keys
		const _proxy = CONSTANT.PROXY_OPTIONS.reduce((pre, proxyKey) => {
			if (vue[`$${proxyKey}`]) {
				for (const [key, value] of Object.entries(vue[`$${proxyKey}`])) {
					if (pre[key] !== undefined) {
						console.error(
							`"${key}" has already defined`
						)
					} else {
						pre[key] = value
					}
				}
			}

			return pre
		}, {})

		Object.keys(_proxy).forEach(key => {
			Object.defineProperty(this, key, {
				configurable: true,
				enumerable: true,
				get: () => {
					return this.$data[key] || this.$methods[key] || this.$computed[key]
				},
				set: (val) => {
					this.$data[key] = val
				}
			})
		})
	}

	// 更新视图函数
	function Watcher(name, el, vm, exp, attr) {
		this.name = name
		this.el = el // 真实dom
		this.vm = vm // vm实例
		this.exp = exp // 指令绑定的key => 对应data中的key
		this.attr = attr // 真实dom的key

		this.update()
	}

	// 更新视图方法
	// TODO属性通用设置方法
	Watcher.prototype.update = function () {
		this.el[this.attr] = this.vm[this.exp]
	}

	// 接下来我们定义一个 _compile 函数，用来解析我们的指令（v-bind,v-model,v-click）等，并在这个过程中对view与model进行绑定。
	CoffeeInstance._compile = function (root) {
		const nodes = root.children

		for (node of nodes) {
			if (node.children && node.children.length) {
				this._compile(node)
			}

			// 事件指令
			CONSTANT.EVENTS.forEach(eventName => {
				if (UTILS.analysisDirective(node, eventName)) {
					node[`on${eventName}`] = (() => {
						const attrVal = UTILS.getDirectiveVal(node, eventName)
						// bind是使data的作用域与method函数的作用域保持一致
						if (!this[attrVal]) {
							return () => {
								console.error(
									`${attrVal} is not defined`
								)
							}
						}

						return this[attrVal].bind(this)
					})()
				}
			})

			// model指令
			if (UTILS.analysisDirective(node, 'model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
				node.addEventListener('input', (currentNode => {
					const attrVal = UTILS.getDirectiveVal(node, 'model')
					this._binding[attrVal]._directives.push(new Watcher(
						'input',
						node,
						this,
						attrVal,
						'value'
					))

					return () => {
						this[attrVal] = currentNode.value
					}
				})(node))
			}

			// 绑定指令 
			if (UTILS.analysisDirective(node, 'bind')) {
				const attrVal = UTILS.getDirectiveVal(node, 'bind')
				this._binding[attrVal]._directives.push(new Watcher(
					'text',
					node,
					this,
					attrVal,
					'innerHTML'
				))
			}
		}
	}

	window.Coffee = Coffee
}()