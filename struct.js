/* jshint esnext: true */

export function KeyError(key) {
  this.name = 'KeyError';
  this.message = "key " + key + " not found";
  this.stack = (new Error()).stack;
}
KeyError.prototype = Object.create(Error.prototype);
KeyError.prototype.constructor = KeyError;

export default function Struct(defaults, source){
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

Struct.prototype.has = function (key) {
  return Object.keys(this).indexOf(key) !== -1;
};

Struct.prototype.fetch = function (key) {
  if (this.has(key)) {
    return this[key];
  } else {
    throw new KeyError(key);
  }
};

Struct.prototype.set = function (key, value) {
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
