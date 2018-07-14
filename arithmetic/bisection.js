(function() {
	const array = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9
	]
	const array2 = [
		{
			count: 1
		}, {
			count: 2
		}, {
			count: 3
		}, {
			count: 4
		}, {
			count: 5
		}, {
			count: 6
		}, {
			count: 7
		}, {
			count: 8
		},	{
			count: 9
		}
	]

	// 二分法查找(要求数组必须是从小到大排列)
	const bisection = (array, val, fn) => {
		let start = 0,
				end = array.length - 1,
				index = Math.round((start + end) / 2),
				centerValue = fn ? fn(array[index]) : array[index]

		while (centerValue !== val) {
			// console.log('查找索引', index)

			centerValue > val ? (end = index) : (start = index)
			index = Math.round((start + end) / 2)
			centerValue = fn ? fn(array[index]) : array[index]
		}

		return array[index]
	}

	console.log('找到结果', bisection(array, 6))
	console.log('找到结果', bisection(array2, 9, e => e.count))
}())