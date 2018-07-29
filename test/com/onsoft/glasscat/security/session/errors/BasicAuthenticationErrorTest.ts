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
import { BasicAuthenticationError } from "../../../../../../../src/com/onsoft/glasscat/security/session/errors/BasicAuthenticationError";
import { HttpStatusCode } from "jec-commons";

@TestSuite({
  description: "Test the BasicAuthenticationError class methods"
})
export class BasicAuthenticationErrorTest {

  @Test({
    description: "should return the same status code as passed to the constructor function"
  })
  public getStatusCodeTest():void {
    const error:BasicAuthenticationError =
                       new BasicAuthenticationError(HttpStatusCode.BAD_GATEWAY);
    expect(error.getStatusCode()).to.equal(HttpStatusCode.BAD_GATEWAY);
  }
}