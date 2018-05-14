!function() {
const CONSTANT = {}
// 指令前缀
CONSTANT.DIRECTIVE_HEAD = 'coffee'

// 生命周期
CONSTANT.LIFE_CYCLES = {
	beforeCreate: 'beforeCoffeeCreate',
	created: 'coffeeCreated'
}

// 需要代理的项
CONSTANT.PROXY_OPTIONS = [
	'data',
	'methods',
	'computed'
]

// 监听事件
CONSTANT.EVENTS = [
	'click'
]

window.CONSTANT = CONSTANT
}()