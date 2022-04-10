import { applyUpdates } from './apply.js'
import { concatUpdates } from './concat.js'
import { normalizeInput } from './input.js'

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
export default function setArray(array, updatesObj, options) {
  const optionsA = normalizeInput(array, updatesObj, options)
  const updates = normalizeUpdatesObj(updatesObj, array.length)
  const updatesA = concatUpdates(updates)
  const arrayA = applyUpdates(array, updatesA, optionsA)
  return arrayA
}

// Transform the updates object to an array of normalized updates
const normalizeUpdatesObj = function (updatesObj, length) {
  return Object.entries(updatesObj).map(([updateKey, items]) =>
    normalizeUpdate(updateKey, items, length),
  )
}

const normalizeUpdate = function (updateKey, items, length) {
  const { index, fullIndex, negation } = resolveIndex(updateKey, length)
  const itemsA = Array.isArray(items) ? items : [items]
  return { index, fullIndex, negation, items: itemsA }
}

const resolveIndex = function (updateKey, length) {
  const { updateKey: updateKeyA, prepend } = resolvePrepend(updateKey)
  const fullIndex = Number(updateKeyA)
  const { index, negation } = resolveNegation(fullIndex, length)
  const indexA = index - prepend
  return { index: indexA, fullIndex, negation }
}

// Resolves using '+' to prepend values.
// This results in a "half-index", e.g. 1.5 is inserted between 1 and 2
const resolvePrepend = function (updateKey) {
  return updateKey.endsWith(PREPEND_CHAR)
    ? { updateKey: updateKey.slice(0, -1), prepend: 0.5 }
    : { updateKey, prepend: 0 }
}

const PREPEND_CHAR = '+'

// Resolves negative indices.
// We use a `negation` property for the sorting logic later.
const resolveNegation = function (fullIndex, length) {
  return fullIndex <= 0 && !Object.is(fullIndex, +0)
    ? { index: Math.max(length + fullIndex, +0), negation: 1 }
    : { index: fullIndex, negation: 0 }
}
