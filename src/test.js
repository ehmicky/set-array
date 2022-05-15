import isPlainObj from 'is-plain-obj'

// Returns whether the argument is an object that follows the shape expected
// by `set()`.
export const test = function (updatesObj) {
  return testUpdatesObj(updatesObj) === undefined
}

export const testUpdatesObj = function (updatesObj) {
  if (!isPlainObj(updatesObj)) {
    return { error: 'plainObj' }
  }

  // eslint-disable-next-line fp/no-loops
  for (const key in updatesObj) {
    // eslint-disable-next-line max-depth
    if (!UPDATE_KEY_REGEXP.test(key)) {
      return { error: 'key', key }
    }
  }
}

// Matches -5, 5+ or -5+, for any integer
const UPDATE_KEY_REGEXP = /^-?\d+\+?$/u
