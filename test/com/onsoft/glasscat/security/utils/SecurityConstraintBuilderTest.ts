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
import { SecurityConstraint } from "jec-exchange";
import { SecurityConstraintBuilder } from "../../../../../../src/com/onsoft/glasscat/security/utils/SecurityConstraintBuilder";
import { BasicSecurityConstraint } from "../../../../../../src/com/onsoft/glasscat/security/core/BasicSecurityConstraint";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/BasicSecurityConstrainTestUtils";

@TestSuite({
  description: "Test the SecurityConstraintBuilder class methods"
})
export class SecurityConstraintBuilderTest {

  public builder:SecurityConstraintBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new SecurityConstraintBuilder();
  }

  @Test({
    description: "should throw a GlassCatError"
  })
  public nullContextErrorTest():void {
    const buildConstraint:Function = function():void {
      this.builder.build(null);
    }
    expect(buildConstraint.bind(this)).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_SECURITY_CONTEXT"
  })
  public nullContextErrorCodeTest():void {
    try {
      this.builder.build(null);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
    }
  }
  
  @Test({
    description: "should return a BasicSecurityConstraint instance"
  })
  public getNameTest():void {
    const constraint:SecurityConstraint =
                                        this.builder.build(utils.buildConfig());
    expect(constraint).to.be.an.instanceOf(BasicSecurityConstraint);
  }
}