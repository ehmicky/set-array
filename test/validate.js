import test from 'ava'
import setArray from 'set-array'
import { each } from 'test-each'

const throwError = function () {
  throw new Error('test')
}

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
    [['a'], { 0: 'A' }, { merge: throwError }],
  ],
  ({ title }, args) => {
    test(`setArray() validates input | ${title}`, (t) => {
      t.throws(setArray.bind(undefined, ...args))
    })
  },
)
