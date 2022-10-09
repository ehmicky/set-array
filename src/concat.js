import sortOn from 'sort-on'

import { groupBy } from './group.js'

// Negative and positive indices might match the same index.
// In that case, the negative indices are inserted last.
//  - This ensures -1 is always last, which might be expected by some users
// Also, if several different negative indices have been bounded to 0, they
// are sorted.
// '*' updates are always applied first, so other updates can override them.
export const concatUpdates = function (updates) {
  if (updates.length === 1) {
    return updates
  }

  const updatesA = Object.values(groupBy(updates, 'index')).map(concatGroup)
  return sortOn(updatesA, ['any', 'index'])
}

const concatGroup = function (updates) {
  if (updates.length === 1) {
    return updates[0]
  }

  const [{ index, any }] = updates
  // eslint-disable-next-line fp/no-mutating-methods
  const updatesA = [...updates].sort(firstSortFunc)
  const items = updatesA.flatMap(getItems)
  return { index, any, items }
}

const getItems = function ({ items }) {
  return items
}

// eslint-disable-next-line complexity
const firstSortFunc = function (updateA, updateB) {
  if (updateA.negation < updateB.negation) {
    return -1
  }

  if (updateA.negation > updateB.negation) {
    return 1
  }

  if (updateA.fullIndex < updateB.fullIndex) {
    return -1
  }

  if (updateA.fullIndex > updateB.fullIndex) {
    return 1
  }

  return 0
}
