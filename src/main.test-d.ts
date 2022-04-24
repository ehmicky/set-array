import setArray from 'set-array'
import { expectType, expectError } from 'tsd'

expectType<never[]>(setArray([], {}))
expectType<string[]>(setArray(['a'], {}))
expectType<string[]>(setArray([], { 0: 'a' }))
expectType<string[]>(setArray([], { 0: ['a', 'b'] }))
expectType<(string | number)[]>(setArray(['a', 1], {}))
expectType<(string | number)[]>(setArray(['a', 1], { 0: ['a', 1] }))

setArray(['a'], {}, { merge: (a: string, b: string) => b })
setArray([], { '-0': 'a' })
setArray([], { '0+': 'a' })
setArray([], { '-12+': 'a' })

expectError(setArray(true, {}))
expectError(setArray([], true))
expectError(setArray([], {}, true))
expectError(setArray([], {}, { unknownOption: true }))
expectError(setArray([], {}, { merge: true }))
expectError(setArray(['a'], {}, { merge: (a: string, b: number) => b }))
expectError(setArray(['a'], {}, { merge: (a: string, b: string) => true }))
expectError(setArray([], { a: 'a' }))
expectError(setArray([], { '--0': 'a' }))
expectError(setArray([], { '0++': 'a' }))
