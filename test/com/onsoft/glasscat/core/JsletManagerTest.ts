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

import { TestSuite, Test, Before, After } from "jec-juta";
import { expect } from "chai";
import { JsletManager } from "../../../../../src/com/onsoft/glasscat/core/JsletManager";
import { Jslet, JsletContext } from "jec-exchange";

import * as utils from "../../../../../utils/test-utils/utilities/JsletManagerTestUtils";

@TestSuite({
  description: "Test the JsletManager class methods"
})
export class JsletManagerTest {

  public jsletManager:JsletManager = null;

  @Before()
  public initTest():void {
    this.jsletManager = new JsletManager();
  }
  
  @After()
  public resetTest():void {
    this.jsletManager = null;
  }

  @Test({
    description: "should return 'undefined' when the context does not exists"
  })
  public getContextUndefinedTest():void {
    expect(
      this.jsletManager.getContext(utils.UNDEFINED_CONTEXT_REF)
    ).to.equal(undefined);
  }

  @Test({
    description: "should return same JsletContext instance as added with the addContext() method"
  })
  public getContextTest():void {
    const ctx:JsletContext = utils.buildContext();
    this.jsletManager.addContext(utils.CONTEXT_REF, ctx);
    expect(
      this.jsletManager.getContext(utils.CONTEXT_REF)
    ).to.equal(ctx);
  }
  
  @Test({
    description: "should return 'undefined' when the context does not exists"
  })
  public getJsletUndefinedTest():void {
    expect(
      this.jsletManager.getJslet(utils.UNDEFINED_CONTEXT_REF, utils.JSLET_URL)
    ).to.equal(undefined);
  }
  
  @Test({
    description: "should return 'undefined' when the context does not have a Jslet instance registered for the specified URL"
  })
  public getJsletUnregisteredTest():void {
    const ctx:JsletContext = utils.buildContext();
    this.jsletManager.addContext(utils.CONTEXT_REF, ctx);
    expect(
      this.jsletManager.getJslet(utils.CONTEXT_REF, utils.JSLET_URL)
    ).to.equal(undefined);
  }
  
  @Test({
    description: "should return the Jslet instance registered for the specified URL"
  })
  public getJsletTest():void {
    const ctx:JsletContext = utils.buildContext();
    const jslet:Jslet = utils.buildJslet();
    ctx.addJslet(jslet);
    this.jsletManager.addContext(utils.CONTEXT_REF, ctx);
    expect(
      this.jsletManager.getJslet(utils.CONTEXT_REF, utils.JSLET_URL)
    ).to.equal(jslet);
  }
}