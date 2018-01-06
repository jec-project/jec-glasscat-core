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
import { EjpSecurityConfig } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpSecurityConfig";

@TestSuite({
  description: "Test the EjpSecurityConfig class properties"
})
export class EjpSecurityConfigTest {

  public config:EjpSecurityConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpSecurityConfig();
  }

  @Test({
    description: "should have a 'constraints' property set to 'null'"
  })
  public constraintsTest():void {
    expect(this.config).to.have.property("constraints", null);
  }
  
  @Test({
    description: "should have a 'roles' property set to 'null'"
  })
  public rolesTest():void {
    expect(this.config).to.have.property("roles", null);
  }
  
  @Test({
    description: "should have a 'staticResources' property set to 'null'"
  })
  public staticResourcesTest():void {
    expect(this.config).to.have.property("staticResources", null);
  }
}