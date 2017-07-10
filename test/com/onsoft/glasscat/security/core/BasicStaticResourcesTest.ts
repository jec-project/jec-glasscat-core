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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { UrlPattern } from "jec-commons";
import { BasicStaticResources } from "../../../../../../src/com/onsoft/glasscat/security/core/BasicStaticResources";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/BasicStaticResourcesTestUtils";

@TestSuite({
  description: "Test the BasicStaticResources class methods"
})
export class BasicStaticResourcesTest {

  @Test({
    description: "should throw a GlassCatError"
  })
  public nullContextErrorTest():void {
    let buildConstraint:Function = function():void {
      new BasicStaticResources(null);
    }
    expect(buildConstraint).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_SECURITY_CONTEXT"
  })
  public nullContextErrorCodeTest():void {
    try {
      new BasicStaticResources(null);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
    }
  }
  
  @Test({
    description: "should return an instance of the UrlPattern class"
  })
  public getNameTest():void {
    let config:BasicStaticResources =
                                  new BasicStaticResources(utils.buildConfig());
    expect(
      config.getUrlPattern().baseUrl
    ).to.equal(utils.CONFIG_URL_PATTERN);
  }
}