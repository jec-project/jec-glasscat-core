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
import { StaticResources } from "jec-exchange";
import { StaticResourcesBuilder } from "../../../../../../src/com/onsoft/glasscat/security/utils/StaticResourcesBuilder";
import { BasicStaticResources } from "../../../../../../src/com/onsoft/glasscat/security/core/BasicStaticResources";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/BasicStaticResourcesTestUtils";

@TestSuite({
  description: "Test the StaticResourcesBuilder class methods"
})
export class StaticResourcesBuilderTest {

  public builder:StaticResourcesBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new StaticResourcesBuilder();
  }

  @Test({
    description: "should throw a GlassCatError"
  })
  public nullContextErrorTest():void {
    let buildConfig:Function = function():void {
      this.builder.build(null);
    }
    expect(buildConfig.bind(this)).to.throw(GlassCatError);
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
    description: "should return an instance of the BasicStaticResources class"
  })
  public getNameTest():void {
    let config:StaticResources = this.builder.build(utils.buildConfig());
    expect(config).to.be.an.instanceOf(BasicStaticResources);
  }B
}