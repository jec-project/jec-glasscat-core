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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import * as sinon from "sinon";
import { LoggerManager } from "../../../../../../src/com/onsoft/glasscat/util/logging/LoggerManager";
import { Logger, LogLevel, ConsoleLogger } from "jec-commons";

@TestSuite({
  description: "Test the LoggerManager class log methods when log level is LogLevel.WARN"
})
export class LoggerManagerWARNTest {

  public logger:Logger = null;

  @BeforeAll()
  public initTest():void {
    const manager:LoggerManager =
                                 (LoggerManager.getInstance() as LoggerManager);
    this.logger = new ConsoleLogger();
    manager.init([this.logger], LogLevel.WARN);
  }
  
  @AfterAll()
  public resetTest():void {
    const manager:LoggerManager =
                                 (LoggerManager.getInstance() as LoggerManager);
    manager.init(null, LogLevel.OFF);
    this.logger = null;
    sinon.restore();
  }
  
  @Test({
    description: "should not invoke the debug() method on the ConsoleLogger instance"
  })
  public debugTest():void {
    const spy:any = sinon.spy(this.logger, "debug");
    LoggerManager.getInstance().debug("debug called");
    sinon.assert.calledOnce(spy);
  }
  
  @Test({
    description: "should not invoke the error() method on the ConsoleLogger instance"
  })
  public errorTest():void {
    const spy:any = sinon.spy(this.logger, "error");
    LoggerManager.getInstance().error("error called");
    sinon.assert.calledOnce(spy);
  }
  
  @Test({
    description: "should not invoke the info() method on the ConsoleLogger instance"
  })
  public infoTest():void {
    const spy:any = sinon.spy(this.logger, "info");
    LoggerManager.getInstance().info("info called");
    sinon.assert.calledOnce(spy);
  }
  
  @Test({
    description: "should not invoke the trace() method on the ConsoleLogger instance"
  })
  public traceTest():void {
    const spy:any = sinon.spy(this.logger, "trace");
    LoggerManager.getInstance().trace("trace called");
    sinon.assert.calledOnce(spy);
  }
  
  @Test({
    description: "should not invoke the warn() method on the ConsoleLogger instance"
  })
  public warnTest():void {
    const spy:any = sinon.spy(this.logger, "warn");
    LoggerManager.getInstance().warn("warn called");
    sinon.assert.calledOnce(spy);
  }
}