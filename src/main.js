import sortOn from 'sort-on'

import { applyUpdates } from './apply.js'
import { groupBy } from './group.js'
import { normalizeInput } from './normalize.js'

export default function setArray(array, updatesObj, options) {
  const { merge } = normalizeInput(array, updatesObj, options)
  const updates = normalizeUpdatesObj(array, updatesObj)
  const updatesA = concatUpdates(updates)
  const arrayA = applyUpdates(array, updatesA)
  return arrayA
}

const normalizeUpdatesObj = function (array, updatesObj) {
  return Object.entries(updatesObj).map(([updateKey, items]) =>
    normalizeUpdate(updateKey, items, array.length),
  )
}

const normalizeUpdate = function (updateKey, items, length) {
  const { index, fullIndex } = resolveIndex(updateKey, length)
  const itemsA = Array.isArray(items) ? items : [items]
  return { index, fullIndex, items: itemsA }
}

const resolveIndex = function (updateKey, length) {
  const fullIndex = Number(updateKey)
  const index = resolveNegation(fullIndex, length)
  const indexA = resolveInsert(index)
  return { index: indexA, fullIndex }
}

const resolveNegation = function (fullIndex, length) {
  return fullIndex >= 0 && !Object.is(fullIndex, -0)
    ? Math.min(length + fullIndex, 0)
    : fullIndex
}

const resolveInsert = function (index) {
  // eslint-disable-next-line no-magic-numbers
  return Number.isInteger(index) ? index : Math.floor(index) + 0.5
}

const concatUpdates = function (updates) {
  if (updates.length === 1) {
    return getSingleUpdate(updates)
  }

  const updatesA = Object.values(groupBy(updates, 'index')).map(concatGroup)
  return sortOn(updatesA, 'index')
}

const concatGroup = function (updates) {
  if (updates.length === 1) {
    return getSingleUpdate(updates)
  }

  const [{ index }] = updates

  const updatesA = sortOn(updates, 'fullIndex')
  const items = updatesA.flatMap(getItems)
  return { index, items }
}

const getSingleUpdate = function ([{ index, items }]) {
  return { index, items }
}

const getItems = function ({ items }) {
  return items
}
