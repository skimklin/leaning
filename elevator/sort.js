(function () {
	const sortArr = [
		6,
		1,
		2,
		7,
		9,
		3,
		4,
		5,
		10,
		8
	]
	const sortArr2 = [
		{
			count: 6
		}, {
			count: 1
		}, {
			count: 2
		}, {
			count: 7
		}, {
			count: 9
		}, {
			count: 3
		}, {
			count: 4
		}, {
			count: 5
		}, {
			count: 10
		} 
	]

	const compare = (source, target) => {
		return source - target
	}

	const exchangeValue = (array, sourceIndex, targetIndex) => {
		[array[sourceIndex], array[targetIndex]] = [array[targetIndex], array[sourceIndex]]

		// console.log('exchangeValue => start: %s, end: %s', sourceIndex, targetIndex)
	}

	// 基准数字,比较数字
	const quickSort = (array, fn, start, end) => {
		if (array.length <= 1) return
		start = start || 0
		end = end || array.length - 1

		let baseIndex = start
		let compareBase = fn ? fn(array[baseIndex]) : array[baseIndex]
		let startCompare, endCompare
		let getCompareValue = (index) => fn ? fn(array[index]) : array[index]
		const compareStartIndex = start,
			compareEndIndex = end

		// console.log('start: %s, end: %s', start, end)

		while (start !== end) {
			startCompare = getCompareValue(start)
			endCompare = getCompareValue(end)

			while (endCompare >= compareBase && end > start) {
				end--
				endCompare = getCompareValue(end)
			}
			while (startCompare <= compareBase && start < end) {
				start++
				startCompare = getCompareValue(start)
			}
			if (start !== end) exchangeValue(array, start, end)
		}

		exchangeValue(array, baseIndex, end)
		if (compareStartIndex < end - 1) quickSort(array, fn, compareStartIndex, end - 1)
		if (end + 1 < compareEndIndex) quickSort(array, fn, end + 1, compareEndIndex)
	}

	// 测试1,单纯数字快排
	quickSort(sortArr)
	console.log(sortArr)

	// 测试2,带处理方法快排
	quickSort(sortArr2, e => e.count)
	console.log(sortArr2)


	// 压力测试
	const testArr = []
	// 生成随机整数
	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	// 生成len长度的随机数组
	function generateArr (len) {
		for (var i = 0; i < len; i++) {
			testArr.push(random(1, len));
		}
	}
	// 生成随机数
	generateArr(10000)

	console.time('sortTime')
	quickSort(testArr)
	console.timeEnd('sortTime')
	console.log(testArr)
	
	


	
})()