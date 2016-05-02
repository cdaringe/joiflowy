'use strict'

const joi = require('joi')

/**
 * wraps provided function and joi validates input schema on-call
 * @param {function} fn
 * @param {object} schema can use many schemas
 * @param {object} [options]
 * @returns {function}
 */
const joiflowy = function joiflowy(fn, schema) {
  const ctx = this
  if (!fn || !(fn instanceof Function)) throw new TypeError('missing function')
  let schemas = []
  let valdiateOpts
  let arg
  let i
  for (i = 1; i < arguments.length; ++i) {
    arg = arguments[i]
    if (arg && arg.isJoi) schemas.push(arg)
    else if (arg instanceof Object && i === (arguments.length - 1)) valdiateOpts = arg
    else schemas.push(null) // null ==> skip validation for arg
  }
  return function joiflowyValidate() {
    for (i = 0; i < schemas.length; ++i) {
      if (schemas[i]) {
        let v = joi.validate(arguments[i], schemas[i], valdiateOpts)
        if (v.error) throw v.error
      }
    }
    return fn.apply(ctx, arguments)
  }
}

joiflowy.joi = joiflowy.Joi = joiflowy.j = joi

module.exports = joiflowy
