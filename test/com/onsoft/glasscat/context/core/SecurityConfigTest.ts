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
import { SecurityConfig } from "../../../../../../src/com/onsoft/glasscat/context/core/SecurityConfig";

@TestSuite({
  description: "Test the SecurityConfig class properties"
})
export class SecurityConfigTest {

  public config:SecurityConfig = null;

  @BeforeClass()
  public initProject():void {
    this.config = new SecurityConfig();
  }

  @Test({
    description: "should have a 'headerModules' property set to 'null'"
  })
  public headerModulesTest():void {
    expect(this.config).to.have.property("headerModules", null);
  }
}