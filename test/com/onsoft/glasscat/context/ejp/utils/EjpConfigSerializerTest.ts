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

import { TestSuite, Test, BeforeAll, Async } from "jec-juta";
import { expect, assert } from "chai";
import { EjpConfigSerializer } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/utils/EjpConfigSerializer";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";

import * as utils from "../../../../../../../utils/test-utils/utilities/EjpConfigSerializerTestUtils";
import * as configUtils from "../../../../../../../utils/test-utils/utilities/EjpConfigUtils";

@TestSuite({
  description: "Test the EjpConfigSerializer serialize method"
})
export class EjpConfigSerializerTest {

  public serializer:EjpConfigSerializer = null;

  @BeforeAll()
  public initTest():void {
    this.serializer = new EjpConfigSerializer();
  }

  @Test({
    description: "should return a complex string representation of the 'EjpConfig' instance"
  })
  public serializeTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.buildFullConfig(),
      (data:string)=> {
        expect(data).to.equal(utils.COMPLETE_NOT_OPTIMIZED);
        done();
      },
      (err:GlassCatError)=> {
        assert.fail(null, err, "Test should not fail: validation errors are tested in EjpConfigValidatorTest class");
      },
      false
    );
  }
  
  @Test({
    description: "should return a non-optimized string representation of the 'EjpConfig' instance"
  })
  public serializeNotOptimizedTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.buildMinimalConfig(),
      (data:string)=> {
        expect(data).to.equal(utils.NOT_OPTIMIZED);
        done();
      },
      (err:GlassCatError)=> {
        assert.fail(null, err, "Test should not fail: validation errors are tested in EjpConfigValidatorTest class");
      },
      false
    );
  }
    
  @Test({
    description: "should return an optimized string representation of the 'EjpConfig' instance"
  })
  public serializeOptimizedTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.buildMinimalConfig(),
      (data:string)=> {
        expect(data).to.equal(utils.OPTIMIZED);
        done();
      },
      (err:GlassCatError)=> {
        assert.fail(null, err, "Test should not fail: validation errors are tested in EjpConfigValidatorTest class");
      },
      true
    );
  }
}