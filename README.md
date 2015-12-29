# Carbide.js

**Immutable Structs for reliable predictable JavaScript**

A Struct is a complex data type that defines a group of variables.
Carbide contains two flavors of Struct: `Struct` and `OpenStruct`.

Carbide structs are designed to have a low overhead and to not fight against the dynamic nature of JavaScript.
They do not provide guarantees but are "sufficiently" immutable
Sufficiently immutable objects have an immutable API, they do not prevent the developer from circumventing the API.

### Modern JavaScript

To keep this library relevant it uses ES5 JavaScript with ES6 modules.
This library is to be used with [Rollup](http://rollupjs.org) as a build step (Think browserify for ES6 modules).
npm scripts are included in this repository to build to over legacy formats.

We will release on using npm distribution tags before main versions.
[Described here](https://medium.com/greenkeeper-blog/one-simple-trick-for-javascript-package-maintainers-to-avoid-breaking-their-user-s-software-and-to-6edf06dc5617#.t839vcynj)

### Documentation

#### Struct
Structs are simple immutable objects.
They contain values which may be anything.
It is up to the developer to only pass immutable values to the constructor to get an effective deep freeze.

All methods on a struct leave the struct unchanged.

```js
// Using es6 module format to import the struct constructor
import Struct from "carbide/struct";

var bread = Struct({name: "bread", daysFresh: 1});

var tomorrowsBread = bread.update("daysFresh", (days) => days - 1);

var freshBread = bread.set("daysFresh", 3);

bread.daysFresh
// => 1
tomorrowsBread.daysFresh
// => 0
freshBread.daysFresh
// => 3
```

Structs can only have the properties that where assigned to them during construction.
Attempting to set or fetch a key that does not exist with throw an error

```js
bread.hasKey("name")
// => true
bread.fetch("starRating")
// ! throw KeyError key "starRating" not found
```

Structs encourage the use of techniques from functional programming, however they are JavaScript objects and can be treated as one

```js
Object.keys(bread)
// ["name", "daysFresh"]

bread instanceof Struct;
// => true

// Works with or without new Keyword
var ryeBread = new Struct({name: "ryeBread", daysFresh: 1});
```
#### OpenStruct

OpenStruct implements exactly the same behaviour as the Struct except new properties may be added.

```js
import OpenStruct from "carbide/open-struct";

var kermit = Map({name: "Kermit", occupation: "Muppet", age: 15});

var kermitFound = kermit.set("address", "Brazil");

kermitFound.address;
// => "Brazil"
```

### Custom immutable objects

Because Structs behave well as JavaScript Objects they can be used in a prototype chain.
Structs can be used as the core of an immutable custom types.

This is demonstrated with a vector object.

```js
var VECTOR_DEFAULTS = {x: 0, y: 0, z: 0};

function Vector(raw){
  if ( !(this instanceof Vector) ) { return new Vector(VECTOR_DEFAULTS, raw); }

  return Struct.call(this, VECTOR_DEFAULTS, raw);
}

Vector.prototype = Object.create(Struct.prototype);
Vector.prototype.constructor = Vector;
```
