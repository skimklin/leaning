import CONSTANT from './constant'

const UTILS = {}

UTILS.analysisDirective = (node, directiveName) => {
	return node.hasAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
}

UTILS.getDirectiveVal = (node, directiveName) => {
	return node.getAttribute(`${CONSTANT.DIRECTIVE_HEAD}-${directiveName}`)
}

export default CONSTANT