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

import { TestSuite, Test, TestSorters } from "jec-juta";
import { expect } from "chai";
import { LoggerManager } from "../../../../../../src/com/onsoft/glasscat/util/logging/LoggerManager";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { Logger, LogLevel } from "jec-commons";

import * as utils from "../../../../../../utils/test-utils/utilities/LoggerManagerTestUtils"; 

@TestSuite({
  description: "Test the LoggerManager class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class LoggerManagerTest {

  @Test({
    description: "should throw a GlassCatError error when calling the constructor function",
    order: 0
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new LoggerManager();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.SINGLETON_ERROR when calling the constructor function",
    order: 1
  })
  public singletonErrorCodeTest():void {
    try {
      new LoggerManager();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.SINGLETON_ERROR);
    }
  }

  @Test({
    description: "should return a LoggerManager instance",
    order: 2
  })
  public getInstanceTest():void {
    const manager:Logger = LoggerManager.getInstance();
    expect(manager).to.be.an.instanceOf(LoggerManager);
  }
  
  @Test({
    description: "should return a singleton reference",
    order: 3
  })
  public validSingletonTest():void {
    const manager1:Logger = LoggerManager.getInstance();
    const manager2:Logger = LoggerManager.getInstance();
    expect(manager1).to.equal(manager2);
  }
  
  @Test({
    description: "should return 'false' when the singleton is not initialized",
    order: 4
  })
  public isInitializedFalseTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.isInitialized()).to.be.false;
  }
  
  @Test({
    description: "should initialize the singleton",
    order: 5
  })
  public initTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    const loggers:Logger[] = new Array<Logger>();
    manager.init(loggers, LogLevel.INFO);
  }

  @Test({
    description: "should return 'true' when the singleton is initialized",
    order: 6
  })
  public isInitializedTrueTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.isInitialized()).to.be.true;
  }
  
  @Test({
    description: "should return 'LoggerManager' when the singleton is initialized",
    order: 7
  })
  public getNameTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.getName()).to.equal("LoggerManager");
  }

  @Test({
    description: "should return the same log level as used to initialize the singleton",
    order: 8
  })
  public getLogLevelTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.getLogLevel()).to.equal(LogLevel.INFO);
  }

  @Test({
    description: "should reset the singleton",
    order: 9
  })
  public resetTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    manager.init(null, LogLevel.INFO);
  }

  @Test({
    description: "should return 'false' when the singleton has been reseted",
    order: 10
  })
  public isInitializedResetTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.isInitialized()).to.be.false;
  }
  
  @Test({
    description: "should return 'null' when the singleton has been reseted",
    order: 11
  })
  public getNameResetTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.getName()).to.be.null;
  }

  @Test({
    description: "should return 'null' when the singleton has been reseted",
    order: 10
  })
  public getLogLevelResetTest():void {
    const manager:LoggerManager = 
                                 (LoggerManager.getInstance() as LoggerManager);
    expect(manager.getLogLevel()).to.be.null;
  }
  
  @Test({
    description: "should not set the log level",
    order: 11
  })
  public setlogLevelTest():void {
    const manager:Logger = LoggerManager.getInstance();
    manager.setLogLevel(LogLevel.ERROR);
    expect(manager.getLogLevel()).not.to.equal(LogLevel.ERROR);
  }

  @Test({
    description: "should not set the name",
    order: 12
  })
  public setNameTest():void {
    const manager:Logger = LoggerManager.getInstance();
    manager.setName(utils.CUSTOM_NAME);
    expect(manager.getLogLevel()).not.to.equal(utils.CUSTOM_NAME);
  }
}