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
import { BasicSecurityConstraint } from "../../../../../../src/com/onsoft/glasscat/security/core/BasicSecurityConstraint";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/BasicSecurityConstrainTestUtils";

@TestSuite({
  description: "Test the BasicSecurityConstraint class methods"
})
export class BasicSecurityConstrainTest {

  @Test({
    description: "should throw a GlassCatError"
  })
  public nullContextErrorTest():void {
    const buildConstraint:Function = function():void {
      new BasicSecurityConstraint(null);
    }
    expect(buildConstraint).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_SECURITY_CONTEXT"
  })
  public nullContextErrorCodeTest():void {
    try {
      new BasicSecurityConstraint(null);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
    }
  }
  
  @Test({
    description: "should return the name of the specified EjpConstraintConfig"
  })
  public getNameTest():void {
    const constraint:BasicSecurityConstraint =
                               new BasicSecurityConstraint(utils.buildConfig());
    expect(constraint.getName()).to.equal(utils.CONFIG_NANE);
  }
  
  @Test({
    description: "should return the error URL of the specified EjpConstraintConfig"
  })
  public getErrorUrlTest():void {
    const constraint:BasicSecurityConstraint =
                               new BasicSecurityConstraint(utils.buildConfig());
    expect(constraint.getErrorUrl()).to.equal(utils.CONFIG_ERROR_URL);
  }
  
  @Test({
    description: "should return the URL pattern of the specified EjpConstraintConfig"
  })
  public getUrlPatternTest():void {
    const constraint:BasicSecurityConstraint =
                               new BasicSecurityConstraint(utils.buildConfig());
    expect(
      constraint.getUrlPattern().baseUrl
    ).to.equal(utils.CONFIG_URL_PATTERN);
  }
  
  @Test({
    description: "should return 'true'"
  })
  public hasRoleTest():void {
    const constraint:BasicSecurityConstraint =
                               new BasicSecurityConstraint(utils.buildConfig());
    expect(constraint.hasRole(utils.CONFIG_ROLE)).to.be.true;
  }
  
  @Test({
    description: "should return 'false'"
  })
  public hasRoleFalseTest():void {
    const constraint:BasicSecurityConstraint =
                               new BasicSecurityConstraint(utils.buildConfig());
    expect(constraint.hasRole("anything")).to.be.false;
  }
}