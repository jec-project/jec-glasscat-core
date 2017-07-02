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
import { DomainConnectorConfig } from "../../../../../../src/com/onsoft/glasscat/context/domains/DomainConnectorConfig";

@TestSuite({
  description: "Test the DomainConnectorConfig class properties"
})
export class DomainConnectorConfigTest {

  public config:DomainConnectorConfig = null;

  @BeforeClass()
  public initTest():void {
    this.config = new DomainConnectorConfig();
  }

  @Test({
    description: "should have a 'type' property set to 'ejp'"
  })
  public typeTest():void {
    expect(this.config).to.have.property("type", "ejp");
  }
  
  @Test({
    description: "should have a 'server' property set to 'null'"
  })
  public serverTest():void {
    expect(this.config).to.have.property("server", null);
  }
}