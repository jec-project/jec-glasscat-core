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

import { TestSuite, Test, Async } from "jec-juta";
import { expect, assert } from "chai";
import { LoggerManagerBuilder } from "../../../../../../src/com/onsoft/glasscat/util/logging/LoggerManagerBuilder";
import { LoggerManager } from "../../../../../../src/com/onsoft/glasscat/util/logging/LoggerManager";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { GlassCatContext } from "../../../../../../src/com/onsoft/glasscat/context/GlassCatContext";
import { BootstrapConfig } from "../../../../../../src/com/onsoft/glasscat/context/core/BootstrapConfig";
import { BootstrapConfigParser } from "../../../../../../src/com/onsoft/glasscat/context/core/utils/BootstrapConfigParser";
import { JsonLoader, JsonLoaderError, Logger } from "jec-commons";
import { DefaultJsonLoader } from "jec-commons-node";

import * as utils from "../../../../../../utils/test-utils/utilities/GlassCatLogFormatterTestUtils"; 

@TestSuite({
  description: "Test the LoggerManagerBuilder class methods"
})
export class LoggerManagerBuilderTest {

  @Test({
    description: "should throw a GlassCatError when no context is specified"
  })
  public buildErrorTest():void {
    let doBuild:Function = function():void {
      let builder:LoggerManagerBuilder = new LoggerManagerBuilder();
      builder.build();
    };
    expect(doBuild).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_CONTEXT when no context is specified"
  })
  public singletonErrorCodeTest():void {
    try {
      let builder:LoggerManagerBuilder = new LoggerManagerBuilder();
      builder.build();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_CONTEXT);
    }
  }
  
  @Test({
    description: "should set the context for this LoggerManagerBuilder instance"
  })
  public contextTest(@Async done:Function):void {
    this.initContext((ctx:GlassCatContext)=>{
      let builder:LoggerManagerBuilder = new LoggerManagerBuilder();
      builder.context(ctx);
      expect((builder as any)._ctx).to.equal(ctx);
      done();
    });
  }

  @Test({
    description: "should return an instance of LoggerManager"
  })
  public buildTest(@Async done:Function):void {
    this.initContext((ctx:GlassCatContext)=>{
      let builder:LoggerManagerBuilder = new LoggerManagerBuilder();
      builder.context(ctx);
      expect(builder.build()).to.be.an.instanceOf(LoggerManager);
      done();
    });
  }
  
  @Test({
    description: "should initialize the new LoggerManager instance"
  })
  public loggerManagerInitTest(@Async done:Function):void {
    this.initContext((ctx:GlassCatContext)=>{
      let builder:LoggerManagerBuilder = new LoggerManagerBuilder();
      builder.context(ctx);
      let logger:Logger = builder.build();
      expect(logger.getLogLevel()).to.equal(ctx.getLogLevel());
      done();
    });
  }

  public initContext(done:(ctx:GlassCatContext)=>void):void {
    let loader:JsonLoader = new DefaultJsonLoader();
    let configParser:BootstrapConfigParser = null;
    let context:GlassCatContext = null;
    let config:any = null;
    loader.load(
      process.cwd() + "/public/cfg/bootstrap.json",
      (data:any)=> {
        configParser = new BootstrapConfigParser();
        config = configParser.parse(data);
        context = new GlassCatContext(config);
        done(context);
      },
      (err:JsonLoaderError)=> {
        assert.fail(null, err, "Exception should not be thrown");
      }
    );
  }
}