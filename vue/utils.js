// TODO解析bind指令的值
const matchBindExp = /\s[\w+-bind]*:[\w]+=([\'|\"](\S*)[\'|\"]|\w+)/g
const matchBindKey = /:([\w]+)=/
const matchBindValue = /[\'|\"]([\w]+)[\'|\"]/

function getBindingAttr (node) {
	const _htmlText = node.outerHTML
}

function analysisBinding(node) {
	const _htmlText = node.outerHTML
	const matchers = _htmlText.match(matchBindExp)
	let matchResults = null
	if (matchers && matchers.length) {
		matchResults = matchers.map(e => {
			return [
				e.match(matchBindKey)[1],
				e.match(matchBindValue)[1]
			]
		})
	}
	return matchResults
}


void function() {
const UTILS = {}

UTILS.analysisDirective = (node, directiveName) => {
	switch (directiveName) {
		case 'bind': {
			return analysisBinding(node)
		}
		default: {
			return node.hasAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
		}
	}
}

// 调用生命周期
UTILS.getDirectiveVal = (node, directiveName) => {
	switch (directiveName) {
		case 'bind': {
			return node.getAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
		}
		default: {
			return node.getAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
		}
	}
}

// 调用生命周期
UTILS.callLifeHook = function(lifeCycleName) {
	if (!this[`$${lifeCycleName}`]) return

	this[`$${lifeCycleName}`].forEach(lifeCycle => {
		lifeCycle && lifeCycle.call(this)
	})
}

UTILS.setBindingData = function ({ dom, vm, setValData, domInner }) {
	let domContent = domInner
	for (const [propsData, keyInData] of setValData) {
		const matchExp = new RegExp('\{\{\\s*' + propsData + '\\s*\}\}', 'ig')
		domContent = domContent.replace(matchExp, vm[keyInData])
	}
	dom.innerHTML = domContent
}

window.UTILS = UTILS
}()