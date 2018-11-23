import Validator from './validator'
import * as TYPE from './typeChecker'

const makeObjectChecker = (userValidator, options) => {
  const { errorMessage = {} } = options
  const validatorIntance = new Validator()

  const createValidatorItem = (key, checker) => {
    const { required, type, validator } = checker
    const { message: defineMessage } = userValidator[key]

    return val => {
      const value = val[key]
      let message = ''
      let valid = true
      if (type) {
        valid = TYPE.createTypeChecker(type)(value)
        message = valid
          ? ''
          : defineMessage ||
            (errorMessage.type && errorMessage.type(key, value)) ||
            `supposed type ${TYPE.getType(
              type
            )} on key "${key}",but got ${value}`
      }
      if (valid && required) {
        valid = Boolean(value)
        message = valid
          ? ''
          : defineMessage ||
            (errorMessage.required && errorMessage.required(key, value)) ||
            `missing required parameter: "${key}"`
      }
      if (valid && validator) {
        return validator(value, val)
      }
      return { valid, message }
    }
  }

  Object.keys(userValidator).forEach(validatorKey => {
    validatorIntance.add(
      createValidatorItem(validatorKey, userValidator[validatorKey]),
      `illegal parameter on key: "${validatorKey}"`
    )
  })
  return validatorIntance
}

// valid each object parameters
export const objectValidator = (validator, options = {}) => {
  const validatorIntance = new Validator()
    .add(TYPE.isObject, options.typeError || 'parameter should be [Object]')
    .add(makeObjectChecker(validator, options))
  return validatorIntance.run
}

// valid each array element with object validator
export const arrayValidator = (validator, options = {}) => {
  const validatorIntance = new Validator()
    .add(Array.isArray, options.typeError || 'parameter should be [Array]')
    .add(array => {
      const result = {
        valid: true,
        message: ''
      }
      array.some(e => {
        const res =
          validator instanceof Validator ? validator.run(e) : Validator(e)
        if (TYPE.isObject(res) && res.valid === false) {
          Object.assign(result, res)
        }
        return !result.valid
      })
      return result
    })

  return validatorIntance.run
}

// uesage
// const updateParams = {
//   id: {
//     required: true,
//     type: Number,
//   },
//   title: {
//     required: true,
//     type: String,
//   },
//   content: {
//     validator: val => {
//       return val.length > 10
//         ? {
//           valid: true,
//         }
//         : {
//           valid: false,
//           message: 'content字段必须必须大于10个字',
//           otherMessage: '自己混入的一些参数',
//         }
//     },
//   },
//   comment: {
//     type: Array,
//     validator: arrayValidator(
//       objectValidator({
//         text: {
//           required: true,
//           type: String,
//         },
//       }),
//       {
//         typeError: 'comment字段必须是一个数组',
//       }
//     ),
//   },
// }

// const errorMessage = {
//   required: key => `字段 "${key}" 缺失`,
//   type: key => `字段 ${key} 类型错误`,
// }
// const updateValidator = objectValidator(updateParams, { errorMessage })

// const res = updateValidator({
//   id: 1,
//   title: 'title',
//   content: 'less than ten',
//   comment: [{
//     text: 111,
//   }],
// })
// console.log(res)
