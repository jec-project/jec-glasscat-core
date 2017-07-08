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
import { UrlPatternUtils } from "../../../../../../src/com/onsoft/glasscat/util/url/UrlPatternUtils";
import { UrlPatternBuilder } from "../../../../../../src/com/onsoft/glasscat/util/url/UrlPatternBuilder";

import * as utils from "../../../../../../utils/test-utils/utilities/UrlPatternUtilsTestUtils"; 

@TestSuite({
  description: "Test the UrlPatternUtils class methods"
})
export class UrlPatternUtilsTest {

  public patternUtils:UrlPatternUtils = null;
  public patternBuilder:UrlPatternBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.patternUtils = new UrlPatternUtils();
    this.patternBuilder = new UrlPatternBuilder();
  }

  @Test({
    description: "should return 'true' when URL matches the specified pattern"
  })
  public shortMathchTrueTest():void {
    expect(
        this.patternUtils.match(
          utils.BASE_URL,
          this.patternBuilder.build(utils.BASE_URL)
        )).to.be.true;
  }

  @Test({
    description: "should return 'false' when URL does not matche the specified pattern"
  })
  public shortMathchFalseTest():void {
    expect(
        this.patternUtils.match(
          utils.BASE_URL,
          this.patternBuilder.build(utils.OTHER_URL)
        )).to.be.false;
  }

  @Test({
    description: "should return 'true' when pattern is not strict and using short paths in URL pattern mode: my/url === my/url/"
  })
  public shortPathMathchTest():void {
    expect(
        this.patternUtils.match(
          utils.SHORT_URL,
          this.patternBuilder.build(utils.PERMISIVE_URL)
        )).to.be.true;
  }
  
  @Test({
    description: "should return 'true' when pattern is not strict and trying to access a sub-resource"
  })
  public permissiveSubPathTest():void {
    expect(
        this.patternUtils.match(
          utils.INDEXED_URL,
          this.patternBuilder.build(utils.PERMISIVE_URL)
        )).to.be.true;
  }
  
  @Test({
    description: "should return 'false' when pattern is strict and trying to access a sub-resource"
  })
  public strictSubPathTest():void {
    expect(
        this.patternUtils.match(
          utils.INDEXED_URL,
          this.patternBuilder.build(utils.BASE_URL)
        )).to.be.false;
  }
  
  @Test({
    description: "should return 'true' when pattern is not strict and trying to access a query"
  })
  public permissiveQueryTest():void {
    expect(
        this.patternUtils.match(
          utils.QUERY_URL,
          this.patternBuilder.build(utils.PERMISIVE_URL)
        )).to.be.true;
  }
  
  @Test({
    description: "should return 'false' when pattern is strict and trying to access a query"
  })
  public strictQueryTest():void {
    expect(
        this.patternUtils.match(
          utils.QUERY_URL,
          this.patternBuilder.build(utils.BASE_URL)
        )).to.be.false;
  }
}