/* jshint esnext: true */

import KeyError from "./key-error";

// DEBT should all be called sources
export function OpenStruct(raw, source){
  "use strict";
  if ( !(this instanceof OpenStruct) ) { return new OpenStruct(raw, source); }

  Object.assign(this, raw, source);
  Object.freeze(this);
}

OpenStruct.prototype.hasKey = function (key) {
  return Object.keys(this).indexOf(key) !== -1;
};

OpenStruct.prototype.fetch = function (key) {
  if (this.hasKey(key)) {
    return this[key];
  } else {
    throw new KeyError(key);
  }
};

OpenStruct.prototype.set = function (key, value) {
  if (this[key] === value) {
    return this;
  }
  var tmp = {};
  tmp[key] = value;
  return this.merge(tmp);
};

OpenStruct.prototype.update = function (key, operation) {
  return this.set(key, operation(this[key]));
};

OpenStruct.prototype.merge = function (other) {
  return OpenStruct(this, other);
};

export default OpenStruct;
