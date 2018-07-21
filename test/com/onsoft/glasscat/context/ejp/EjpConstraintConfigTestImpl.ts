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
import { EjpConstraintConfigImpl } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfigImpl";
import { EjpConstraintConfig } from "jec-glasscat-config";

@TestSuite({
  description: "Test the EjpConstraintConfigImpl class properties"
})
export class EjpConstraintConfigTestImpl {

  public config:EjpConstraintConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpConstraintConfigImpl();
  }

  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.config).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'roles' property set to 'null'"
  })
  public rolesTest():void {
    expect(this.config).to.have.property("roles", null);
  }
  
  @Test({
    description: "should have a 'urlPattern' property set to 'null'"
  })
  public urlPatternTest():void {
    expect(this.config).to.have.property("urlPattern", null);
  }
  
  @Test({
    description: "should have a 'errorUrl' property set to 'null'"
  })
  public errorUrlTest():void {
    expect(this.config).to.have.property("errorUrl", null);
  }
}