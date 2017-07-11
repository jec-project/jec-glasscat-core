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
import { DomainRequestError } from "../../../../../../src/com/onsoft/glasscat/domains/errors/DomainRequestError";

@TestSuite({
  description: "Test the DomainRequestError class properties"
})
export class DomainRequestErrorTest {

  public error:DomainRequestError = null;

  @BeforeAll()
  public initTest():void {
    this.error = new DomainRequestError();
  }

  @Test({
    description: "should have a 'statusCode' property set to '-1'"
  })
  public statusCodeTest():void {
    expect(this.error).to.have.property("statusCode", -1);
  }
  
  @Test({
    description: "should have a 'detailsCode' property set to 'httpErrors.error.description'"
  })
  public detailsCodeTest():void {
    expect(
      this.error
    ).to.have.property("detailsCode", "httpErrors.error.description");
  }
  
  @Test({
    description: "should have a 'message' property set to 'null'"
  })
  public messageTest():void {
    expect(this.error).to.have.property("message", null);
  }
  
}