/* jshint esnext: true */

import OpenStruct from "../open-struct";
import { KeyError } from "../key-error";

describe("OpenStruct", function(){
  var openStruct;
  beforeEach(function(){
    openStruct = OpenStruct({attribute: "value"});
  });

  it("should get an attribute", function(){
    expect(openStruct.attribute).toBe("value");
  });

  it("should be forbidden to assign an attribute", function(){
    openStruct.attribute = "new Value";
    expect(openStruct.attribute).toBe("value");
  });

  it("#fetch should return an attribute value", function(){
    expect(openStruct.fetch("attribute")).toBe("value");
  });

  it("#fetch should throw and error for missing attribute", function(){
    expect(function(){
      openStruct.fetch("other");
    }).toThrowError(KeyError, /other/);
  });

  it("#hasKey should return true for present attribute", function(){
    expect(openStruct.hasKey("attribute")).toBe(true);
  });

  it("#hasKey should return false for absent attribute", function(){
    expect(openStruct.hasKey("other")).toBe(false);
  });

  it("should have all the attributes as keys", function () {
    expect(Object.keys(openStruct)).toEqual(["attribute"]);
  });

  it("should be an instance of OpenStruct", function(){
    expect(openStruct instanceof OpenStruct).toBe(true);
  });

  it("should accept setting a new key", function(){
    var newOpenStruct = openStruct.set("other", "random");
    expect(newOpenStruct.other).toBe("random");
  });

  it("should be the same article if setting an attribute to the current value", function(){
    var newOpenStruct = openStruct.set("attribute", "value");
    expect(newOpenStruct).toBe(openStruct);
  });

  describe("after setting attribute to new value", function(){
    var newOpenStruct;
    beforeEach(function(){
      newOpenStruct = openStruct.set("attribute", "new Value");
    });

    it("should have the new value", function(){
      expect(newOpenStruct.attribute).toBe("new Value");
    });
    it("should leave the original openStruct unchanged", function(){
      expect(openStruct.attribute).toBe("value");
    });
  });

  describe("after merging with new values", function(){
    var newOpenStruct;
    beforeEach(function(){
      newOpenStruct = openStruct.merge({"attribute": "new Value"});
    });

    it("should have the new value", function(){
      expect(newOpenStruct.attribute).toBe("new Value");
    });
    it("should leave the original openStruct unchanged", function(){
      expect(openStruct.attribute).toBe("value");
    });
  });

  it("should be able to update a nonexistant key", function(){
    var newOpenStruct = openStruct.update("other", function(value){ return (value || "") + ":updated"; });
    expect(newOpenStruct.other).toBe(":updated");
  });

  describe("after updating attribute", function(){
    var newOpenStruct;
    beforeEach(function(){
      newOpenStruct = openStruct.update("attribute", function(value){ return value + ":updated"; });
    });

    it("should have the new value", function(){
      expect(newOpenStruct.attribute).toBe("value:updated");
    });
    it("should leave the original struct unchanged", function(){
      expect(openStruct.attribute).toBe("value");
    });
  });

});
