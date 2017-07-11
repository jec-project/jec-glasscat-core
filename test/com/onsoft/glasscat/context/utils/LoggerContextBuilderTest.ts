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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { LoggerContextBuilder } from "../../../../../../src/com/onsoft/glasscat/context/utils/LoggerContextBuilder";
import { LoggerContext } from "../../../../../../src/com/onsoft/glasscat/context/LoggerContext";
import { LoggerFactory } from "../../../../../../src/com/onsoft/glasscat/util/logging/LoggerFactory";
import { LogLevel } from "jec-commons";

@TestSuite({
  description: "Test the LoggerContextBuilder class methods"
})
export class LoggerContextBuilderTest {

  public builder:LoggerContextBuilder = null;
  public name:string = null;
  public factory:LoggerFactory = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new LoggerContextBuilder();
    this.name = "loggerName";
    this.factory = ({} as LoggerFactory);
  }
  
  @Test({
    description: "should return a LoggerContext instance"
  })
  public buildContextTest():void {
    expect(
      this.builder.buildContext(
        this.name,
        this.factory,
        LogLevel.DEBUG
      )
    ).to.be.an.instanceOf(LoggerContext);
  }
  
  @Test({
    description: "should return the same name as passed to the constructor function"
  })
  public nameTest():void {
    let context:LoggerContext =
             this.builder.buildContext(this.name, this.factory, LogLevel.DEBUG);
    expect(context.name).to.equal(this.name);
  }
  
  @Test({
    description: "should return the same factory as passed to the constructor function"
  })
  public factoryTest():void {
    let context:LoggerContext =
             this.builder.buildContext(this.name, this.factory, LogLevel.DEBUG);
    expect(context.factory).to.equal(this.factory);
  }
  
  @Test({
    description: "should return the same logLevel as passed to the constructor function"
  })
  public logLevelTest():void {
    let context:LoggerContext =
             this.builder.buildContext(this.name, this.factory, LogLevel.DEBUG);
    expect(context.logLevel).to.equal(LogLevel.DEBUG);
  }
}