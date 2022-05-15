import { set, test, Index, Updates, Options } from 'set-array'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

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
set([], { '*': 'a' })

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

expectType<boolean>(test({}))
expectType<boolean>(test({ 0: 'a' }))
expectType<boolean>(test({ a: 'a' }))
expectType<boolean>(test([]))

expectAssignable<Index>('-12+')
expectAssignable<Index>('*')
expectNotAssignable<Index>('a')

expectAssignable<Updates<string>>({ '-12+': 'a' })
expectAssignable<Updates<string>>({ '*': 'a' })
expectAssignable<Updates<string>>({ '*': ['a'] })
expectAssignable<Updates<string>>({})
expectNotAssignable<Updates<string>>({ a: 'a' })
expectNotAssignable<Updates<string>>({ '*': true })

expectAssignable<Options<string>>({})
expectAssignable<Options<string>>({ merge: (a: string, b: string) => b })
expectNotAssignable<Options<string>>({ unknownOption: true })
