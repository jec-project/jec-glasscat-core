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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { ContextRootData } from "../../../../../../src/com/onsoft/glasscat/util/contextroot/ContextRootData";

@TestSuite({
  description: "Test the ContextRootData class properties and methods"
})
export class ContextRootDataTest {

  public data:ContextRootData = null;

  @BeforeAll()
  public initTest():void {
    this.data = new ContextRootData();
  }

  @Test({
    description: "should have a 'containsNestedResource' property set to 'false'"
  })
  public containsNestedResourceTest():void {
    expect(this.data).to.have.property("containsNestedResource", false);
  }
  
  @Test({
    description: "should have a 'needsRedirection' property set to 'false'"
  })
  public needsRedirectionTest():void {
    expect(this.data).to.have.property("needsRedirection", false);
  }
  
  @Test({
    description: "should have a 'newPath' property set to 'null'"
  })
  public newPathTest():void {
    expect(this.data).to.have.property("newPath", null);
  }
  
  @Test({
    description: "should have a 'contextRoot' property set to 'null'"
  })
  public contextRootTest():void {
    expect(this.data).to.have.property("contextRoot", null);
  }
  
  @Test({
    description: "should set all properties to their default values"
  })
  public resetTest():void {
    this.data.containsNestedResource = true;
    this.data.needsRedirection = true;
    this.data.newPath = "foo";
    this.data.contextRoot = "bar";
    this.data.reset();
    expect(this.data.containsNestedResource).to.be.false;
    expect(this.data.needsRedirection).to.be.false;
    expect(this.data.newPath).to.be.null;
    expect(this.data.contextRoot).to.be.null;
  }
}