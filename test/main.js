import test from 'ava'
import { each } from 'test-each'
import setArray from 'set-array'

each(
  [
    [[], {}, []],
  ],
  ({ title }, [inputArray, items, outputArray]) => {
    test(`setArray() output | ${title}`, (t) => {
      t.deepEqual(setArray(inputArray, items), outputArray)
    })
  },
)

each([[true,{}]], ({ title }, args) => {
  test(`setArray() validates input | ${title}`, (t) => {
    t.throws(setArray.bind(undefined, ...args))
  })
})
