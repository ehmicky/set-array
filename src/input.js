import isPlainObj from 'is-plain-obj'

import { testUpdatesObj } from './test.js'

// Validate and normalize arguments
export const normalizeInput = function (array, updatesObj, options) {
  validateArray(array)
  validateUpdatesObj(updatesObj)
  return normalizeOptions(options)
}

const validateArray = function (array) {
  if (!Array.isArray(array)) {
    throw new TypeError(`First argument must be an array: ${array}`)
  }
}

const validateUpdatesObj = function (updatesObj) {
  const errorObj = testUpdatesObj(updatesObj)

  if (errorObj !== undefined) {
    throw new TypeError(
      UPDATES_OBJ_ERRORS[errorObj.error]({ updatesObj, ...errorObj }),
    )
  }
}

const UPDATES_OBJ_ERRORS = {
  plainObj({ updatesObj }) {
    return `Second argument must be an object: ${updatesObj}`
  },
  key({ key }) {
    return `Second argument's keys must be numbers or "*": "${key}"`
  },
  symbol({ symbol }) {
    return `Second argument's keys must not be symbols: ${String(symbol)}`
  },
}

const normalizeOptions = function (options = {}) {
  if (!isPlainObj(options)) {
    throw new TypeError(`Last options argument must be an object: ${options}`)
  }

  const { merge } = options

  if (merge !== undefined && typeof merge !== 'function') {
    throw new TypeError(`options.merge must be a function: ${merge}`)
  }

  return options
}
