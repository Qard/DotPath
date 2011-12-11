/**
 * DotPath
 * 
 * Utility to wrap object with dotpath support for
 * traversal, modification and existence checking.
 * 
 * (c) 2011 Stephen Belanger
 * Licensed as MIT.
 */
if (typeof module !== 'undefined') {
  var _ = require('underscore')
}
 /**
 * Construct the DotPath traversal object.
 * 
 * @param object (default: {})
 *    The object to wrap this manipulator around.
 * 
 * @param string (default: .)
 *    Separator to use when splitting paths.
 */
function DotPath (o, sep) {
  this.obj = o || {}
  this.seperator = sep || '.'
}

/**
 * Split the path using the currently defined separator.
 * 
 * @param string
 *    DotPath string to split to ordered array.
 */
DotPath.prototype.split = function (path) {
  return path.split(this.seperator)
}

/**
 * Check if the specified dotpath exists.
 * 
 * @param string
 *    DotPath to traverse.
 * 
 * @returns boolean
 *    Boolean state of final point existence.
 */
DotPath.prototype.exists = function (path) {
  var o = this.obj

  // Traverse through the object.
  return _(this.split(path)).reduce(function (memo, part) {
    // We may have already failed.
    if ( ! memo) { return false }

    // Shift and check.
    o = o[part]
    return typeof o !== 'undefined'
  }, true)
}

/**
 * Get the specified dotpath.
 * 
 * @param string | optional
 *    DotPath to traverse to.
 * 
 * @returns mixed
 *    If any part of path doesn't exist, returns undefined.
 */
DotPath.prototype.get = function (path) {
  var o = this.obj

  // Allow getting of base object.
  if ( ! path) { return o }

  // Make sure path exists before traversing.
  if ( ! this.exists(path)) { return undefined }
  return _(this.split(path)).reduce(function (memo, part) {
    // Shift and return.
    o = o[part]
    return o
  }, true)
}

/**
 * Set the value of the specified dotpath.
 * Creates objects that don't yet exist in path.
 * 
 * @param string
 *    DotPath to traverse.
 * 
 * @param mixed
 *    Value to assign to final point in DotPath.
 * 
 * @param boolean
 *    Toggle overwriting of existing non-object parents.
 * 
 * @returns boolean
 *    If non-destroy set encounters non-object parent, returns false.
 */
DotPath.prototype.set = function (path, val, destroy) {
  // Allow replacement of entire object.
  if (typeof val === 'undefined') { this.obj = path }

  var o = this.obj, parts = this.split(path)
  return _(parts).reduce(function (memo, part, index) {
    // We may have already failed.
    if ( ! memo) { return false }

    // If we are looking at the last element, do assignment.
    if (index === parts.length - 1) {
      if ( ! destroy && typeof o[part] === 'object') { return false }
      o[part] = val
      return true
      
    // Otherwise, otherwise traverse.
    } else {
      // Make sure next level is an object.
      if (typeof o[part] !== 'object') {
        // Set to an object if undefined or destroying.
        if (destroy || typeof o[part] === 'undefined') {
          o[part] = {}
          o = o[part]
          return true
        
        // Otherwise, fail.
        } else {
          return false
        }
      }

      // Shift and return.
      o = o[part]
      return true
    }
  }, true)
}

/**
 * Destructive alias to set()
 */
DotPath.prototype.forceSet = function (path, val) {
  return this.set(path, val, true)
}

// Export, if possible.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DotPath
}