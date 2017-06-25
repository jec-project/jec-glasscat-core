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

import { TestSuite, Test, BeforeClass } from "jec-juta";
import { expect } from "chai";
import { BasicUrlPattern } from "../../../../../../src/com/onsoft/glasscat/util/url/BasicUrlPattern";

@TestSuite({
  description: "Test the BasicUrlPattern class methods"
})
export class BasicUrlPatternTest {

  private pattern:BasicUrlPattern = null;

  @BeforeClass()
  public initTest():void {
    this.pattern = new BasicUrlPattern();
  }

  @Test({
    description: "should have a 'pattern' property set to 'null'"
  })
  public patternTest():void {
    expect(this.pattern).to.have.property("pattern", null);
  }

  @Test({
    description: "should have a 'strict' property set to 'true'"
  })
  public strictTest():void {
    expect(this.pattern).to.have.property("strict", true);
  }
  
  @Test({
    description: "should have a 'baseUrl' property set to 'null'"
  })
  public baseUrlTest():void {
    expect(this.pattern).to.have.property("baseUrl", null);
  }
  
  @Test({
    description: "should have a 'baseUrlLength' property set to '0'"
  })
  public baseUrlLengthTest():void {
    expect(this.pattern).to.have.property("baseUrlLength", 0);
  }
}