import isPlainObj from 'is-plain-obj'

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

const UPDATE_KEY_REGEXP = /^-?\d+\+?$/u

const normalizeOptions = function (options = {}) {
  if (!isPlainObj(options)) {
    throw new TypeError(`Last options argument must be an object: ${options}`)
  }

  const { merge = defaultMerge } = options

  if (typeof merge !== 'function') {
    throw new TypeError(`options.merge must be a function: ${merge}`)
  }

  return { merge }
}

const defaultMerge = function (valueA, valueB) {
  return valueB
}
