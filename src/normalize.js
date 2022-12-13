import { ANY_KEY, PREPEND_CHAR } from './check.js'

// Transform the updates object to an array of normalized updates
export const normalizeUpdatesObj = (updatesObj, length) => {
  const lengthA = getLength(length, updatesObj)
  return Object.entries(updatesObj).map(([updateKey, items]) =>
    normalizeUpdate(updateKey, items, lengthA),
  )
}

const getLength = (length, { [ANY_KEY]: anyItems }) =>
  Array.isArray(anyItems) ? length * anyItems.length : length

// Multiple `items` can be updated|inserted by using an array
const normalizeUpdate = (updateKey, items, length) => {
  const { index, fullIndex, negation, any } = resolveIndex(updateKey, length)
  const itemsA = Array.isArray(items) ? items : [items]
  return { index, fullIndex, negation, any, items: itemsA }
}

const resolveIndex = (updateKey, length) => {
  const any = updateKey === ANY_KEY

  if (any) {
    return { negation: 2, any }
  }

  const { updateKey: updateKeyA, prepend } = resolvePrepend(updateKey)
  const fullIndex = Number(updateKeyA)
  const { index, negation } = resolveNegation(fullIndex, length)
  const indexA = index - prepend
  return { index: indexA, fullIndex, negation, any }
}

// Resolves using '+' to prepend values.
// This results in a "half-index", e.g. 1.5 is inserted between 1 and 2
const resolvePrepend = (updateKey) =>
  updateKey.endsWith(PREPEND_CHAR)
    ? { updateKey: updateKey.slice(0, -1), prepend: 0.5 }
    : { updateKey, prepend: 0 }

// Resolves negative indices.
// We use a `negation` property for the sorting logic later.
const resolveNegation = (fullIndex, length) =>
  fullIndex <= 0 && !Object.is(fullIndex, +0)
    ? { index: Math.max(length + fullIndex, +0), negation: 1 }
    : { index: fullIndex, negation: 0 }
