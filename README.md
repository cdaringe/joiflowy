# joiflowy

[ ![Codeship Status for cdaringe/joiflowy](https://codeship.com/projects/a7e41c90-f2d7-0133-8697-16a4a456a383/status?branch=master)](https://codeship.com/projects/149607)

## what

validate function inputs as concisely as possible, using the powerful [joi](https://www.npmjs.com/package/joi)

## why

because writing defensive code can be  tedious.  in other words, writing code like `if (this.or && this.or.that) throw new Error(${whatever})` for all of the input combinations you want to protect against is often exhausting, incomplete, or too verbose.

_What's with the name?_

"joiflowy" sounds close to joyfully.  given that this package protects functions, a core _control-flow_ mechanism, the combination of "joi" & "flow" only seemed appropriate.

## usage

```js
const jf = require('joiflowy')
const sum = jf((a, b) => (a + b), jf.joi.number(), jf.joi.number())
sum(1, 2) // ==> 3
sum(1, 'bananas') // ==> throws ValidationError
```

need `joi.validate` options?  no problem

```js
const jf = require('joiflowy')
const Joi = require('joi') // jf doesn't care which joi eport used
const double = jf((a) => (a * 2), Joi.number(), { convert: false })
double(2) // ==> 4
double('2') // ==> throws ValidationError
```
