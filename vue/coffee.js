typeof function() {
// 定义构造函数
function Coffee(options) {
	this._init(options)
}

// 构造函数原型
const CoffeeInstance = Coffee.prototype

// 添加原型方法
CoffeeInstance._init = function(options) {
	this.$options = options
	this.$el = document.querySelector(options.el)
	this.$data = typeof options.data === 'function' ? options.data() : options.data
	this.$methods = options.methods
	//_binding保存着model与view的映射关系，也就是我们前面定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
	this._binding = {}
	this._obverse(this.$data)
	this._compile(this.$el)
}

// 定义数据拦截
CoffeeInstance._obverse = function(object) {
	let value
	for (const key of Object.keys(object)) {
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
				console.log(`获取值${value}`)
				return value
			},
			set(newValue) {
				console.log(`更新值${newValue}`)
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
Watcher.prototype.update = function() {
	this.el[this.attr] = this.vm.$data[this.exp]
}

// 接下来我们定义一个 _compile 函数，用来解析我们的指令（v-bind,v-model,v-clickde）等，并在这个过程中对view与model进行绑定。
CoffeeInstance._compile = function(root) {
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
					return this.$methods[attrVal].bind(this.$data)
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
					this.$data[attrVal] = currentNode.value
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