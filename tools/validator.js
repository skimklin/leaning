class Validator {
  constructor() {
    this.executor = []
    this.res = ''
  }
  add(validator) {
    this.executor.push(validator)
    return this
  }
  run(value) {
    for (const validator of this.executor) {
      const res = validator(value)
      if (res) {
        this.res = new Error(res)
        break
      }
    }
    return this.res
  }
}

const validator2  = (new Validator()).add(val => '')


const validator = (new Validator()).add(val => '').add(val => val + ' fail')

const a = validator.run('fuck')

console.log(a)