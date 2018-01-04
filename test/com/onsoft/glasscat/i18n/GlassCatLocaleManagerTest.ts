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
import { GlassCatLocaleManager } from "../../../../../src/com/onsoft/glasscat/i18n/GlassCatLocaleManager";
import { GlassCatError } from "../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { LocaleManager, LocaleManagerBase } from "jec-commons-node";

@TestSuite({
  description: "Test the GlassCatLocaleManager class methods"
})
export class GlassCatLocaleManagerTest {

  @Test({
    description: "should throw a SingletonError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new GlassCatLocaleManager();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should return a DefaultLocaleManager instance"
  })
  public getInstanceTest():void {
    let manager:LocaleManager = GlassCatLocaleManager.getInstance();
    expect(manager).to.be.an.instanceOf(LocaleManagerBase);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    let manager1:LocaleManager = GlassCatLocaleManager.getInstance();
    let manager2:LocaleManager = GlassCatLocaleManager.getInstance();
    expect(manager1).to.equal(manager2);
  }
}