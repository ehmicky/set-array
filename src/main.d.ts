type Index = `${number}${'+' | ''}` | number

interface Updates<T> {
  [index: Index]: T | T[]
}

interface Options<T> {
  merge?(firstValue: T, secondValue: T): T
}

/**
 * Description
 *
 * @example
 * ```js
 * ```
 */
export default function setArray<T>(
  array: T[],
  updates: Updates<T>,
  options?: Options<T>,
): T[]
