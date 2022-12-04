import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

import { set, test, type Index, type Updates, type Options } from 'set-array'

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

// @ts-expect-error
set(true, {})
// @ts-expect-error
set([], true)
// @ts-expect-error
set([], {}, true)
// @ts-expect-error
set([], {}, { unknownOption: true })
// @ts-expect-error
set([], {}, { merge: true })
// @ts-expect-error
set(['a'], {}, { merge: (a: string, b: number) => b })
// @ts-expect-error
set(['a'], {}, { merge: (a: string, b: string) => true })
// @ts-expect-error
set([], { a: 'a' })
// @ts-expect-error
set([], { '--0': 'a' })
// @ts-expect-error
set([], { '0++': 'a' })

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
