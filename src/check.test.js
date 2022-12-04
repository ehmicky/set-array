import test from 'ava'
import { each } from 'test-each'

import { INVALID_KEYS } from './helpers/invalid.test.js'

import { test as testArg } from 'set-array'

each(
  [[], true, ...INVALID_KEYS.map((updateKey) => ({ [updateKey]: 'A' }))],
  ({ title }, updatesObj) => {
    test(`test() invalid inputs | ${title}`, (t) => {
      t.false(testArg(updatesObj))
    })
  },
)

each(
  [
    {},
    ...['1', '1+', '-1', '-1+', '*'].map((updateKey) => ({ [updateKey]: 'A' })),
  ],
  ({ title }, updatesObj) => {
    test(`test() valid inputs | ${title}`, (t) => {
      t.true(testArg(updatesObj))
    })
  },
)
