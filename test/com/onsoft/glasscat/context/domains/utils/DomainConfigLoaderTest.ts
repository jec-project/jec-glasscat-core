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

import { TestSuite, Test, BeforeClass, AfterClass, Async } from "jec-juta";
import { expect, assert } from "chai";
import { DomainConfigLoader } from "../../../../../../../src/com/onsoft/glasscat/context/domains/utils/DomainConfigLoader";
import { MappedPathUtil } from "../../../../../../../src/com/onsoft/glasscat/util/paths/MappedPathUtil";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";

import * as utils from "../../../../../../../utils/test-utils/utilities/ConfigLoaderBaseTestUtils";

@TestSuite({
  description: "Test the ConfigLoaderBase class template methods"
})
export class DomainConfigLoaderTest {

  private loader:DomainConfigLoader = null;

  @BeforeClass()
  public initTest():void {
    this.loader = new DomainConfigLoader();
    MappedPathUtil.getInstance().init(process.cwd());
  }

  @AfterClass()
  public resetTest():void {
    this.loader = null;
    MappedPathUtil.getInstance().init(null);
  }

  @Test({
    description: "should load and return a valid JavaScript Object that contains domains information"
  })
  public loadSyncTest():void {
    let result:any = this.loader.loadSync();
    expect(result.domains).to.have.lengthOf(1);
  }

  @Test({
    description: "should load and return a valid JavaScript Object that contains domains information"
  })
  public loadConfigTest(@Async done:Function):void {
    this.loader.load(
      (data:any)=> {
        expect(data.domains).to.have.lengthOf(1);
        done();
      },
      (error:GlassCatError)=> {
        assert.fail(null, error, "Exception should not be thrown");
      }
    );
  }
}