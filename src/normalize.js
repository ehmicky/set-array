// Validate and normalize arguments
export const normalizeInput = function (array, itemsObj, options) {
  if (!Array.isArray(array)) {
    throw new TypeError(`First argument must be an array: ${array}`)
  }

  if (!isObject(itemsObj)) {
    throw new TypeError(`Second argument must be an object: ${itemsObj}`)
  }

  return normalizeOptions(options)
}

const normalizeOptions = function (options = {}) {
  if (!isObject(options)) {
    throw new TypeError(`Last options argument must be an object: ${options}`)
  }

  const { merge = defaultMerge } = options
  return { merge }
}

const defaultMerge = function (valueA, valueB) {
  return valueB
}

const isObject = function (value) {
  return typeof value === 'object' && value !== null
}
