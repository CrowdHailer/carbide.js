# Carbide.js

### Sufficiently immutable objects for JavaScript.

Create low overhead immutable objects with carbide.
The objects created with carbide expose an immutable API but do not go to great lengths to prevent the developer from mutating the objects should the deliberately circumvent the given API.

### Modern JavaScript

To keep this library relevant it uses ES5 JavaScript with ES6 modules.
This library is to be used with [Rollup](http://rollupjs.org) as a build step (Think browserify for ES6 modules).
npm scripts are included in this repository to build to over legacy formats.

We will release on using npm distribution tags before main versions.
[Described here](https://medium.com/greenkeeper-blog/one-simple-trick-for-javascript-package-maintainers-to-avoid-breaking-their-user-s-software-and-to-6edf06dc5617#.t839vcynj)

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
```

### Discussion

- Adding a fetch method
`map.fetch(key, default)` throw Key error if key is not defined and default not given
