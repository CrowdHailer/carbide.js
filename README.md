# Carbide.js

### Sufficiently immutable objects for JavaScript.

Create low overhead immutable objects with carbide.
The objects created with carbide expose an immutable API but do not go to great lengths to prevent the developer from mutating the objects should the deliberately circumvent the given API.

### Modern JavaScript

To keep this library relevant it uses ES5 JavaScript with ES6 modules.
This library is to be used with [Rollup](http://rollupjs.org) as a build step (Think browserify for ES6 modules).
npm scripts are included in this repository to build to over legacy formats.

### Documentation

#### Map

```js
import Map from "carbide/map";

var muppet = Map({name: "Kermit", occupation: "Muppet"});

muppet.name;
// => "Kermit"
muppet.occupation = "Plumber";
// !! Freeze error

var gonzo = muppet.set("name", "gonzo")
var animal = muppet.merge({name: "Animal", occupation: "Musician"})
map.fetch("name", "Beaker")
```
