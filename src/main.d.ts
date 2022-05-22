export type Index = `${number}${'+' | ''}` | number | '*'

export type Updates<T> = {
  [U in Index]?: T | T[]
}

export interface Options<T> {
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
   * set(['a', 'b', 'c'], { 1: 'X' }, { merge }) // ['a', ['b', 'X'], 'c']
   * set(['a', 'b', 'c'], { '*': 'X' }, { merge }) // [['a', 'X'], ['b', 'X'], ['c', 'X']]
   * set(['a', 'b', 'c'], { 1: ['X', 'Y'] }, { merge }) // ['a', ['b', 'X'], ['b', 'Y'], 'c']
   * set(['a', 'b', 'c'], { '1+': 'X' }, { merge }) // ['a', 'X', 'b', 'c']
   * set(['a', 'b', 'c'], { 4: 'X' }, { merge }) // ['a', 'b', 'c', undefined, [undefined, 'X']]
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
 *  - `*` targets all items
 *
 * @example
 * ```js
 * set(['a', 'b', 'c'], { 1: 'X' }) // ['a', 'X', 'c']
 * set(['a', 'b', 'c'], { 1: 'X', 2: 'Y' }) // ['a', 'X', 'Y']
 * set(['a', 'b', 'c'], { '*': 'X' }) // ['X', 'X', 'X']
 * set(['a', 'b', 'c'], { '-1': 'X' }) // ['a', 'b', 'X']
 * set(['a', 'b', 'c'], { 4: 'X' }) // ['a', 'b', 'c', undefined, 'X']
 * set(['a', 'b', 'c'], { '-10': 'X' }) // ['X', 'b', 'c']
 * set(['a', 'b', 'c'], { '-0': 'X' }) // ['a', 'b', 'c', 'X']
 * set(['a', 'b', 'c'], { '1+': 'X' }) // ['a', 'X', 'b', 'c']
 * set(['a', 'b', 'c'], { 1: ['X', 'Y'] }) // ['a', 'X', 'Y', 'c']
 * set(['a', 'b', 'c'], { 1: [] }) // ['a', 'c']
 * set(['a', 'b', 'c'], { 1: ['X'] }) // ['a', 'X', 'c']
 * set(['a', 'b', 'c'], { 1: [['X']] }) // ['a', ['X'], 'c']
 * set([], { 0: 'X', 2: 'Z' }) // ['X', undefined, 'Z']
 * ```
 */
export function set<T>(
  array: T[],
  updates: Updates<T>,
  options?: Options<T>,
): T[]

/**
 * Return whether the argument is an object that follows the shape expected by
 * `set()`.
 *
 * @example
 * ```js
 * test({ 1: 'X' }) // true
 * test({ '1+': 'X' }) // true
 * test({ '-1': 'X' }) // true
 * test({ '*': 'X' }) // true
 * test({}) // true
 *
 * test({ notAnIndex: 'X' }) // false
 * test('X') // false
 * ```
 */
export function test(updates: any): boolean
