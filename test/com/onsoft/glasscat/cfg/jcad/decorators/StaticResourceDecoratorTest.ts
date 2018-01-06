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
import * as chai from "chai";
import * as spies from "chai-spies";
import { Decorator } from "jec-commons";
import { StaticResourceDecorator } from "../../../../../../../src/com/onsoft/glasscat/cfg/jcad/decorators/StaticResourceDecorator";

//import * as utils from "../../../../../../../utils/test-utils/utilities/StaticResourceDecoratorTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the StaticResourceDecorator class methods",
  disabled: true
})
export class StaticResourceDecoratorTest {

  public decorator:Decorator = null;

  @BeforeAll()
  public initTest():void {
    this.decorator = new StaticResourceDecorator();
  }
}