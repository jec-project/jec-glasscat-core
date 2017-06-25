//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { GlassCatError } from "../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import * as utils from "../../../../../utils/test-utils/utilities/GlassCatErrorTestUtils";

@TestSuite({
  description: "Test the GlassCatError class methods"
})
export class GlassCatErrorTest {

  @Test({
    description: "GlassCatError should extend Error"
  })
  public extendsTest():void {
    let error:GlassCatError = new GlassCatError(null);
    expect(error).to.be.instanceOf(Error);
  }
  
  @Test({
    description: "should return the same string as passed in the class constructor"
  })
  public messageTest():void {
    let error:GlassCatError = new GlassCatError(utils.ERROR_MSG);
    expect(error.message).to.equal(utils.ERROR_MSG);
  }
}