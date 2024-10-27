// Apply each update to the array.
// The original array is not mutated.
// This uses imperative logic for performance.
export const applyUpdates = (array, updates, { merge }) => {
  const { array: arrayA, updates: updatesA } = applyAny(array, updates, merge)

  const newArray = []
  // eslint-disable-next-line fp/no-let
  let previousIndex = -1

  // eslint-disable-next-line fp/no-loops
  for (const update of updatesA) {
    // eslint-disable-next-line fp/no-mutation
    previousIndex = applyUpdate({
      update,
      array: arrayA,
      newArray,
      previousIndex,
      merge,
    })
  }

  pushValues(arrayA, newArray, previousIndex + 1, arrayA.length)
  return newArray
}

// When a '*' update is present, it modifies all value of the array
const applyAny = (array, updates, merge) => {
  if (updates.length === 0 || !updates[0].any) {
    return { array, updates }
  }

  const [{ items }, ...updatesA] = updates
  const arrayA = array.flatMap((_, index) =>
    applyMerge({ items, array, index, merge }),
  )
  return { array: arrayA, updates: updatesA }
}

const applyUpdate = ({
  update: { index, items },
  array,
  newArray,
  previousIndex,
  merge,
}) => {
  pushValues(array, newArray, previousIndex + 1, Math.ceil(index))
  const itemsA = applyMerge({ items, array, index, merge })
  pushValues(itemsA, newArray, 0, itemsA.length)
  return Math.floor(index)
}

// The `merge()` option can be used to merge the new value with the current one.
// It is called even if the current value is `undefined`
//  - Even if `ceiledIndex >= array.length`
// It is not called if the new value is being prepended.
const applyMerge = ({ items, array, index, merge }) => {
  if (merge === undefined || !Number.isInteger(index)) {
    return items
  }

  const oldValue = array[index]
  return items.map((newValue) => merge(oldValue, newValue))
}

// eslint-disable-next-line max-params
const pushValues = (array, newArray, from, to) => {
  // eslint-disable-next-line fp/no-loops, fp/no-mutation, fp/no-let
  for (let index = from; index < to; index += 1) {
    newArray.push(array[index])
  }
}
