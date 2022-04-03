import { normalizeInput } from './normalize.js'

export default function setArray(array, itemsObj, options) {
  const { merge } = normalizeInput(array, itemsObj, options)
  return array
}
