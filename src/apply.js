// Apply each update to the array.
// The original array is not mutated.
// This uses imperative logic for performance.
export const applyUpdates = function (array, updates, { merge }) {
  const newArray = []
  // eslint-disable-next-line fp/no-let
  let previousIndex = -1

  // eslint-disable-next-line fp/no-loops
  for (const update of updates) {
    // eslint-disable-next-line fp/no-mutation
    previousIndex = applyUpdate({
      update,
      array,
      newArray,
      previousIndex,
      merge,
    })
  }

  pushValues(array, newArray, previousIndex + 1, array.length)
  return newArray
}

const applyUpdate = function ({
  update: { index, items },
  array,
  newArray,
  previousIndex,
  merge,
}) {
  pushValues(array, newArray, previousIndex + 1, Math.ceil(index))
  const itemsA = applyMerge({ items, array, index, merge })
  pushValues(itemsA, newArray, 0, itemsA.length)
  return Math.floor(index)
}

// The `merge()` option can be used to merge the new value with the current one.
// It is called even if the current value is `undefined`
//  - Even if `ceiledIndex >= array.length`
// It is not called if the new value is being prepended.
const applyMerge = function ({ items, array, index, merge }) {
  if (merge === undefined || !Number.isInteger(index)) {
    return items
  }

  const value = array[index]
  return items.map((item) => merge(value, item))
}

// eslint-disable-next-line max-params
const pushValues = function (array, newArray, from, to) {
  // eslint-disable-next-line fp/no-loops, fp/no-mutation, fp/no-let
  for (let index = from; index < to; index += 1) {
    // eslint-disable-next-line fp/no-mutating-methods
    newArray.push(array[index])
  }
}
