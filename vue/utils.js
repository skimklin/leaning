// TODO解析bind指令的值
function getBindingAttr (node) {
	const _htmlText = node.outerHTML
	console.log(_htmlText)
	console.log(attribute)
	console.log(_htmlText.match(attribute))
}


void function() {
const UTILS = {}

UTILS.analysisDirective = (node, directiveName) => {
	return node.hasAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
}

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

UTILS.callLifeHook = function(lifeCycleName) {
	if (!this[`$${lifeCycleName}`]) return

	this[`$${lifeCycleName}`].forEach(lifeCycle => {
		lifeCycle && lifeCycle.call(this)
	})
}

window.UTILS = UTILS
}()