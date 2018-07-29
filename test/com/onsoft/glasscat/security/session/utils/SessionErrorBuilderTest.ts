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
import { BasicSessionError } from "../../../../../../../src/com/onsoft/glasscat/security/session/errors/BasicSessionError";
import { SessionErrorBuilder } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionErrorBuilder";

import * as utils from "../../../../../../../utils/test-utils/utilities/BasicSessionErrorTestUtils"; 
import { SessionError } from "jec-exchange";

@TestSuite({
  description: "Test the SessionErrorBuilder class methods"
})
export class SessionErrorBuilderTest {

  public builder:SessionErrorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new SessionErrorBuilder();
  }

  @Test({
    description: "should return an implementation of the SessionError interface"
  })
  public buildTest():void {
    const result:SessionError = this.builder.build(
      utils.SESSION_ID, utils.ERROR_TYPE, utils.ERROR_MESSAGE
    );
    expect(result).to.be.an.instanceOf(BasicSessionError);
  }
  
  @Test({
    description: "should return the same error message as passed to the function"
  })
  public getMessageTest():void {
    const result:SessionError = this.builder.build(
      utils.SESSION_ID, utils.ERROR_TYPE, utils.ERROR_MESSAGE
    );
    expect(result.getMessage()).to.equal(utils.ERROR_MESSAGE);
  }
  
  @Test({
    description: "should return the same SessionId instance as passed to the function"
  })
  public getSessionIdTest():void {
    const result:SessionError = this.builder.build(
      utils.SESSION_ID, utils.ERROR_TYPE, utils.ERROR_MESSAGE
    );
    expect(result.getSessionId()).to.equal(utils.SESSION_ID);
  }
  
  @Test({
    description: "should return the same error type as passed to the function"
  })
  public getErrorTypeTest():void {
    const result:SessionError = this.builder.build(
      utils.SESSION_ID, utils.ERROR_TYPE, utils.ERROR_MESSAGE
    );
    expect(result.getErrorType()).to.equal(utils.ERROR_TYPE);
  }
}