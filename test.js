var DotPath = require('./index')

// Test different behaviours of the interface.
describe('DotPath', function () {

  // The basics.
  describe('basic setting, getting and existence', function () {
    var test = new DotPath

    it('should set', function () {
      if ( ! test.set('foo', 'bar')) {
        throw new Error('foo was not set')
      }
    })

    it('should exist', function () {
      if ( ! test.exists('foo')) {
        throw new Error('foo does not exist')
      }
    })

    it('should get', function () {
      if (test.get('foo') !== 'bar') {
        throw new Error('foo is not bar')
      }
    })
  })

  // Parent creation.
  describe('parent object creation', function () {
    var test = new DotPath
    
    it('should set', function () {
      if ( ! test.set('foo.foo.foo.bar', 'baz')) {
        throw new Error('foo.foo.foo.bar not set')
      }
    })

    it('should get', function () {
      if (test.get('foo.foo.foo.bar') !== 'baz') {
        throw new Error('foo.foo.foo.bar is not baz')
      }
    })
  })

  // Destructive vs non-desctructive.
  describe('destructive and non-destructive behaviour', function () {
    var test = new DotPath({ foo: { bar: 'baz' } })

    it('should not destroy when disabled', function () {
      if (test.set('foo', 'bar')) {
        throw new Error('foo destroyed with destroy disabled')
      }
    })

    it('should destroy when enabled', function () {
      if ( ! test.forceSet('foo', 'bar')) {
        throw new Error('foo not destroyed with destroy enabled')
      }
    })

    it('should have changed', function () {
      if (test.get('foo') !== 'bar') {
        throw new Error('foo should be bar')
      }
    })
  })

})