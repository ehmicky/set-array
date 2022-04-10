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
  [
    [['a', 'b', 'c'], { 0: 'A' }, { merge: setValue }, ['A', 'b', 'c']],
    [['a', 'b', 'c'], { 1: 'B' }, { merge: setValue }, ['a', 'B', 'c']],
    [['a', 'b', 'c'], { '-1': 'C' }, { merge: setValue }, ['a', 'b', 'C']],
    [['a', 'b', 'c'], { 1: 'B' }, { merge: concatValue }, ['a', 'bB', 'c']],
    [
      ['a', undefined, 'c'],
      { 1: 'B' },
      { merge: concatValue },
      ['a', 'undefinedB', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      { 4: 'E' },
      { merge: concatValue },
      ['a', 'b', 'c', undefined, 'undefinedE'],
    ],
    [
      ['a', 'b', 'c'],
      { 1: ['B', 'C'] },
      { merge: concatValue },
      ['a', 'bB', 'bC', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      { 1: 'B', '-2': ['C'] },
      { merge: concatValue },
      ['a', 'bB', 'bC', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      { '1+': 'AB' },
      { merge: concatValue },
      ['a', 'AB', 'b', 'c'],
    ],
  ],
  ({ title }, [inputArray, items, options, outputArray]) => {
    test(`"merge" option | ${title}`, (t) => {
      t.deepEqual(setArray(inputArray, items, options), outputArray)
    })
  },
)
