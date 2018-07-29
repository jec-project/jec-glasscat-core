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
import { FormProperties } from "../../../../../../../src/com/onsoft/glasscat/security/login/config/FormProperties";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../../utils/test-utils/utilities/FormPropertiesTestUtils";
import * as configUtils from "../../../../../../../utils/test-utils/utilities/EjpConfigUtils";

@TestSuite({
  description: "Test the FormProperties class methods"
})
export class FormPropertiesTest {

  public props:FormProperties = null;

  @BeforeAll()
  public initTest():void {
    this.props = new FormProperties(utils.buildConfig());
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.NULL_EJP_CONFIG"
  })
  public noContextTest():void {
    try {
      new FormProperties(null);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.NULL_EJP_CONFIG);
    }
  }
  
  @Test({
    description: "should return the same error URL as specified in the form context"
  })
  public getErrorUrlTest():void {
    expect(
      this.props.getErrorUrl()
    ).to.equal(configUtils.FORM_CONFIG_ERROR_URL);
  }
  
  @Test({
    description: "should return the same login URL as specified in the form context"
  })
  public getLoginUrlTest():void {
    expect(
      this.props.getLoginUrl()
    ).to.equal(configUtils.FORM_CONFIG_LOGIN_URL);
  }
}