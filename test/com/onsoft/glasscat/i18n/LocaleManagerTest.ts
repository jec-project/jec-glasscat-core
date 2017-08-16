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

import { TestSuite, Test, TestSorters } from "jec-juta";
import { expect } from "chai";
import { LocaleManager } from "../../../../../src/com/onsoft/glasscat/i18n/LocaleManager";
import { GlassCatError } from "../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../utils/test-utils/utilities/LocaleManagerTestUtils";

@TestSuite({
  description: "Test the LocaleManager class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class LocaleManagerTest {

  @Test({
    description: "should throw a GlassCatError error when calling the constructor function",
    order: 0
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new LocaleManager();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.SINGLETON_ERROR when calling the constructor function",
    order: 1
  })
  public singletonErrorCodeTest():void {
    try {
      new LocaleManager();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.SINGLETON_ERROR);
    }
  }

  @Test({
    description: "should return a LocaleManager instance",
    order: 2
  })
  public getInstanceTest():void {
    let manager:LocaleManager = LocaleManager.getInstance();
    expect(manager).to.be.an.instanceOf(LocaleManager);
  }
  
  @Test({
    description: "should return a singleton reference",
    order: 3
  })
  public validSingletonTest():void {
    let manager1:LocaleManager = LocaleManager.getInstance();
    let manager2:LocaleManager = LocaleManager.getInstance();
    expect(manager1).to.equal(manager2);
  }
  
  @Test({
    description: "should return 'false' when singleton is not initialized",
    order: 4
  })
  public isInitializedFalseTest():void {
    expect(LocaleManager.getInstance().isInitialized()).to.be.false;
  }

  @Test({
    description: "should return 'null' when no locale is defined",
    order: 5
  })
  public getLocaleNullTest():void {
    expect(LocaleManager.getInstance().getLocale()).to.be.null;
  }
  
  @Test({
    description: "should initialize the singleton",
    order: 6
  })
  public initTest():void {
    LocaleManager.getInstance().init(utils.LOCALE, utils.TEST_CONFIG);
  }

  @Test({
    description: "should return 'true' when singleton is initialized",
    order: 7
  })
  public isInitializedTest():void {
    expect(LocaleManager.getInstance().isInitialized()).to.be.true;
  }

  @Test({
    description: "should return the same locale as used for initialization",
    order: 8
  })
  public getLocaleTest():void {
    expect(LocaleManager.getInstance().getLocale()).to.equal(utils.LOCALE);
  }
  
  @Test({
    description: "should return the phrase associated with the specified key",
    order: 9
  })
  public getKeyTest():void {
    expect(
      LocaleManager.getInstance().get(utils.HELLO_WORLD_KEY)
    ).to.equal(utils.HELLO_WORLD);
  }
  
  @Test({
    description: "should return a phrase with the correct substitued values",
    order: 10
  })
  public getParamsTest():void {
    expect(
      LocaleManager.getInstance()
                   .get(utils.HELLO_WORLD_NAME, utils.HELLO_WORLD_PARAM)
    ).to.equal(utils.HELLO_JOHN_DOE);
  }
  
  @Test({
    description: "should reset the singleton",
    order: 11
  })
  public initNullTest():void {
    LocaleManager.getInstance().init(null);
  }

  @Test({
    description: "should return 'false' ",
    order: 12
  })
  public isInitializedResetFalseTest():void {
    expect(LocaleManager.getInstance().isInitialized()).to.be.false;
  }
  
  @Test({
    description: "should return 'null'",
    order: 13
  })
  public getLocaleResetTest():void {
    expect(LocaleManager.getInstance().getLocale()).to.be.null;
  }
}