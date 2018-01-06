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
import { EjpLoginConfig } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfig";

@TestSuite({
  description: "Test the EjpLoginConfig class properties"
})
export class EjpLoginConfigTest {

  public config:EjpLoginConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpLoginConfig();
  }

  @Test({
    description: "should have a 'authMethod' property set to 'null'"
  })
  public authMethodTest():void {
    expect(this.config).to.have.property("authMethod", null);
  }
  
  @Test({
    description: "should have a 'formConfig' property set to 'null'"
  })
  public formConfigTest():void {
    expect(this.config).to.have.property("formConfig", null);
  }
  
  @Test({
    description: "should have a 'realm' property set to 'null'"
  })
  public realmTest():void {
    expect(this.config).to.have.property("realm", null);
  }
}