"use strict"

/**
 * Safely traverse an object and return the referenced field. Accepts an
 * optional value to set.  If part of the path is not found, returns
 * `undefined`.
 *
 * Source:
 * http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
 * http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 *
 * @method resolve
 * @param {Object} obj The target object to traverse
 * @param {String|Array} path Path to the target field.
 *                       Ex: 'profile.firstname'
 * @param {Object} [value] Value to set at specified field
 * @return {Object} target field or undefined if not found
 */
module.exports = function resolve (obj, path, value) {
  var settingAValue = 'undefined' !== typeof value,
      isLastElement = false,
      i = 0,
      len,
      k;

  if (typeof obj !== 'object' || obj === null) {
    return undefined
  }
  if ('string' == typeof path) {
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, '');           // strip a leading dot
    path = path.split('.');
  }

  for (len = path.length; i < len; ++i) {
    k = path[i];
    //console.log("k:", k, " i:", i)
    isLastElement = i === len - 1;
    if (settingAValue && !obj) {
      obj = {};
    }
    if (settingAValue && isLastElement) {
      // set the value and we're done
      obj[k] = value;
      return value;
    } else {
      if (settingAValue) {
        if ('object' !== typeof obj[k]) {
          obj[k] = {};
        }
        obj = obj[k];
      } else {
        if (obj && k in obj) {
          obj = obj[k];
        } else {
          return undefined;
        }
      }
    }
  }

  return obj;
};
