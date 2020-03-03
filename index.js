'use strict'

class DotPath extends Array {
  constructor (path) {
    super()
    if (path) {
      return this.concat(path)
    }
  }

  static from (path) {
    if (typeof path === 'string') {
      path = path.split('.')
    }
    return super.from(path)
  }

  concat (path) {
    if (typeof path === 'string') {
      path = path.split('.')
    }
    return super.concat(path)
  }

  get current () {
    return this[this.length - 1]
  }

  toString () {
    return this.join('.')
  }

  navigate (object) {
    let value = object
    for (const prop of this) {
      if (value) {
        value = value[prop]
      }
    }
    return value
  }
}

module.exports = DotPath
