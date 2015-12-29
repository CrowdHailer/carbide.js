/* jshint esnext: true */

import KeyError from "./key-error";

export function Struct(defaults, source){
  "use strict";
  if ( !(this instanceof Struct) ) { return new Struct(defaults, source); }

  Object.assign(this, defaults);
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      if (!this.hasOwnProperty(key)) {
        throw new KeyError(key);
      }
      this[key] = source[key];
    }
  }
  Object.freeze(this);
}

Struct.prototype.hasKey = function (key) {
  return Object.keys(this).indexOf(key) !== -1;
};

Struct.prototype.fetch = function (key) {
  if (this.hasKey(key)) {
    return this[key];
  } else {
    throw new KeyError(key);
  }
};

Struct.prototype.set = function (key, value) {
  if (this[key] === value) {
    return this;
  }
  var tmp = {};
  tmp[key] = value;
  return this.merge(tmp);
};

Struct.prototype.update = function (key, operation) {
  return this.set(key, operation(this[key]));
};

Struct.prototype.merge = function (other) {
  return Struct(this, other);
};

export default Struct;
