import { groupBy } from './group.js'

// Negative and positive indices might match the same index.
// In that case, the negative indices are inserted last.
//  - This ensures -1 is always last, which might be expected by some users
// Also, if several different negative indices have been bounded to 0, they
// are sorted.
// '*' updates are always applied first, so other updates can override them.
export const concatUpdates = (updates) => {
  if (updates.length === 1) {
    return updates
  }

  const updatesA = Object.values(groupBy(updates, 'index')).map(concatGroup)
  // eslint-disable-next-line fp/no-mutating-methods
  return [...updatesA].sort(secondSortFunc)
}

const concatGroup = (updates) => {
  if (updates.length === 1) {
    return updates[0]
  }

  const [{ index, any }] = updates
  // eslint-disable-next-line fp/no-mutating-methods
  const updatesA = [...updates].sort(firstSortFunc)
  const items = updatesA.flatMap(getItems)
  return { index, any, items }
}

const getItems = ({ items }) => items

const firstSortFunc = (updateA, updateB) => {
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

const secondSortFunc = (updateA, updateB) => {
  if (updateA.any < updateB.any) {
    return 1
  }

  if (updateA.any > updateB.any) {
    return -1
  }

  if (updateA.index < updateB.index) {
    return -1
  }

  if (updateA.index > updateB.index) {
    return 1
  }

  return 0
}
