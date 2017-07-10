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
import { BasicSessionError } from "../../../../../../../src/com/onsoft/glasscat/security/session/errors/BasicSessionError";

import * as utils from "../../../../../../../utils/test-utils/utilities/BasicSessionErrorTestUtils"; 

@TestSuite({
  description: "Test the BasicSessionError class methods"
})
export class BasicSessionErrorTest {

  public error:BasicSessionError = null;

  @BeforeAll()
  public initTest():void {
    this.error = new BasicSessionError(
      utils.SESSION_ID,
      utils.ERROR_TYPE,
      utils.ERROR_MESSAGE
    );
  }

  @Test({
    description: "should return the same error type as passed to the constructor function"
  })
  public getErrorTypeTest():void {
    expect(this.error.getErrorType()).to.equal(utils.ERROR_TYPE);
  }
  
  @Test({
    description: "should return the same error message as passed to the constructor function"
  })
  public getMessageTest():void {
    expect(this.error.getMessage()).to.equal(utils.ERROR_MESSAGE);
  }
  
  @Test({
    description: "should return the same SessionId instance as passed to the constructor function"
  })
  public getSessionIdTest():void {
    expect(this.error.getSessionId()).to.equal(utils.SESSION_ID);
  }
}