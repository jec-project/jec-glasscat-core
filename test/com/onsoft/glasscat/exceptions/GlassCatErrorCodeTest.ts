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
import { GlassCatErrorCode } from "../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../utils/test-utils/utilities/GlassCatErrorCodeTestUtils";

@TestSuite({
  description: "Test the GlassCatErrorCode class static constants"
})
export class GlassCatErrorCodeTest {
  
  @Test({
    description: "GlassCatErrorCode.SINGLETON_ERROR should be equal to '0'"
  })
  public SINGLETON_ERRORTest():void {
    expect(GlassCatErrorCode.SINGLETON_ERROR).to.equal(utils.SINGLETON_ERROR);
  }
  
  @Test({
    description: "GlassCatErrorCode.CONFIG_LOADING_FAILURE should be equal to '1'"
  })
  public CONFIG_LOADING_FAILURETest():void {
    expect(GlassCatErrorCode.CONFIG_LOADING_FAILURE).to.equal(utils.CONFIG_LOADING_FAILURE);
  }
  
  @Test({
    description: "GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR should be equal to '2'"
  })
  public CONFIG_SERIALIZATION_ERRORTest():void {
    expect(GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR).to.equal(utils.CONFIG_SERIALIZATION_ERROR);
  }
  
  @Test({
    description: "GlassCatErrorCode.CONFIG_UPDATE_ERROR should be equal to '3'"
  })
  public CONFIG_UPDATE_ERRORTest():void {
    expect(GlassCatErrorCode.CONFIG_UPDATE_ERROR).to.equal(utils.CONFIG_UPDATE_ERROR);
  }
  
  @Test({
    description: "GlassCatErrorCode.NULL_EJP_CONFIG should be equal to '4'"
  })
  public NULL_EJP_CONFIGTest():void {
    expect(GlassCatErrorCode.NULL_EJP_CONFIG).to.equal(utils.NULL_EJP_CONFIG);
  }

  @Test({
    description: "GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY should be equal to '5'"
  })
  public EJP_CONFIG_MISSING_PROPERTYTest():void {
    expect(
      GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY
    ).to.equal(utils.EJP_CONFIG_MISSING_PROPERTY);
  }

  @Test({
    description: "GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY should be equal to '6'"
  })
  public EJP_CONFIG_INVALID_PROPERTYTest():void {
    expect(
      GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY
    ).to.equal(utils.EJP_CONFIG_INVALID_PROPERTY);
  }

  @Test({
    description: "GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN should be equal to '7'"
  })
  public EJP_CONFIG_INVALID_LOGINTest():void {
    expect(
      GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN
    ).to.equal(utils.EJP_CONFIG_INVALID_LOGIN);
  }
  
  @Test({
    description: "GlassCatErrorCode.EJP_CONFIG_INVALID_REALM should be equal to '8'"
  })
  public EJP_CONFIG_INVALID_REALMTest():void {
    expect(
      GlassCatErrorCode.EJP_CONFIG_INVALID_REALM
    ).to.equal(utils.EJP_CONFIG_INVALID_REALM);
  }

  @Test({
    description: "GlassCatErrorCode.INVALID_SECURITY_CONTEXT should be equal to '9'"
  })
  public INVALID_SECURITY_CONTEXTTest():void {
    expect(
      GlassCatErrorCode.INVALID_SECURITY_CONTEXT
    ).to.equal(utils.INVALID_SECURITY_CONTEXT);
  }

  @Test({
    description: "GlassCatErrorCode.INVALID_ENCRYPTION_KEY should be equal to '10'"
  })
  public INVALID_ENCRYPTION_KEYTest():void {
    expect(
      GlassCatErrorCode.INVALID_ENCRYPTION_KEY
    ).to.equal(utils.INVALID_ENCRYPTION_KEY);
  }

  @Test({
    description: "GlassCatErrorCode.INVALID_CONTEXT should be equal to '11'"
  })
  public INVALID_CONTEXTTest():void {
    expect(
      GlassCatErrorCode.INVALID_CONTEXT
    ).to.equal(utils.INVALID_CONTEXT);
  }
  
  @Test({
    description: "GlassCatErrorCode.ADMIN_REALM_INIT_FAILURE should be equal to '12'"
  })
  public ADMIN_REALM_INIT_FAILURETest():void {
    expect(
      GlassCatErrorCode.ADMIN_REALM_INIT_FAILURE
    ).to.equal(utils.ADMIN_REALM_INIT_FAILURE);
  }
}