const tap = require('tap')

const DotPath = require('./index')

tap.test('construct', t => {
  const path = new DotPath('foo.bar')

  t.deepEqual(path, ['foo', 'bar'], 'new dot-separated string')
  t.deepEqual(DotPath.from('foo.bar'), ['foo', 'bar'], 'from dot-separated string')

  t.deepEqual(new DotPath(['foo', 'bar']), ['foo', 'bar'], 'new fragment array')
  t.deepEqual(DotPath.from(['foo', 'bar']), ['foo', 'bar'], 'from fragment array')

  t.ok(path instanceof Array, 'path is a fragment array')
  t.end()
})

tap.test('concat', t => {
  const path = new DotPath('foo')
  t.deepEqual(path.concat('bar.baz'), ['foo', 'bar', 'baz'], 'splits concat strings')
  t.deepEqual(path.concat(['bar', 'baz']), ['foo', 'bar', 'baz'], 'concats fragment arrays as-is')
  t.end()
})

tap.test('current', t => {
  const path = new DotPath('foo.bar')
  t.deepEqual(path.current, 'bar', 'returns the last path fragment')
  t.end()
})

tap.test('toString', t => {
  const path = new DotPath('foo.bar')
  t.deepEqual(path.toString(), 'foo.bar', 'converts to dot-separated string')
  t.end()
})

tap.test('navigate', t => {
  const path = new DotPath('foo.bar')
  const data = {
    foo: {
      bar: 'baz'
    }
  }
  t.deepEqual(path.navigate(data), 'baz', 'navigates to value')
  t.end()
})
