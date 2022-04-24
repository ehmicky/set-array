[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/set-array.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/set-array)
[![Build](https://github.com/ehmicky/set-array/workflows/Build/badge.svg)](https://github.com/ehmicky/set-array/actions)
[![Node](https://img.shields.io/node/v/set-array.svg?logo=node.js)](https://www.npmjs.com/package/set-array)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Set/insert/append/omit multiple array items.

# Examples

```js
// Each element in the object argument updates array values.
// The array is copied, not mutated.
setArray(['a', 'b', 'c'], { 1: 'B' }) // ['a', 'B', 'c']
setArray(['a', 'b', 'c'], { 1: 'B', 2: 'C' }) // ['a', 'B', 'C']

// Negative indices are matched from the end.
// If too large, they stop at the first index.
setArray(['a', 'b', 'c'], { '-2': 'B' }) // ['a', 'B', 'c']
setArray(['a', 'b', 'c'], { '-10': 'A' }) // ['A', 'b', 'c']

// Out-of-bound indices are allowed.
// -0 can be used to append values.
setArray(['a', 'b', 'c'], { 4: 'E' }) // ['a', 'b', 'c', undefined, 'E']
setArray(['a', 'b', 'c'], { '-0': 'D' }) // ['a', 'b', 'c', 'D']
```

# Install

```bash
npm install set-array
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## setArray(array, newItems, options?)

`array` `any[]`\
`newItems` `object`\
`options` `object?`\
_Return value_: `any[]`

```js

```

### Options

Options are an optional plain object

#### merge

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
