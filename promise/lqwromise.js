// 三种状态常量
// 初始状态,既不是成功也不是失败
const PEDING = 'PENDING'
// 操作完成,返回结果值
const FULFILLED = 'FULFILLED'
// 操作失败,返回错误信息
const REJECTED = 'REJECTED'

class MiniPromise {
    constructor(executor) {
        // 传入一个function类型的参数
        if (typeof executor !== 'function') {
            throw new Error('Executor must be a function')
        }

        // 状态初始化
        this.$state = PEDING
        // 稳固(settled --- 在resolve或者reject被调用后)状态下需要调用的方法
        this.$chained = []
        // resolve方法
        const resolve = res => {
            if (this.$state !== PEDING) {
                return
            }
            // 设置状态为完成
            this.$state = FULFILLED
            this.$val = res
            // 调用完成方法
            for (const {
                    onFulfilled
                } of this.$chained) {
                onFulfilled(res)
            }
        }

        const reject = err => {
            if (this.$state !== PEDING) {
                return
            }
            this.$state = REJECTED
            this.$val = err
            for (const {
                    onRejected
                } of this.$chained) {
                onRejected(err)
            }

        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.$state === FULFILLED) {
            onFulfilled(this.$val)
        } else if (this.$state === REJECTED) {
            onRejected(this.$val)
        } else {
            this.$chained.push({
                onFulfilled,
                onRejected
            })
        }
    }
}

module.exports = MiniPromise