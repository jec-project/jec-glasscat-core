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
import { UrlUtils } from "../../../../../../src/com/onsoft/glasscat/util/url/UrlUtils";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/UrlUtilsTestUtils"; 

@TestSuite({
  description: "Test the UrlUtils class methods"
})
export class UrlUtilsTest {

  @Test({
    description: "should throw a GlassCatError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new UrlUtils();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.SINGLETON_ERROR when calling the constructor function"
  })
  public singletonErrorCodeTest():void {
    try {
      new UrlUtils();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.SINGLETON_ERROR);
    }
  }

  @Test({
    description: "should return a UrlUtils instance"
  })
  public getInstanceTest():void {
    let urlUtils:UrlUtils = UrlUtils.getInstance();
    expect(urlUtils).to.be.an.instanceOf(UrlUtils);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    let utils1:UrlUtils = UrlUtils.getInstance();
    let utils2:UrlUtils = UrlUtils.getInstance();
    expect(utils1).to.equal(utils2);
  }
  
  @Test({
    description: "should remove the context root reference from the specified URL path"
  })
  public trimContextRootTest():void {
    let urlUtils:UrlUtils = UrlUtils.getInstance();
    expect(urlUtils.trimContextRoot(utils.VALID_PATH, utils.CONTEXTROOT))
          .to.equal(utils.TRIMMED_VALID_PATH);
  }
  
  @Test({
    description: "should return the same URL path as specified as parameter of the 'trimContextRoot()' method"
  })
  public trimContextRootInvalidTest():void {
    let urlUtils:UrlUtils = UrlUtils.getInstance();
    expect(urlUtils.trimContextRoot(utils.INVALID_PATH, utils.CONTEXTROOT))
          .to.equal(utils.INVALID_PATH);
  }
  
  @Test({
    description: "should return an empty string when the URL path is an empty string"
  })
  public trimContextRootEmptyTest():void {
    let urlUtils:UrlUtils = UrlUtils.getInstance();
    expect(urlUtils.trimContextRoot(utils.EMPTY_PATH, utils.CONTEXTROOT))
          .to.equal(utils.EMPTY_PATH);
  }
  
  @Test({
    description: "should return the same URL path as specified as parameter of the 'trimContextRoot()' method when the context root is misplaced"
  })
  public trimContextRootMisplacedTest():void {
    let urlUtils:UrlUtils = UrlUtils.getInstance();
    expect(
      urlUtils.trimContextRoot(utils.MISPLACED_CONTEXTROOT, utils.CONTEXTROOT)
    ).to.equal(utils.MISPLACED_CONTEXTROOT);
  }
}