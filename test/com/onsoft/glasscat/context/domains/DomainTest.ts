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
import { Domain } from "../../../../../../src/com/onsoft/glasscat/context/domains/Domain";

@TestSuite({
  description: "Test the DomainTest class properties"
})
export class DomainTest {

  public domain:Domain = null;

  @BeforeClass()
  public initTest():void {
    this.domain = new Domain();
  }

  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.domain).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'host' property set to 'null'"
  })
  public hostTest():void {
    expect(this.domain).to.have.property("host", null);
  }
  
  @Test({
    description: "should have a 'target' property set to 'null'"
  })
  public targetTest():void {
    expect(this.domain).to.have.property("target", null);
  }
  
  @Test({
    description: "should have a 'connector' property set to 'null'"
  })
  public connectorTest():void {
    expect(this.domain).to.have.property("connector", null);
  }
}