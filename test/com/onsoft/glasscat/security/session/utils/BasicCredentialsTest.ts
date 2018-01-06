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
import { CredentialsBuilder } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/CredentialsBuilder";
import { BasicCredentials } from "../../../../../../../src/com/onsoft/glasscat/security/session/BasicCredentials";
import { Credentials } from "jec-exchange";

@TestSuite({
  description: "Test the CredentialsBuilder class properties"
})
export class CredentialsBuilderTest {

  public builder:CredentialsBuilder = null;
  public readonly login:string = "login";
  public readonly password:string = "password";

  @BeforeAll()
  public initTest():void {
    this.builder = new CredentialsBuilder();
  }

  @Test({
    description: "should return an implementation of the Credentials interface"
  })
  public buildTest():void {
    expect(
      this.builder.build(this.login, this.password)
    ).to.be.an.instanceOf(BasicCredentials);
  }
  
  @Test({
    description: "should return the same login as passed to the constructor function"
  })
  public loginTest():void {
    let credentials:Credentials = this.builder.build(this.login, this.password);
    expect(credentials.login).to.equal(this.login);
  }
  
  @Test({
    description: "should return the same password as passed to the constructor function"
  })
  public passwordTest():void {
    let credentials:Credentials = this.builder.build(this.login, this.password);
    expect(credentials.password).to.equal(this.password);
  }
}