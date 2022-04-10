import isPlainObj from 'is-plain-obj'

// Validate arguments
export const validateInput = function (array, updatesObj, options) {
  validateArray(array)
  validateUpdatesObj(updatesObj)
  validateOptions(options)
}

const validateArray = function (array) {
  if (!Array.isArray(array)) {
    throw new TypeError(`First argument must be an array: ${array}`)
  }
}

const validateUpdatesObj = function (updatesObj) {
  if (!isPlainObj(updatesObj)) {
    throw new TypeError(`Second argument must be an object: ${updatesObj}`)
  }

  // eslint-disable-next-line fp/no-loops, guard-for-in
  for (const updateKey in updatesObj) {
    validateUpdateKey(updateKey)
  }
}

const validateUpdateKey = function (updateKey) {
  if (!UPDATE_KEY_REGEXP.test(updateKey)) {
    throw new TypeError(
      `Second argument's keys must be numbers: "${updateKey}"`,
    )
  }
}

// Matches -5, 5+ or -5+, for any integer
const UPDATE_KEY_REGEXP = /^-?\d+\+?$/u

const validateOptions = function (options = {}) {
  if (!isPlainObj(options)) {
    throw new TypeError(`Last options argument must be an object: ${options}`)
  }

  if (typeof options.merge !== 'function') {
    throw new TypeError(`options.merge must be a function: ${options.merge}`)
  }
}
