void function() {
const UTILS = {}

UTILS.analysisDirective = (node, directiveName) => {
	return node.hasAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
}

UTILS.getDirectiveVal = (node, directiveName) => {
	return node.getAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
}

UTILS.callLifeHook = function(lifeCycleName)  {
	if (!this[`$${lifeCycleName}`]) return

	this[`$${lifeCycleName}`].forEach(lifeCycle => {
		lifeCycle && lifeCycle.call(this)
	})
}

window.UTILS = UTILS
}()