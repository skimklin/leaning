(function() {
	const sortArr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]
	const sortArr2 = [
		{
			count: 6
		},
		{
			count: 1
		},
		{
			count: 2
		},
		{
			count: 7
		},
		{
			count: 9
		},
		{
			count: 3
		},
		{
			count: 4
		},
		{
			count: 5
		},
		{
			count: 10
		},
		{
			count: 8
		}
	]

	const compare = (source, target) => {
		return source - target
	}

	const exchangeValue = (array, sourceIndex, targetIndex) => {
		[array[sourceIndex], array[targetIndex]] = [
			array[targetIndex],
			array[sourceIndex]
		]

		// console.log('exchangeValue => start: %s, end: %s', sourceIndex, targetIndex)
	}

	// 基准数字,比较数字
	const quickSort = (array, fn, start, end) => {
		if (array.length < 2) return
		start = start || 0
		end = end || array.length - 1

		let baseIndex = start
		let compareBase = fn ? fn(array[baseIndex]) : array[baseIndex]
		let startValue, endValue
		let getCompareValue = index => (fn ? fn(array[index]) : array[index])
		const compareStartIndex = start,
			compareEndIndex = end

		// console.log('start: %s, end: %s', start, end)

		while (start !== end) {
			startValue = getCompareValue(start)
			endValue = getCompareValue(end)

			while (endValue >= compareBase && end > start) {
				end--
				endValue = getCompareValue(end)
			}
			while (startValue <= compareBase && start < end) {
				start++
				startValue = getCompareValue(start)
			}
			if (start !== end) exchangeValue(array, start, end)
		}

		exchangeValue(array, baseIndex, end)
		if (compareStartIndex < end - 1)
			quickSort(array, fn, compareStartIndex, end - 1)
		if (end + 1 < compareEndIndex)
			quickSort(array, fn, end + 1, compareEndIndex)
	}

	// 测试1,单纯数字快排
	quickSort(sortArr)
	console.log(sortArr)

	// 测试2,带处理方法快排
	quickSort(sortArr2, e => e.count)
	console.log(sortArr2)

	// 压力测试
	const testArr = []
	let testArr2 = []
	// 生成随机整数
	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
	// 生成len长度的随机数组
	function generateArr(arr, len) {
		for (var i = 0; i < len; i++) {
			arr.push(random(1, len))
		}
	}

	var ryfSort = function(arr) {
		if (arr.length <= 1) {
			return arr
		}
		var pivotIndex = Math.floor(arr.length / 2)
		var pivot = arr.splice(pivotIndex, 1)[0]
		var left = []
		var right = []
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] < pivot) {
				left.push(arr[i])
			} else {
				right.push(arr[i])
			}
		}
		return ryfSort(left).concat([pivot], ryfSort(right))
	}

	// 生成随机数
	generateArr(testArr, 10000000)
	testArr2 = [...testArr]
	let testArr3 = [...testArr]

	console.time('sortTime')
	quickSort(testArr)
	console.timeEnd('sortTime')
	console.log(testArr)

	console.time('ryfSort')
	testArr2 = ryfSort(testArr2)
	console.timeEnd('ryfSort')
	console.log(testArr2)

	console.time('arraySort')
	testArr3.sort((a, b) => a - b)
	console.timeEnd('arraySort')
	console.log(testArr3)
})()
