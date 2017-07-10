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
import { BasicCredentials } from "../../../../../../src/com/onsoft/glasscat/security/session/BasicCredentials";

@TestSuite({
  description: "Test the BasicCredentials class properties"
})
export class BasicCredentialsTest {

  public credentials:BasicCredentials = null;

  @BeforeAll()
  public initTest():void {
    this.credentials = new BasicCredentials();
  }

  @Test({
    description: "should have a 'login' property set to 'null'"
  })
  public loginTest():void {
    expect(this.credentials).to.have.property("login", null);
  }
  
  @Test({
    description: "should have a 'password' property set to 'null'"
  })
  public passwordTest():void {
    expect(this.credentials).to.have.property("password", null);
  }
}