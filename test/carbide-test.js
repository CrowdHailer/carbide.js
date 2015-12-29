/* jshint esnext: true */

import { Struct } from "../carbide";
import InternalStruct from "../struct";
import { OpenStruct } from "../carbide";
import InternalOpenStruct from "../open-struct";

describe("Carbide Struct", function(){
  it("should be the same as the default export from struct file", function(){
    expect(InternalStruct).toBe(Struct);
  });
});

describe("Carbide OpenStruct", function(){
  it("should be the same as the default export from open struct file", function(){
    expect(InternalOpenStruct).toBe(OpenStruct);
  });
});
