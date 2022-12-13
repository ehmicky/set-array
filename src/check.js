import isPlainObj from 'is-plain-obj'

// Return whether the argument is an object that follows the shape expected
// by `set()`.
export const test = (updatesObj) => testUpdatesObj(updatesObj) === undefined

export const testUpdatesObj = (updatesObj) => {
  if (!isPlainObj(updatesObj)) {
    return { error: 'plainObj' }
  }

  // eslint-disable-next-line fp/no-loops
  for (const key in updatesObj) {
    // eslint-disable-next-line max-depth
    if (!isValidKey(key)) {
      return { error: 'key', key }
    }
  }

  return testSymbols(updatesObj)
}

const testSymbols = (updatesObj) => {
  const [symbol] = Object.getOwnPropertySymbols(updatesObj)

  if (symbol !== undefined) {
    return { error: 'symbol', symbol }
  }
}

const isValidKey = (key) => key === ANY_KEY || UPDATE_KEY_REGEXP.test(key)

// Special key targeting all array elements
export const ANY_KEY = '*'
// Means the value should be prepended
export const PREPEND_CHAR = '+'
// Matches -5, 5+ or -5+, for any integer
const UPDATE_KEY_REGEXP = /^-?\d+\+?$/u
