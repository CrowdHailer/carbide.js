/* jshint esnext: true */

import Map from "../map";

// Looking at the definition of Map on MDN it might make more sense to consider this an immutable object.
describe("Map", function(){
  it("should be able to fetch an attribute", function(){
    var map = Map({attribute: "value"});
    expect(map.attribute).toBe("value");
  });

  it("should be forbidden to assign an attribute", function(){
    var map = Map({attribute: "value"});
    map.attribute = "new Value";
    // DEBT force throw error.
    expect(map.attribute).toBe("value");
  });

  it("should have all the attributes as keys", function () {
    var map = Map({attribute: "value"});
    var keys = Object.keys(map);
    expect(keys).toEqual(["attribute"]);
  });

  it("should be able to set new value", function(){
    var map = Map({attribute: "value"});
    map = map.set("attribute", "new Value");
    expect(map.attribute).toBe("new Value");
  });

  it("should be able to update a value", function(){
    var map = Map({attribute: "value"});
    map = map.update("attribute", function(a){ return a + ":updated"; });
    expect(map.attribute).toBe("value:updated");
  });

  it("can be merged with a new map", function(){
    var map = Map({attribute: "value"});
    map = map.merge({"attribute": "new Value"});
    expect(map.attribute).toBe("new Value");
  });

});
