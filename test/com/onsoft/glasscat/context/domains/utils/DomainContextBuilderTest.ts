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
import { DomainContextBuilder } from "../../../../../../../src/com/onsoft/glasscat/context/domains/utils/DomainContextBuilder";
import { DomainContext } from "../../../../../../../src/com/onsoft/glasscat/context/DomainContext";

import * as utils from "../../../../../../../utils/test-utils/utilities/DomainContextBuilderTestUtils";

@TestSuite({
  description: "Test the DomainContextBuilder class methods"
})
export class DomainContextBuilderTest {

  public builder:DomainContextBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new DomainContextBuilder();
  }

  @Test({
    description: "should return a DomainContext instance when no domain is specified"
  })
  public buildContextEmptyTest():void {
    let context:any = this.builder.buildContext(utils.EMPTY_CONFIG);
    expect(context).to.be.an.instanceOf(DomainContext);
  }
  
  @Test({
    description: "should throw an error when the 'config' parameter is 'null'"
  })
  public buildContextNullTest():void {
    let buildContext:Function = function():void {
      this.builder.buildContext(null);
    };
    expect(buildContext).to.throw(Error);
  }

  @Test({
    description: "should throw an error when the 'config' parameter contains an illegal 'domains' parameter"
  })
  public buildContextInvalidDomainTest():void {
    let buildContext:Function = function():void {
      this.builder.buildContext(utils.INVALID_CONFIG);
    };
    expect(buildContext).to.throw(Error);
  }
  
  @Test({
    description: "should return a valid DomainContext instance"
  })
  public buildContextTest():void {
    let context:any = this.builder.buildContext(utils.VALID_CONFIG);
    expect(context).to.be.an.instanceOf(DomainContext);
  }
  
  @Test({
    description: "should return a valid Domain collection"
  })
  public buildContextDomainTest():void {
    let context:DomainContext = this.builder.buildContext(utils.VALID_CONFIG);
    expect(context.getDomainList()).to.have.a.lengthOf(1);
  }
}