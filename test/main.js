import test from 'ava'
import setArray from 'set-array'
import { each } from 'test-each'

each(
  [
    [[], {}, []],
    [['a', 'b', 'c'], {}, ['a', 'b', 'c']],
    [['a', 'b', 'c'], { 1: 'B' }, ['a', 'B', 'c']],
    [['a', 'b', 'c'], { 4: 'E' }, ['a', 'b', 'c', undefined, 'E']],
    [['a', 'b', 'c'], { '-0': 'D' }, ['a', 'b', 'c', 'D']],
    [['a', 'b', 'c'], { '-2': 'B' }, ['a', 'B', 'c']],
    [['a', 'b', 'c'], { '-4': 'A' }, ['A', 'b', 'c']],
    [['a', 'b', 'c'], { '0+': 'Z' }, ['Z', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { '1+': 'AB' }, ['a', 'AB', 'b', 'c']],
    [['a', 'b', 'c'], { '4+': 'DE' }, ['a', 'b', 'c', undefined, 'DE']],
    [
      ['a', 'b', 'c'],
      { 4: 'E', '4+': 'DE' },
      ['a', 'b', 'c', undefined, 'DE', 'E'],
    ],
    [['a', 'b', 'c'], { '-0+': 'D' }, ['a', 'b', 'c', 'D']],
    [['a', 'b', 'c'], { '-2+': 'AB' }, ['a', 'AB', 'b', 'c']],
    [['a', 'b', 'c'], { '-4+': 'Z' }, ['Z', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { 1: ['B1', 'B2'] }, ['a', 'B1', 'B2', 'c']],
    [['a', 'b', 'c'], { 4: ['E', 'F'] }, ['a', 'b', 'c', undefined, 'E', 'F']],
    [['a', 'b', 'c'], { '-0': ['D', 'E'] }, ['a', 'b', 'c', 'D', 'E']],
    [['a', 'b', 'c'], { '0+': ['Z1', 'Z2'] }, ['Z1', 'Z2', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { '1+': ['AB1', 'AB2'] }, ['a', 'AB1', 'AB2', 'b', 'c']],
    [
      ['a', 'b', 'c'],
      { '4+': ['E', 'F'] },
      ['a', 'b', 'c', undefined, 'E', 'F'],
    ],
    [['a', 'b', 'c'], { 1: 'B', 2: 'C' }, ['a', 'B', 'C']],
    [['a', 'b', 'c'], { 0: 'A', 2: 'C' }, ['A', 'b', 'C']],
    [['a', 'b', 'c'], { 1: 'B2', '-2': 'B1' }, ['a', 'B1', 'B2', 'c']],
    [
      ['a', 'b', 'c'],
      { '1+': 'AB2', '-2+': 'AB1' },
      ['a', 'AB1', 'AB2', 'b', 'c'],
    ],
    [['a', 'b', 'c'], { '0+': 'Z2', '-4+': 'Z1' }, ['Z1', 'Z2', 'a', 'b', 'c']],
    [
      ['a', 'b', 'c'],
      { '0+': ['Z2', 'Z3'], '-4+': 'Z1' },
      ['Z1', 'Z2', 'Z3', 'a', 'b', 'c'],
    ],
  ],
  ({ title }, [inputArray, items, outputArray]) => {
    test(`setArray() output | ${title}`, (t) => {
      t.deepEqual(setArray(inputArray, items), outputArray)
    })
  },
)

each(
  [
    ...[true, {}].map((array) => [array, {}]),
    ...[undefined, true, [], Object.create({})].map((updatesObj) => [
      [],
      updatesObj,
    ]),
    ...['1.0', '1e1', '+1', '1-', '--1', '1++', '', ' ', '1 ', ' 1'].map(
      (updateKey) => [[], { [updateKey]: 'A' }],
    ),
    ...[true, { merge: true }].map((options) => [[], {}, options]),
  ],
  ({ title }, args) => {
    test(`setArray() validates input | ${title}`, (t) => {
      t.throws(setArray.bind(undefined, ...args))
    })
  },
)
