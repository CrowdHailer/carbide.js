/* jshint esnext: true */

export function KeyError(key) {
  this.name = 'KeyError';
  this.message = "key \"" + key + "\" not found";
  this.stack = (new Error()).stack;
}
KeyError.prototype = Object.create(Error.prototype);
KeyError.prototype.constructor = KeyError;

export default KeyError;
