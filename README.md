[![build status](https://secure.travis-ci.org/Qard/DotPath.png)](http://travis-ci.org/Qard/DotPath)

# DotPath

Utility to traverse objects using a dot-separated path string

## Usage

```sh
npm install dotpath
```

## Example

```js
const test = new DotPath('session.user.firstName')
const data = {
  session: {
    user: {
      firstName: 'Stephen',
      lastName: 'Belanger'
    }
  }
}

console.log(`Hello, ${test.navigate(data)}!`) // Hello, Stephen!
```

## API

#### new DotPath(path)

Converts a dot-separated path string into an object for operating on the path components and navigating objects. The DotPath type extends from the Array class so it can do anything a regular array can.

#### dotpath.current

This is just a friendlier way to do `dotpath[dotpath.length - 1]`. It gets you the last element in the path fragment array.

#### dotpath.navigate(object)

Navigates to the path location in the given object. This will fail safely if intermediate parts of the path are not present by simply returning `undefined` like a normal property access would.

#### dotpath.toString()

Returns the dot-separated string form of the path.

---

### Copyright (c) 2020 Stephen Belanger
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
