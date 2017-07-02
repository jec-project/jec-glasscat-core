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

import { TestSuite, Test, After } from "jec-juta";
import { expect } from "chai";
import { MappedPathUtil } from "../../../../../../src/com/onsoft/glasscat/util/paths/MappedPathUtil";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/MappedPathUtilTestUtils"; 

@TestSuite({
  description: "Test the MappedPathUtil class methods"
})
export class MappedPathUtilTest {

  @After()
  public resetSingleton():void {
    MappedPathUtil.getInstance().init(null);
  }

  @Test({
    description: "should throw a GlassCatError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new MappedPathUtil();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.SINGLETON_ERROR when calling the constructor function"
  })
  public singletonErrorCodeTest():void {
    try {
      new MappedPathUtil();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.SINGLETON_ERROR);
    }
  }

  @Test({
    description: "should return a MappedPathUtil instance"
  })
  public getInstanceTest():void {
    let urlUtils:MappedPathUtil = MappedPathUtil.getInstance();
    expect(urlUtils).to.be.an.instanceOf(MappedPathUtil);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    let utils1:MappedPathUtil = MappedPathUtil.getInstance();
    let utils2:MappedPathUtil = MappedPathUtil.getInstance();
    expect(utils1).to.equal(utils2);
  }
  
  @Test({
    description: "should return 'false' when the singleton is not initialized"
  })
  public isInitializedFalseTest():void {
    expect(MappedPathUtil.getInstance().isInitialized()).to.be.false;
  }
  
  @Test({
    description: "should return 'true' when the singleton is initialized"
  })
  public isInitializedTrueTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
    expect(MappedPathUtil.getInstance().isInitialized()).to.be.true;
  }

  @Test({
    description: "should return the same string as passed as parameter"
  })
  public noPatternTest():void {
    expect(
      MappedPathUtil.getInstance().resolve(utils.URI_PATH)
    ).to.equal(utils.URI_PATH);
  }
  
  @Test({
    description: "should return the same string as passed as parameter"
  })
  public glasscatPatternTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
    expect(
      MappedPathUtil.getInstance().resolve(utils.GLASSCAT_URI_PATTERN)
    ).to.equal(utils.GLASSCAT_URI_PATH);
  }
  
  @Test({
    description: "should return the same string as passed as parameter"
  })
  public rootPatternTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
    expect(
      MappedPathUtil.getInstance().resolve(utils.ROOT_URI_PATTERN)
    ).to.equal(utils.ROOT_URI_PATH);
  }

  @Test({
    description: "should return the same string as passed as parameter"
  })
  public modulesPatternTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
    expect(
      MappedPathUtil.getInstance().resolve(utils.MODULES_URI_PATTERN)
    ).to.equal(utils.MODULES_URI_PATH);
  }
}