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
import { NotFoundErrorBuilder } from "../../../../../../src/com/onsoft/glasscat/domains/errors/NotFoundErrorBuilder";
import { DomainRequestError } from "../../../../../../src/com/onsoft/glasscat/domains/errors/DomainRequestError";
import { HttpStatusCode } from "jec-commons";

@TestSuite({
  description: "Test the NotFoundErrorBuilder class methods"
})
export class NotFoundErrorBuilderTest {

  public builder:NotFoundErrorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new NotFoundErrorBuilder();
  }

  @Test({
    description: "should create an instance of DomainRequestError"
  })
  public buildTest():void {
    expect(this.builder.build()).to.be.an.instanceOf(DomainRequestError);
  }
  
  @Test({
    description: "should create different instances of DomainRequestError"
  })
  public multipleBuildTest():void {
    expect(this.builder.build()).to.not.be.equal(this.builder.build());
  }
  
  @Test({
    description: "should create a DomainRequestError object of the type of HttpStatusCode.NOT_FOUND"
  })
  public statusCodeTest():void {
    expect(this.builder.build().statusCode).to.equal(HttpStatusCode.NOT_FOUND);
  }
  
  @Test({
    description: "should create a DomainRequestError object with 'detailsCode' equals to 'httpErrors.notFound'"
  })
  public detailsCodeTest():void {
    expect(this.builder.build().detailsCode).to.equal("httpErrors.notFound");
  }
  
  @Test({
    description: "should return 'null' when no message is passed to the build() function"
  })
  public noMessageTest():void {
    expect(this.builder.build().message).to.be.undefined;
  }
  
  @Test({
    description: "should create a object DomainRequestError with the same message as passed to the build() function"
  })
  public messageTest():void {
    let message:string = "Hello World!";
    expect(this.builder.build(message).message).to.equal(message);
  }
}