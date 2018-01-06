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

import { TestSuite, Test, BeforeAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { JsletContextManager } from "../../../../../../src/com/onsoft/glasscat/jslets/jcad/JsletContextManager";
import { JcadContext, JcadContextManager } from "jec-commons";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { JsletConnectorRefs } from "jec-exchange";

import * as utils from "../../../../../../utils/test-utils/utilities/JsletContextManagerTestUtils";

@TestSuite({
  description: "Test the JsletContextManager class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class JsletContextManagerTest {

  public manager:JsletContextManager = null;
  public context:JcadContext = null;

  @BeforeAll()
  public initTest():void {
    this.manager = new JsletContextManager();
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
    description: "should register the specified context into the JCAD manager",
    order: 2
  })
  public createContextTest():void {
    this.manager.createContext(this.context);
    expect(
      this.manager.hasContext(JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF)
    ).to.be.true;
  }
  
  @Test({
    description: "should remove the specified context from the JCAD manager",
    order: 3
  })
  public deleteContextTest():void {
    this.manager.deleteContext();
    expect(
      this.manager.hasContext(JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF)
    ).to.be.false;
  }
}