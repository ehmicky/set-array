import test from 'ava'
import { each } from 'test-each'

import { INVALID_KEYS } from './helpers/invalid.test.js'

import { set } from 'set-array'

const throwError = () => {
  throw new Error('test')
}

each(
  [
    ...[true, {}].map((array) => [array, {}]),
    ...[undefined, true, [], Object.create({})].map((updatesObj) => [
      [],
      updatesObj,
    ]),
    ...INVALID_KEYS.map((updateKey) => [[], { [updateKey]: 'A' }]),
    ...[true, { merge: true }].map((options) => [[], {}, options]),
    [['a'], { 0: 'A' }, { merge: throwError }],
  ],
  ({ title }, args) => {
    test(`set() validates input | ${title}`, (t) => {
      t.throws(set.bind(undefined, ...args))
    })
  },
)
