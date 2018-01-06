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
import { DomainConfigSerializer } from "../../../../../../../src/com/onsoft/glasscat/context/domains/utils/DomainConfigSerializer";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../../utils/test-utils/utilities/DomainConfigSerializerTestUtils";

@TestSuite({
  description: "Test the DomainConfigSerializer class methods"
})
export class DomainConfigSerializerTest {

  private serializer:DomainConfigSerializer = null;

  @BeforeAll()
  public initTest():void {
    this.serializer = new DomainConfigSerializer();
  }

  @Test({
    description: "should return 'null' when data is 'null'"
  })
  public serializeNullTest(@Async done:Function):void {
    this.serializer.serialize(
      null,
      (data:string)=> {
        expect(data).to.equal("null");
        done();
      },
      (error:GlassCatError)=> {
        assert.fail(error, null, "Test should not fail");
      }
    );
  }
  
  @Test({
    description: "should invoque the error callback function when the object to serialize is not valid"
  })
  public serializeFailTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.INVALID_DATA,
      (data:string)=> {
        assert.fail(data, null, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(error).not.to.be.null;
        done();
      }
    );
  }
  
  @Test({
    description: "should indicate GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR when the object to serialize is not valid"
  })
  public serializeFailErrorTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.INVALID_DATA,
      (data:string)=> {
        assert.fail(data, null, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(
          error.getCode()
        ).to.equal(GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR);
        done();
      }
    );
  }
  
  @Test({
    description: "should return a string representation of the specified DomainConfig object"
  })
  public serializeTest(@Async done:Function):void {
    this.serializer.serialize(
      utils.buildDomainConfig(),
      (data:string)=> {
        expect(data).to.equal(utils.RESULT);
        done();
      },
      (error:GlassCatError)=> {
        assert.fail(error, null, "Test should not fail");
      }
    );
  }
}