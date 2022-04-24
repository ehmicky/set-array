[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/set-array.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/set-array)
[![Build](https://github.com/ehmicky/set-array/workflows/Build/badge.svg)](https://github.com/ehmicky/set-array/actions)
[![Node](https://img.shields.io/node/v/set-array.svg?logo=node.js)](https://www.npmjs.com/package/set-array)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Set/insert/append/omit multiple array items.

# Examples

```js
// Each element in the object argument updates array items.
// The object keys are the array indices, before any updates.
// The array is copied, not mutated.
setArray(['a', 'b', 'c'], { 1: 'X' }) // ['a', 'X', 'c']
setArray(['a', 'b', 'c'], { 1: 'X', 2: 'Y' }) // ['a', 'X', 'Y']

// Negative indices are matched from the end
setArray(['a', 'b', 'c'], { '-1': 'X' }) // ['a', 'b', 'X']

// Large positive indices extend the array
setArray(['a', 'b', 'c'], { 4: 'X' }) // ['a', 'b', 'c', undefined, 'X']

// Large negative indices stop at the first item
setArray(['a', 'b', 'c'], { '-10': 'X' }) // ['X', 'b', 'c']

// -0 appends items
setArray(['a', 'b', 'c'], { '-0': 'X' }) // ['a', 'b', 'c', 'X']

// If the key ends with +, items are prepended, not replaced
setArray(['a', 'b', 'c'], { '1+': 'X' }) // ['a', 'X', 'b', 'c']

// Array of items can be used
setArray(['a', 'b', 'c'], { 1: ['X', 'Y'] }) // ['a', 'X', 'Y', 'c']

// Empty arrays remove items
setArray(['a', 'b', 'c'], { 1: [] }) // ['a', 'c']

// If the item is an array itself, it must be wrapped in another array
setArray(['a', 'b', 'c'], { 1: ['X'] }) // ['a', 'X', 'c']
setArray(['a', 'b', 'c'], { 1: [['X']] }) // ['a', ['X'], 'c']
```

# Install

```bash
npm install set-array
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## setArray(array, updates, options?)

`array` `any[]`\
[`updates` `object`](#updates)\
[`options` `object?`](#options)\
_Return value_: `any[]`

Return a copy of `array` with each of the [`updates` applied](#updates).

### Updates

`updates` is an object where the values are the items to add.

- Array of values add multiple items
- Empty arrays remove items

The keys are the `array` indices (before any updates).

- Negative indices match from the end
- `-0` appends items
- If the key ends with `+`, items are prepended, not replaced

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

setArray(['a', 'b', 'c'], { 1: 'X' }, { merge }) // ['a', ['b', 'X'], 'c']
setArray(['a', 'b', 'c'], { 1: ['X', 'Y'] }, { merge }) // ['a', ['b', 'X'], ['b', 'Y'], 'c']
setArray(['a', 'b', 'c'], { '1+': 'X' }, { merge }) // ['a', 'X', 'b', 'c']
setArray(['a', 'b', 'c'], { 4: 'X' }, { merge }) // ['a', 'b', 'c', undefined, [undefined, 'X']]
```

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
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/set-array/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/set-array/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
