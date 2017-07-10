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
import { EjpLoginStrategyConfig } from "../../../../../../../src/com/onsoft/glasscat/security/login/config/EjpLoginStrategyConfig";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../../utils/test-utils/utilities/EjpLoginStrategyConfigTestUtils";
import * as configUtils from "../../../../../../../utils/test-utils/utilities/EjpConfigUtils";

@TestSuite({
  description: "Test the EjpLoginStrategyConfig class methods"
})
export class EjpLoginStrategyConfigTest {

  public strategy:EjpLoginStrategyConfig = null;

  @BeforeAll()
  public initTest():void {
    this.strategy = new EjpLoginStrategyConfig(utils.buildConfig());
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.NULL_EJP_CONFIG"
  })
  public noContextTest():void {
    try {
      new EjpLoginStrategyConfig(null);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.NULL_EJP_CONFIG);
    }
  }
  
  @Test({
    description: "should return the same authentication method as defined in the context"
  })
  public getAuthMethodTest():void {
    expect(
      this.strategy.getAuthMethod()
    ).to.equal(configUtils.LOGIN_AUTH_METHOD);
  }

  @Test({
    description: "should return the same secured area as defined in the context"
  })
  public getSecuredAreaTest():void {
    expect(
      this.strategy.getSecuredArea()
    ).to.equal(utils.REALM_CONFIG.securedArea);
  }
  
  @Test({
    description: "should return the same error Url as defined in the context"
  })
  public getFormPropertiesErrorUrlTest():void {
    expect(
      this.strategy.getFormProperties().getErrorUrl()
    ).to.equal(utils.FORM_CONFIG.errorUrl);
  }
  
  @Test({
    description: "should return the same login Url as defined in the context"
  })
  public getFormPropertiesLoginUrlTest():void {
    expect(
      this.strategy.getFormProperties().getLoginUrl()
    ).to.equal(utils.FORM_CONFIG.loginUrl);
  }
}