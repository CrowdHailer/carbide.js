/* jshint esnext: true */

import Struct from "../struct";
import { KeyError } from "../key-error";

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

  it("#hasKey should return true for present attribute", function(){
    expect(struct.hasKey("attribute")).toBe(true);
  });

  it("#hasKey should return false for absent attribute", function(){
    expect(struct.hasKey("other")).toBe(false);
  });

  it("should have all the attributes as keys", function () {
    expect(Object.keys(struct)).toEqual(["attribute"]);
  });

  it("should be an instance of Struct", function(){
    expect(struct instanceof Struct).toBe(true);
  });

  it("should throw an error when setting a nonexistant key", function(){
    expect(function(){
      struct.set("other", "random");
    }).toThrowError(KeyError, /"other"/);
  });

  it("should be the same article if setting an attribute to the current value", function(){
    var newStruct = struct.set("attribute", "value");
    expect(newStruct).toBe(struct);
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
