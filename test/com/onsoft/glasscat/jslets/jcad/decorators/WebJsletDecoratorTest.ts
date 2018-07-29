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

import { TestSuite, Test, BeforeAll, Before, After } from "jec-juta";
import { expect } from "chai";
import { WebJsletDecorator } from "../../../../../../../src/com/onsoft/glasscat/jslets/jcad/decorators/WebJsletDecorator";
import { JsletError } from"jec-exchange";

import * as utils from "../../../../../../../utils/test-utils/utilities/WebJsletDecoratorTestUtils";
import { HttpJsletImpl } from "../../../../../../../utils/test-utils/classes/HttpJsletImpl";
import { HttpJsletImpl2 } from "utils/test-utils/classes/HttpJsletImpl2";

@TestSuite({
  description: "Test the WebJsletDecorator class methods"
})
export class WebJsletDecoratorTest {

  public decorator:WebJsletDecorator = null;

  @BeforeAll()
  public initTest():void {
    this.decorator = new WebJsletDecorator();
  }

  @Before()
  public initDecorator():void {
    this.decorator = new WebJsletDecorator();
  }

  @After()
  public resetDecorator():void {
    this.decorator = new WebJsletDecorator();
  }

  @Test({
    description: "should throw a JsletError exception",
  })
  public decorateNoPatternErrorTest():void {
    const doDecorate:Function = function():void {
      this.decorator.decorate(utils.buildJslet(), utils.buildInvalidParams());
    };
    expect(doDecorate.bind(this)).to.throw(JsletError);
  }
  
  @Test({
    description: "should throw a JsletError exception of type of 'errors.jslet.patternsMissing'",
  })
  public decorateNoPatternErrorMessageTest():void {
    try {
      this.decorator.decorate(utils.buildJslet(), utils.buildInvalidParams());
    } catch (e) {
      expect(e.message).to.equal(utils.PATTERNS_MISSING_ERROR);
    }
  }
  
  @Test({
    description: "should throw a JsletError exception",
  })
  public decorateEmptyPatternErrorTest():void {
    const doDecorate:Function = function():void {
      this.decorator.decorate(
        utils.buildJslet(), utils.buildEmptyPatternsParams()
      );
    };
    expect(doDecorate.bind(this)).to.throw(JsletError);
  }
  
  @Test({
    description: "should throw a JsletError exception of type of 'errors.jslet.patternsEmpty'",
  })
  public decorateEmptyPatternErroressageTest():void {
    try {
      this.decorator.decorate(
        utils.buildJslet(), utils.buildEmptyPatternsParams()
      );
    } catch (e) {
      expect(e.message).to.equal(utils.PATTERNS_EMPTY_ERROR);
    }
  }

  @Test({
    description: "should return constructor function of the decorated class",
  })
  public decorateTest():void {
    const target:any = this.decorator.decorate(
      utils.buildJslet(), utils.buildParams()
    );
    const jslet:any = new target();
    expect(jslet).to.be.an.instanceOf(HttpJsletImpl);
  }

  @Test({
    description: "should return a jslet with the same name as specified in the parameters context",
  })
  public getNameTest():void {
    const target:any = this.decorator.decorate(
      utils.buildJslet(), utils.buildParams()
    );
    const jslet:any = new target();
    expect(jslet.getName()).to.equal(utils.JSLET_NAME);
  }
  
  @Test({
    description: "should return a jslet with the same url patterns as specified in the parameters context",
  })
  public getUrlPatternsTest():void {
    const target:any = this.decorator.decorate(
      utils.buildJslet(), utils.buildParams()
    );
    const jslet:any = new target();
    expect(jslet.getUrlPatterns()).to.equal(utils.JSLET_URL_PATTERNS);
  }
  
  @Test({
    description: "should return a jslet with no template",
  })
  public noTemplateTest():void {
    const target:any = this.decorator.decorate(
      new HttpJsletImpl2(), utils.buildParams()
    );
    const jslet:any = new target();
    expect(jslet.getTemplate()).to.be.null;
  }

  @Test({
    description: "should return a jslet with the same template as specified in the parameters context",
  })
  public getTemplateTest():void {
    const target:any = this.decorator.decorate(
      utils.buildJslet(), utils.buildParamsWithTemplate()
    );
    const jslet:any = new target();
    expect(jslet.getTemplate()).to.equal(utils.JSLET_TEMPLATE);
  }
}