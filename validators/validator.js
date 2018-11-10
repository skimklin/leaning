import { isObject } from './typeChecker'

// Appointments of Validator
// 1. The validator instance always returned an object within at least two parameter: valid, message.
//  The key "valid" shows the result,true(valid) or false(invalid),"message" shows the invalid message.
// 2. It is invalid when returns false,otherwise we considered it is valid.
export default class Validator {
  constructor() {
    this.validators = []
    this.result = {
      valid: true,
      message: '',
    }

    this.add = (rules, msg) => {
      let doValidate = rules
      if (rules instanceof Validator) {
        doValidate = rules.run
      }

      this.validators.push(val => {
        const res = doValidate(val)
        if (isObject(res)) {
          // if invalid and there is no message with returned value,try incoming parameter
          if (res.valid === false && res.message === '') {
            res.message = msg
          }
          // returned false means invalid
        } else {
          return {
            valid: !(res === false),
            message: res === false ? msg || '' : '',
          }
        }

        return res
      })
      return this.add
    }

    this.run = value => {
      if (this.validators.length <= 0) {
        return this.result
      }

      this.validators.some(element => {
        if (!this.result.valid) return
        const res = element(value)
        if (isObject(res) && res.valid === false) {
          Object.assign(this.result, res)
        }
        return !this.result.valid
      })

      const result = {
        ...this.result,
      }
      this.reset()
      return result
    }

    this.reset = () => {
      this.result = {
        valid: true,
        message: '',
      }
    }

    Object.defineProperties(this.add, {
      run: {
        get: () => this.run,
      },
      add: {
        get: () => this.add,
      },
    })
  }
}
