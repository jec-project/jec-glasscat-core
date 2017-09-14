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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { JecConfigContextManager } from "../../../../../../src/com/onsoft/glasscat/cfg/jcad/JecConfigContextManager";
import { JcadContext, JcadContextManager, ConfigConnectorRefs } from "jec-commons";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/ContextManagerTestUtils";

@TestSuite({
  description: "Test the JecConfigContextManager class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class JecConfigContextManagerTest {

  public manager:JecConfigContextManager = null;
  public context:JcadContext = null;

  @BeforeAll()
  public initTest():void {
    this.manager = new JecConfigContextManager();
    this.context = utils.builJcadContext();
  }

  @Test({
    description: "should throw a GlassCatError exception",
    order: 0
  })
  public createContextErrorTest():void {
    let createContext:Function = function():void {
      this.manager.createContext(null);
    };
    expect(createContext.bind(this)).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError exception of type of 'GlassCatErrorCode.INVALID_CONTEXT'",
    order: 1
  })
  public createContextErrorCodeTest():void {
    try {
      this.manager.createContext(null);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_CONTEXT);
    }
  }
  
  @Test({
    description: "should register the 'CacheControl' context into the JCAD manager",
    order: 2
  })
  public createCacheControlContextTest():void {
    this.manager.createContext(this.context);
    expect(
      this.manager.hasContext(ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF)
    ).to.be.true;
  }
  
  @Test({
    description: "should remove the 'CacheControl' context from the JCAD manager",
    order: 3
  })
  public deleteCacheControlContextTest():void {
    this.manager.deleteContext();
    expect(
      this.manager.hasContext(ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF)
    ).to.be.false;
  }
  
  @Test({
    description: "should register the 'StaticResource' context into the JCAD manager",
    order: 4
  })
  public createStaticResourceContextTest():void {
    this.manager.createContext(this.context);
    expect(
      this.manager.hasContext(ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF)
    ).to.be.true;
  }
  
  @Test({
    description: "should remove the 'StaticResource' context from the JCAD manager",
    order: 5
  })
  public deleteStaticResourceContextTest():void {
    this.manager.deleteContext();
    expect(
      this.manager.hasContext(ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF)
    ).to.be.false;
  }
}