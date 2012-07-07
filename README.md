# DotPath
DotPath is a utility to wrap objects with dotpath support for traversal, modification and existence checking.

## Usage

    npm install dotpath

## Interface

#### new DotPath(obj, separator)
By default, '.' is used as the separation symbol. But you can change that to other things, such as '::'

#### dotfs.exists(path)
If any point in the path doesn't exist, will return false. If the end is reached, will return true.

#### dotpath.get([path])
Get the value at the specified dotpath, if non supplied; return entire object. If any point in the path doesn't exist, will return undefined.

#### dotpath.set(path, value, destroy)
Set the value at the given dotpath. Will create new objects along the way if the path doesn't exist. If destroy is enabled, will also overwrite existing non-object parents in the path. If only one argument is supplied, the entire object will be overwritten to match it.

#### dotpath.forceSet(path, value)
This is simply an alias to set() that always uses destroy = true.

## Example

    var test = new DotPath({ foo: { bar: 'baz' } })
    test.exists('foo.bar') // true
    test.get('foo.bar') // 'baz'

    test.set('foo.foo.foo.bar', 'baz') // true
    test.get('foo.foo.foo.bar') // 'baz'

    var success = test.set('foo', 'bar') // false
    test.get('foo') // { bar: 'baz' }

    // Try destructive mode now.
    if ( ! success) {
      test.forceSet('foo', 'bar') // true
      test.get('foo') // 'bar'
    }

---

### Copyright (c) 2011 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.