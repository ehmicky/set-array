// Apply each update to the array.
// The original array is not mutated.
// This uses imperative logic for performance.
export const applyUpdates = function (array, updates) {
  const newArray = []
  // eslint-disable-next-line fp/no-let
  let previousIndex = -1

  // eslint-disable-next-line fp/no-loops
  for (const update of updates) {
    // eslint-disable-next-line fp/no-mutation
    previousIndex = applyUpdate(update, array, newArray, previousIndex)
  }

  pushValues(array, newArray, previousIndex + 1, array.length)
  return newArray
}

// eslint-disable-next-line max-params
const applyUpdate = function (
  { index, items },
  array,
  newArray,
  previousIndex,
) {
  pushValues(array, newArray, previousIndex + 1, Math.ceil(index))
  pushValues(items, newArray, 0, items.length)
  return Math.floor(index)
}

// eslint-disable-next-line max-params
const pushValues = function (array, newArray, from, to) {
  // eslint-disable-next-line fp/no-loops, fp/no-mutation, fp/no-let
  for (let index = from; index < to; index += 1) {
    // eslint-disable-next-line fp/no-mutating-methods
    newArray.push(array[index])
  }
}
