type Index = `${number}${'+' | ''}` | number

interface Updates<T> {
  [index: Index]: T | T[]
}

interface Options<T> {
  /**
   * By default, the `updates` items override the original `array`'s items.
   * The `merge` option can be used to merge those instead.
   *
   * If an array of items is being added, `merge()` is called once per item.
   *
   * `merge()` is not called when the update's key ends with `+`, i.e. when
   * items are being prepended.
   *
   * `merge()` is called even if the update's index is out-of-bound, with
   * `oldValue` being `undefined`.
   *
   * @example
   * ```js
   * const merge = (oldValue, newValue) => [oldValue, newValue]
   *
   * setArray(['a', 'b', 'c'], { 1: 'X' }, { merge }) // ['a', ['b', 'X'], 'c']
   * setArray(['a', 'b', 'c'], { 1: ['X', 'Y'] }, { merge }) // ['a', ['b', 'X'], ['b', 'Y'], 'c']
   * setArray(['a', 'b', 'c'], { '1+': 'X' }, { merge }) // ['a', 'X', 'b', 'c']
   * setArray(['a', 'b', 'c'], { 4: 'X' }, { merge }) // ['a', 'b', 'c', undefined, [undefined, 'X']]
   * ```
   */
  merge?(oldValue: T, newValue: T): T
}

/**
 * Return a copy of `array` with each of the `updates` applied.
 *
 * `updates` values are the items to add.
 *  - Array of values add multiple items
 *  - Empty arrays remove items
 *
 * `updates` keys are the `array` indices (before any updates).
 *  - Negative indices match from the end
 *  - `-0` appends items
 *  - If the key ends with `+`, items are prepended, not replaced
 *
 * @example
 * ```js
 * setArray(['a', 'b', 'c'], { 1: 'X' }) // ['a', 'X', 'c']
 * setArray(['a', 'b', 'c'], { 1: 'X', 2: 'Y' }) // ['a', 'X', 'Y']
 * setArray(['a', 'b', 'c'], { '-1': 'X' }) // ['a', 'b', 'X']
 * setArray(['a', 'b', 'c'], { 4: 'X' }) // ['a', 'b', 'c', undefined, 'X']
 * setArray(['a', 'b', 'c'], { '-10': 'X' }) // ['X', 'b', 'c']
 * setArray(['a', 'b', 'c'], { '-0': 'X' }) // ['a', 'b', 'c', 'X']
 * setArray(['a', 'b', 'c'], { '1+': 'X' }) // ['a', 'X', 'b', 'c']
 * setArray(['a', 'b', 'c'], { 1: ['X', 'Y'] }) // ['a', 'X', 'Y', 'c']
 * setArray(['a', 'b', 'c'], { 1: [] }) // ['a', 'c']
 * setArray(['a', 'b', 'c'], { 1: ['X'] }) // ['a', 'X', 'c']
 * setArray(['a', 'b', 'c'], { 1: [['X']] }) // ['a', ['X'], 'c']
 * ```
 */
export default function setArray<T>(
  array: T[],
  updates: Updates<T>,
  options?: Options<T>,
): T[]
