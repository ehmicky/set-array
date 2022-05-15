import { set } from 'set-array'
import { expectType, expectError } from 'tsd'

expectType<never[]>(set([], {}))
expectType<string[]>(set(['a'], {}))
expectType<string[]>(set([], { 0: 'a' }))
expectType<string[]>(set([], { 0: ['a', 'b'] }))
expectType<(string | number)[]>(set(['a', 1], {}))
expectType<(string | number)[]>(set(['a', 1], { 0: ['a', 1] }))

set(['a'], {}, { merge: (a: string, b: string) => b })
set([], { '-0': 'a' })
set([], { '0+': 'a' })
set([], { '-12+': 'a' })

expectError(set(true, {}))
expectError(set([], true))
expectError(set([], {}, true))
expectError(set([], {}, { unknownOption: true }))
expectError(set([], {}, { merge: true }))
expectError(set(['a'], {}, { merge: (a: string, b: number) => b }))
expectError(set(['a'], {}, { merge: (a: string, b: string) => true }))
expectError(set([], { a: 'a' }))
expectError(set([], { '--0': 'a' }))
expectError(set([], { '0++': 'a' }))
