// Transform the updates object to an array of normalized updates
export const normalizeUpdatesObj = function (updatesObj, length) {
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
