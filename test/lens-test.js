/* jshint esnext: true */

import Map from "../map";

console.log("hello");

// NOTE lens functionality is tied to map being a map
function lens(key){
  return function(func){
    return function(map){
      map = map || Map();
      return map.set(key, func(map[key]));
    };
  };
}

var compose = function () {
  var fns = arguments;

  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
};

internal = Map({x: 5, y: 6});
other = Map({});
external = Map({point: internal, other: other});
console.log(external);

var point = lens("point");
var x = lens("x");
function inc(x){ return x + 1; }

var out = compose(point, x)(inc)(external);
// var out = lens("point")(function(x){ console.log(x); return 5; })(external);
console.log(out);
console.log(external);
console.log(external.other === out.other);

external.update(["point", "x"], inc);
external.set(["point", "x"], val);
external.fetch(["point", "x"], "default");
