/* jshint esnext: true */

import Struct from "../struct";
import { KeyError } from "../struct";

// Looking at the definition of Map on MDN it might make more sense to consider this an immutable object.
describe("Struct", function(){
  var struct;
  beforeEach(function(){
    struct = Struct({attribute: "value"});
  });

  it("should get an attribute", function(){
    expect(struct.attribute).toBe("value");
  });

  it("should be forbidden to assign an attribute", function(){
    struct.attribute = "new Value";
    // DEBT force throw error.
    expect(struct.attribute).toBe("value");
  });

  it("#fetch should return an attribute value", function(){
    expect(struct.fetch("attribute")).toBe("value");
  });

  it("#fetch should throw and error for missing attribute", function(){
    expect(function(){
      struct.fetch("other");
    }).toThrowError(KeyError, /other/);
  });

  it("#has should return true for present attribute", function(){
    expect(struct.has("attribute")).toBe(true);
  });

  it("#has should return false for absent attribute", function(){
    expect(struct.has("other")).toBe(false);
  });

  it("should have all the attributes as keys", function () {
    expect(Object.keys(struct)).toEqual(["attribute"]);
  });

  it("should throw an error when setting a nonexistant key", function(){
    expect(function(){
      struct.set("other", "random");
    }).toThrowError(KeyError, /other/);
  });

  describe("after setting attribute to new value", function(){
    var newStruct;
    beforeEach(function(){
      newStruct = struct.set("attribute", "new Value");
    });

    it("should have the new value", function(){
      expect(newStruct.attribute).toBe("new Value");
    });
    it("should leave the original struct unchanged", function(){
      expect(struct.attribute).toBe("value");
    });
  });

  it("should throw an error when merging with a nonexistant key", function(){
    expect(function(){
      struct.merge({"other": "random"});
    }).toThrowError(KeyError, /other/);
  });

  describe("after merging with new values", function(){
    var newStruct;
    beforeEach(function(){
      newStruct = struct.merge({"attribute": "new Value"});
    });

    it("should have the new value", function(){
      expect(newStruct.attribute).toBe("new Value");
    });
    it("should leave the original struct unchanged", function(){
      expect(struct.attribute).toBe("value");
    });
  });

  it("should throw an error when updating a nonexistant key", function(){
    expect(function(){
      struct.update("other", function(value){ return value + ":updated"; });
    }).toThrowError(KeyError, /other/);
  });

  describe("after updating attribute", function(){
    var newStruct;
    beforeEach(function(){
      newStruct = struct.update("attribute", function(value){ return value + ":updated"; });
    });

    it("should have the new value", function(){
      expect(newStruct.attribute).toBe("value:updated");
    });
    it("should leave the original struct unchanged", function(){
      expect(struct.attribute).toBe("value");
    });
  });

});
