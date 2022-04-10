import test from 'ava'
import setArray from 'set-array'
import { each } from 'test-each'

const setValue = function (valueA, valueB) {
  return valueB
}

const concatValue = function (valueA, valueB) {
  return `${valueA}${valueB}`
}

each(
  [[['a', 'b', 'c'], { 1: 'B' }, { merge: setValue }, ['a', 'B', 'c']]],
  [[['a', 'b', 'c'], { 1: 'B' }, { merge: concatValue }, ['a', 'bB', 'c']]],
  ({ title }, [inputArray, items, options, outputArray]) => {
    test(`"merge" option | ${title}`, (t) => {
      t.deepEqual(setArray(inputArray, items, options), outputArray)
    })
  },
)
