//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
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
import { ToolsConfig } from "../../../../../../src/com/onsoft/glasscat/context/core/ToolsConfig";

@TestSuite({
  description: "Test the ToolsConfig class properties"
})
export class ToolsConfigTest {

  public config:ToolsConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new ToolsConfig();
  }

  @Test({
    description: "should have a 'loggers' property set to 'null'"
  })
  public loggersTest():void {
    expect(this.config).to.have.property("loggers", null);
  }
  
  @Test({
    description: "should have a 'http' property set to 'null'"
  })
  public httpTest():void {
    expect(this.config).to.have.property("http", null);
  }
  
  @Test({
    description: "should have a 'security' property set to 'null'"
  })
  public securityTest():void {
    expect(this.config).to.have.property("security", null);
  }
  
  @Test({
    description: "should have an 'errorPage' property set to 'null'"
  })
  public errorPageTest():void {
    expect(this.config).to.have.property("errorPage", null);
  }
}