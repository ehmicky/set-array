// Group an array of objects into an object of objects based on a property
// TODO: replace by `Array.groupBy()` once supported by Node.js
export const groupBy = function (array, propName) {
  const groups = {}

  // eslint-disable-next-line fp/no-loops
  for (const object of array) {
    addGroup(object, groups, propName)
  }

  return groups
}

// We directly mutate `groups` for performance reasons
const addGroup = function (object, groups, propName) {
  const group = String(object[propName])

  if (groups[group] === undefined) {
    // eslint-disable-next-line no-param-reassign, fp/no-mutation
    groups[group] = [object]
  } else {
    // eslint-disable-next-line fp/no-mutating-methods
    groups[group].push(object)
  }
}
