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
  const updatesA = sortOn(updates, ['negation', 'fullIndex'])
  const items = updatesA.flatMap(getItems)
  return { index, any, items }
}

const getItems = function ({ items }) {
  return items
}
