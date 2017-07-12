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
import { HttpListenerFactory } from "../../../../../../../src/com/onsoft/glasscat/services/http/listeners/HttpListenerFactory";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { DefaultHttpListener } from "../../../../../../../src/com/onsoft/glasscat/services/http/listeners/DefaultHttpListener";

import * as utils from "../../../../../../../utils/test-utils/utilities/ListenerFactoryTestUtils";

@TestSuite({
  description: "Test the HttpListenerFactory class methods"
})
export class HttpListenerFactoryTest {

  @Test({
    description: "should throw a GlassCatError exception"
  })
  public createErrorTest():void {
    let createListener:Function = function():void {
      let factory:HttpListenerFactory = new HttpListenerFactory();
      factory.build(null);
    };
    expect(createListener).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError exception of type of 'GlassCatErrorCode.INVALID_CONTEXT'"
  })
  public createErrorCodeTest():void {
    try {
      let factory:HttpListenerFactory = new HttpListenerFactory();
      factory.build(null);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_CONTEXT);
    }
  }

  @Test({
    description: "should create a new DefaultHttpListener object"
  })
  public buildTest():void {
    let factory:HttpListenerFactory = new HttpListenerFactory();
    expect(
      factory.build(utils.buildConfig())
    ).to.be.an.instanceOf(DefaultHttpListener);
  }
}