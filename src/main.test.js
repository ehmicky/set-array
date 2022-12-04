import test from 'ava'
import { each } from 'test-each'

import { set } from 'set-array'

each(
  [
    [[], {}, []],
    [['a', 'b', 'c'], {}, ['a', 'b', 'c']],
    [['a', 'b', 'c'], { 1: 'B' }, ['a', 'B', 'c']],
    [['a', 'b', 'c'], { 4: 'E' }, ['a', 'b', 'c', undefined, 'E']],
    [['a', 'b', 'c'], { '-0': 'D' }, ['a', 'b', 'c', 'D']],
    [['a', 'b', 'c'], { '-2': 'B' }, ['a', 'B', 'c']],
    [['a', 'b', 'c'], { '-4': 'A' }, ['A', 'b', 'c']],
    [['a', 'b', 'c'], { '0+': 'Z' }, ['Z', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { '1+': 'AB' }, ['a', 'AB', 'b', 'c']],
    [['a', 'b', 'c'], { '4+': 'DE' }, ['a', 'b', 'c', undefined, 'DE']],
    [
      ['a', 'b', 'c'],
      { 4: 'E', '4+': 'DE' },
      ['a', 'b', 'c', undefined, 'DE', 'E'],
    ],
    [['a', 'b', 'c'], { '-0+': 'D' }, ['a', 'b', 'c', 'D']],
    [['a', 'b', 'c'], { '-2+': 'AB' }, ['a', 'AB', 'b', 'c']],
    [['a', 'b', 'c'], { '-4+': 'Z' }, ['Z', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { 1: ['B1', 'B2'] }, ['a', 'B1', 'B2', 'c']],
    [['a', 'b', 'c'], { 1: ['B1', 'B2'], 2: 'C' }, ['a', 'B1', 'B2', 'C']],
    [['a', 'b', 'c'], { 4: ['E', 'F'] }, ['a', 'b', 'c', undefined, 'E', 'F']],
    [['a', 'b', 'c'], { '-0': ['D', 'E'] }, ['a', 'b', 'c', 'D', 'E']],
    [['a', 'b', 'c'], { '0+': ['Z1', 'Z2'] }, ['Z1', 'Z2', 'a', 'b', 'c']],
    [['a', 'b', 'c'], { '1+': ['AB1', 'AB2'] }, ['a', 'AB1', 'AB2', 'b', 'c']],
    [
      ['a', 'b', 'c'],
      { '4+': ['E', 'F'] },
      ['a', 'b', 'c', undefined, 'E', 'F'],
    ],
    [['a', 'b', 'c'], { 1: [] }, ['a', 'c']],
    [['a', 'b', 'c'], { 4: [] }, ['a', 'b', 'c', undefined]],
    [['a', 'b', 'c'], { '1+': [] }, ['a', 'b', 'c']],
    [['a', 'b', 'c'], { 1: 'B', 2: 'C' }, ['a', 'B', 'C']],
    [['a', 'b', 'c'], { 0: 'A', 2: 'C' }, ['A', 'b', 'C']],
    [['a', 'b', 'c'], { '-2': 'B2', 1: 'B1' }, ['a', 'B1', 'B2', 'c']],
    [['a', 'b', 'c'], { 4: 'E', '-1': 'C' }, ['a', 'b', 'C', undefined, 'E']],
    [
      ['a', 'b', 'c'],
      { '-2+': 'AB2', '1+': 'AB1' },
      ['a', 'AB1', 'AB2', 'b', 'c'],
    ],
    [['a', 'b', 'c'], { '-4+': 'Z2', '0+': 'Z1' }, ['Z1', 'Z2', 'a', 'b', 'c']],
    [
      ['a', 'b', 'c'],
      { '-4+': 'Z3', '0+': ['Z1', 'Z2'] },
      ['Z1', 'Z2', 'Z3', 'a', 'b', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      { '-4': 'A2', '-5': 'A1', '-3': 'A3' },
      ['A1', 'A2', 'A3', 'b', 'c'],
    ],
    [[], { '*': 'A' }, []],
    [['a', 'b', 'c'], { '*': 'A' }, ['A', 'A', 'A']],
    [['a', 'b', 'c'], { '*': 'A', 1: 'B' }, ['A', 'B', 'A']],
    [['a', 'b', 'c'], { '*': [] }, []],
    [['a', 'b', 'c'], { '*': ['A', 'B'] }, ['A', 'B', 'A', 'B', 'A', 'B']],
    [
      ['a', 'b', 'c'],
      { '*': ['A', 'B'], 1: 'C', '-1': 'D', '2+': 'E' },
      ['A', 'C', 'E', 'A', 'B', 'A', 'D'],
    ],
  ],
  ({ title }, [inputArray, items, outputArray]) => {
    test(`set() output | ${title}`, (t) => {
      t.deepEqual(set(inputArray, items), outputArray)
    })
  },
)
