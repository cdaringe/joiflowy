const jf = require('../')
const test = require('tape')
const joi = require('joi')

test('joiflow', (t) => {
  t.ok(jf instanceof Function)
  t.equals(joi, jf.joi)
  t.equals(joi, jf.Joi)
  t.throws(() => jf('will fail'))
  const fnNoArg = jf(() => 'test')
  const fnNoArgWithValidateOpts = jf(() => 'test', { convert: false })
  t.equals(fnNoArg(), 'test')
  t.equals(fnNoArgWithValidateOpts(), 'test')
  const fnNumIdentity = jf((a) => a, joi.number())
  t.equals(fnNumIdentity(1), 1)
  t.throws(() => fnNumIdentity('a'), 'throws on schema violiation')
  const fnNumIdentityNoConvert = jf((a) => a, joi.number(), { convert: false })
  t.throws(() => fnNumIdentityNoConvert('1'), 'options applied correctly')

  const fnMultArgAllValidated = jf((a, b) => 'test', jf.joi.number(), jf.joi.string())
  t.equals(fnMultArgAllValidated(1, 'a'), 'test')
  t.throws(() => fnMultArgAllValidated(1, -1), 'handles multi arg validation')

  const fnMultArgAllValidatedWithOpts = jf((a, b) => 'test', jf.joi.number(), jf.joi.string(), { convert: true })
  t.equals(fnMultArgAllValidatedWithOpts('123', 'abc'), 'test', 'multi arg + opts')

  const fnSkipVal = jf((a) => 'test')
  t.equals(fnSkipVal(), 'test', 'basic validation skip')
  t.equals(fnSkipVal(1), 'test', 'basic validation skip')

  const fnSkipVal2 = jf((a) => 'test', null)
  t.equals(fnSkipVal2(), 'test', 'basic validation skip')

  const fnSkipVal3 = jf((a) => 'test', null, { convert: true })
  t.equals(fnSkipVal3(), 'test', 'basic validation skip')

  const fnSkipValMulti1 = jf((a, b) => 'test', joi.string().required(), null, { convert: true })
  t.equals(fnSkipValMulti1('a'), 'test', 'multi arg w/ validation skip')
  t.equals(fnSkipValMulti1('a', 'b'), 'test', 'multi arg w/ validation skip')
  t.throws(() => fnSkipValMulti1(), 'test', 'multi arg w/ validation skip')

  t.end()
})
