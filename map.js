/* jshint esnext: true */

// DEBT should all be called sources
export default function Map(raw, source){
  "use strict";
  if ( !(this instanceof Map) ) { return new Map(raw, source); }

  Object.assign(this, raw, source);
  Object.freeze(this);
}

Map.prototype.set = function (key, value) {
  var tmp = {};
  tmp[key] = value;
  return Map(this, tmp);
};

Map.prototype.merge = function (other) {
  return Map(this, other);
};
