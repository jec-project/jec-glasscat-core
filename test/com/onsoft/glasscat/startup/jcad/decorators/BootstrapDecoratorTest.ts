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
import { BootstrapScript } from "jec-commons";
import { BootstrapDecorator } from "../../../../../../../src/com/onsoft/glasscat/startup/jcad/decorators/BootstrapDecorator";

import * as utils from "../../../../../../../utils/test-utils/utilities/BootstrapDecoratorTestUtils";
import { BootstrapImpl } from "../../../../../../../utils/test-utils/classes/BootstrapImpl";

@TestSuite({
  description: "Test the BootstrapDecorator class methods"
})
export class BootstrapDecoratorTest {

  public decorator:BootstrapDecorator = null;

  @BeforeAll()
  public initTest():void {
    this.decorator = new BootstrapDecorator();
  }
  
  @Test({
    description: "should return constructor function of the decorated class",
  })
  public decorateTest():void {
    let target:any = this.decorator.decorate(
      utils.buildBootstrapScript(), utils.buildParams()
    );
    let bootstrap:any = new target();
    expect(bootstrap).to.be.an.instanceOf(BootstrapImpl);
  }
}