# joiflowy

## what

validate function inputs as concisely as possible, using the powerful [joi](https://www.npmjs.com/package/joi)

## why

because writing defensive code with boilerplate is awful.  That is, no more `if (this.or.that) throw new Error(${whatever})` for all of the wild function input combinations you want to protect against

_What's with the name?_

It sounds kind of like joyfully, but it protects functions, our _control-flow_ foundation, so "joi" "flowy"

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
