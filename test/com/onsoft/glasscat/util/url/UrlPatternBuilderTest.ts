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
import { UrlPatternBuilder } from "../../../../../../src/com/onsoft/glasscat/util/url/UrlPatternBuilder";
import { UrlPattern } from "jec-commons";
import { ContextRootUtil } from "../../../../../../src/com/onsoft/glasscat/util/contextroot/ContextRootUtil";

import * as utils from "../../../../../../utils/test-utils/utilities/UrlPatternBuilderTestUtils"; 

@TestSuite({
  description: "Test the UrlPatternBuilder class methods"
})
export class UrlPatternBuilderTest {

  public builder:UrlPatternBuilder = null;

  @BeforeClass()
  public initTest():void {
    this.builder = new UrlPatternBuilder();
  }

  @Test({
    description: "should return a UrlPattern instance with 'strict' property set to 'true'"
  })
  public strictPatternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.STRICT_URL);
    expect(pattern.strict).to.be.true;
  }
  
  @Test({
    description: "should return a UrlPattern instance with 'strict' property set to 'false'"
  })
  public permisivePatternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.PERMISIVE_URL);
    expect(pattern.strict).to.be.false;
  }
  
  @Test({
    description: "should return a UrlPattern instance with 'baseUrl' property set to 'ContextRootUtil.INDEX' and 'strict' property set to 'false'"
  })
  public contextrootPermisivePatternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.CONTEXT_ROOT_PERMISIVE_URL);
    expect(pattern.strict).to.be.false;
    expect(pattern.baseUrl).to.equal(ContextRootUtil.INDEX);
  }
  
  @Test({
    description: "should return a UrlPattern instance with 'baseUrl' property set to 'ContextRootUtil.INDEX' and 'strict' property set to 'true'"
  })
  public contextrootStrictPatternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.CONTEXT_ROOT_STRICT_URL);
    expect(pattern.strict).to.be.false;
    expect(pattern.baseUrl).to.equal(ContextRootUtil.INDEX);
  }
  
  @Test({
    description: "should return a UrlPattern instance with 'baseUrl' property set to 'ContextRootUtil.INDEX' and 'strict' property set to 'true'"
  })
  public emptyUrlPatternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.EMPTY_URL);
    expect(pattern.strict).to.be.true;
    expect(pattern.baseUrl).to.equal(ContextRootUtil.INDEX);
  }
  
  @Test({
    description: "should return the correct 'baseUrl' property even if the specified URL does not start with a '/' character"
  })
  public noSlashStartTest():void {
    let pattern:UrlPattern = this.builder.build(utils.NO_START_SLASH_URL);
    expect(pattern.baseUrl).to.equal(utils.NO_START_SLASH_URL);
  }
  
  @Test({
    description: "should return the 'pattern' property set with the same value as passed as 'pattern' parameter"
  })
  public patternTest():void {
    let pattern:UrlPattern = this.builder.build(utils.STRICT_URL);
    expect(pattern.pattern).to.equal(utils.STRICT_URL);
  }
  
  @Test({
    description: "should return the correct computed 'baseUrl' property when 'strict' property is 'true'"
  })
  public baseUrlStrictTest():void {
    let pattern:UrlPattern = this.builder.build(utils.STRICT_URL);
    expect(pattern.baseUrl).to.equal(utils.BASE_URL);
  }
  
  @Test({
    description: "should return the correct computed 'baseUrl' property when 'strict' property is 'false'"
  })
  public baseUrlPermisiveTest():void {
    let pattern:UrlPattern = this.builder.build(utils.PERMISIVE_URL);
    expect(pattern.baseUrl).to.equal(utils.BASE_URL);
  }
  
  @Test({
    description: "should the correct value to the 'baseUrlLength' property when 'strict' property is 'false'"
  })
  public baseUrlLengthPermisiveTest():void {
    let pattern:UrlPattern = this.builder.build(utils.PERMISIVE_URL);
    expect(pattern.baseUrlLength).to.equal(pattern.baseUrl.length);
  }
  
  @Test({
    description: "should the correct value to the 'baseUrlLength' property when 'strict' property is 'true'"
  })
  public baseUrlLengthStrictTest():void {
    let pattern:UrlPattern = this.builder.build(utils.STRICT_URL);
    expect(pattern.baseUrlLength).to.equal(pattern.baseUrl.length);
  }
}