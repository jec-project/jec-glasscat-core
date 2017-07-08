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
}