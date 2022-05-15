import { applyUpdates } from './apply.js'
import { concatUpdates } from './concat.js'
import { normalizeInput } from './input.js'
import { normalizeUpdatesObj } from './normalize.js'

export { test } from './test.js'

// Set/insert/append/omit multiple array items.
// `updatesObj` is an object where each property is a single update with its:
//  - Value:
//     - Is the one used to set/insert/append/omit
//     - Can be an array for multiple values
//        - Can be an empty array to omit values
//        - To set an array value, it must be wrapped in an additional array
//  - Key:
//     - Is the array index to use
//        - Always refers to the index of the original array, regardless of new
//          elements being inserted
//     - Negative indices are matched from the end
//        - -0 can be used to append values
//     - If it ends with '+', the value is prepended instead of overriding
// This format:
//  - Is declarative
//  - Allows all of: replacing, patching, appending, omitting
//  - Is friendly to CLI flags
export const set = function (array, updatesObj, options) {
  const optionsA = normalizeInput(array, updatesObj, options)
  const updates = normalizeUpdatesObj(updatesObj, array.length)
  const updatesA = concatUpdates(updates)
  const arrayA = applyUpdates(array, updatesA, optionsA)
  return arrayA
}
