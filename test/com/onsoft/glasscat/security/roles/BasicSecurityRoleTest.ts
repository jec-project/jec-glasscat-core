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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { BasicSecurityRole } from "../../../../../../src/com/onsoft/glasscat/security/roles/BasicSecurityRole";

@TestSuite({
  description: "Test the BasicSecurityRole class methods"
})
export class BasicSecurityRoleTest {

  public static readonly NAME:string = "ROLE_NAME";

  @Test({
    description: "should return the same name as passed to the constructor function"
  })
  public getNameTest():void {
    let role:BasicSecurityRole =
                              new BasicSecurityRole(BasicSecurityRoleTest.NAME);
    expect(role.getName()).to.equal(BasicSecurityRoleTest.NAME);
  }
}