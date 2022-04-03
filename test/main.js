import test from 'ava'
import setArray from 'set-array'
import { each } from 'test-each'

each([[[], {}, []]], ({ title }, [inputArray, items, outputArray]) => {
  test(`setArray() output | ${title}`, (t) => {
    t.deepEqual(setArray(inputArray, items), outputArray)
  })
})

each([[true, {}]], ({ title }, args) => {
  test(`setArray() validates input | ${title}`, (t) => {
    t.throws(setArray.bind(undefined, ...args))
  })
})
