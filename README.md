[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/set-array)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/set-array?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/set-array)
[![Minified size](https://img.shields.io/bundlephobia/minzip/set-array?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/set-array)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Set array items declaratively.

Array items can be [updated](#update), [merged](#mergeoldvalue-newvalue),
[added](#add), [inserted](#insert), [appended](#append), [prepended](#prepend),
[deleted](#delete) or [set](#set).

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Use cases

This is intended for cases where arrays manipulation in JavaScript is not
available.

For example, a library where shared configuration files can be extended.

```yml
# The shared configuration exports a `rules` array of objects
extend: my-shared-config

rules:
  # Update a rule
  1:
    level: silent
  # Append a rule
  '-0':
    name: appendedRule
```

Or a server receiving network patch requests.

```http
PATCH /pets/0

{
  "toys": { "1": "updateSecondToy", "-0": "appendNewToy" }
}
```

# Examples

## Update

```js
import { set } from 'set-array'

// Each element in the object argument updates array items.
// The object keys are the array indices (before any updates).
// The array is copied, not mutated.
set(['a', 'b', 'c'], { 1: 'X' }) // ['a', 'X', 'c']
set(['a', 'b', 'c'], { 1: 'X', 2: 'Y' }) // ['a', 'X', 'Y']
```

## Indices

```js
set(['a', 'b', 'c'], { '*': 'X' }) // ['X', 'X', 'X']
set(['a', 'b', 'c'], { '-1': 'X' }) // ['a', 'b', 'X']
set(['a', 'b', 'c'], { 4: 'X' }) // ['a', 'b', 'c', undefined, 'X']
```

## Add

```js
// Array of items can be used
set(['a', 'b', 'c'], { 1: ['X', 'Y'] }) // ['a', 'X', 'Y', 'c']
set(['a', 'b', 'c'], { 1: ['X'] }) // ['a', 'X', 'c']
set(['a', 'b', 'c'], { 1: [['X']] }) // ['a', ['X'], 'c']
```

## Insert

```js
// If the key ends with +, items are prepended, not replaced
set(['a', 'b', 'c'], { '1+': 'X' }) // ['a', 'X', 'b', 'c']
```

## Append

```js
set(['a', 'b', 'c'], { '-0': 'X' }) // ['a', 'b', 'c', 'X']
set(['a', 'b', 'c'], { '-0': ['X', 'Y'] }) // ['a', 'b', 'c', 'X', 'Y']
```

## Prepend

```js
set(['a', 'b', 'c'], { '0+': ['X', 'Y'] }) // ['X', 'Y', 'a', 'b', 'c']
```

## Delete

```js
set(['a', 'b', 'c'], { 1: [] }) // ['a', 'c']
```

## Set

```js
set([], { 0: 'X', 2: 'Z' }) // ['X', undefined, 'Z']
```

# Install

```bash
npm install set-array
```

This package works in both Node.js >=16.17.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## set(array, updates, options?)

`array` `any[]`\
[`updates` `object`](#updates)\
[`options` `object?`](#options)\
_Return value_: `any[]`

Return a copy of `array` with each of the [`updates` applied](#updates).

### Updates

#### Values

`updates` values are the items to add.

- Array of values [add multiple items](#add)
- Empty arrays [remove items](#delete)

#### Keys

`updates` keys are the `array` [indices](#indices) (before any updates).

- [Negative indices](#indices) match from the end
- `-0` [appends](#append) items
- If the key [ends with `+`](#insert), items are [prepended](#prepend), not
  replaced
- `*` [targets all items](#indices)

### Options

Options are an optional plain object.

#### merge(oldValue, newValue)

`oldValue` `any`\
`newValue` `any`\
_Return value_: `any`

By default, the [`updates`](#updates) items override the original `array`'s
items. The `merge` option can be used to merge those instead.

If an array of items is being added, `merge()` is called once per item.

`merge()` is not called when the update's key ends with `+`, i.e. when items are
being prepended.

`merge()` is called even if the update's index is out-of-bound, with `oldValue`
being `undefined`.

```js
const merge = (oldValue, newValue) => [oldValue, newValue]

set(['a', 'b', 'c'], { 1: 'X' }, { merge }) // ['a', ['b', 'X'], 'c']
set(['a', 'b', 'c'], { '*': 'X' }, { merge }) // [['a', 'X'], ['b', 'X'], ['c', 'X']]
set(['a', 'b', 'c'], { 1: ['X', 'Y'] }, { merge }) // ['a', ['b', 'X'], ['b', 'Y'], 'c']
set(['a', 'b', 'c'], { '1+': 'X' }, { merge }) // ['a', 'X', 'b', 'c']
set(['a', 'b', 'c'], { 4: 'X' }, { merge }) // ['a', 'b', 'c', undefined, [undefined, 'X']]
```

## test(updates)

`updates` `any`\
_Return value_: `boolean`

Return whether the argument is an object that follows [the shape](#updates)
expected by [`set()`](#setarray-updates-options).

```js
test({ 1: 'X' }) // true
test({ '1+': 'X' }) // true
test({ '-1': 'X' }) // true
test({ '*': 'X' }) // true
test({}) // true

test({ notAnIndex: 'X' }) // false
test('X') // false
```

# Related projects

- [`declarative-merge`](https://github.com/ehmicky/declarative-merge): merge
  objects/arrays declaratively
- [`wild-wild-utils`](https://github.com/ehmicky/wild-wild-utils): apply
  `set-array` on multiple properties at once using this module's
  [`merge()` method](https://github.com/ehmicky/wild-wild-utils#mergetarget-query-value-options)

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/set-array/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/set-array/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
