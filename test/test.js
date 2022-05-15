import test from 'ava'
import { test as testArg } from 'set-array'
import { each } from 'test-each'

each(
  [
    [],
    true,
    ...['1.0', '1e1', '+1', '1-', '--1', '1++', '', ' ', '1 ', ' 1', 'a'].map(
      (updateKey) => ({ [updateKey]: 'A' }),
    ),
  ],
  ({ title }, updatesObj) => {
    test(`test() invalid inputs | ${title}`, (t) => {
      t.false(testArg(updatesObj))
    })
  },
)

each(
  [{}, ...['1', '1+', '-1', '-1+'].map((updateKey) => ({ [updateKey]: 'A' }))],
  ({ title }, updatesObj) => {
    test(`test() valid inputs | ${title}`, (t) => {
      t.true(testArg(updatesObj))
    })
  },
)
