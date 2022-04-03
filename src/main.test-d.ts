import setArray from 'set-array'
import { expectType, expectError } from 'tsd'

expectType<any[]>(setArray([], {}))
expectError(setArray(true, {}))
