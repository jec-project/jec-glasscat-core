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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { HttpMonitoring } from "../../../../../../../src/com/onsoft/glasscat/services/http/listeners/HttpMonitoring";
import { TransactionMonitorDerivation } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionMonitorDerivation";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { ConsoleTransactionMonitor } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/ConsoleTransactionMonitor";
import { HttpMonitoringConfig } from "jec-glasscat-config";

import * as utils from "../../../../../../../utils/test-utils/utilities/HttpMonitoringTestUtils";

@TestSuite({
  description: "Test the HttpMonitoring class methods"
})
export class HttpMonitoringTest {

  @Test({
    description: "should throw a GlassCatError exception"
  })
  public createErrorTest():void {
    const createMonitor:Function = function():void {
      new HttpMonitoring(null);
    };
    expect(createMonitor.bind(this)).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError exception of type of 'GlassCatErrorCode.INVALID_CONTEXT'"
  })
  public createErrorCodeTest():void {
    try {
      new HttpMonitoring(null);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_CONTEXT);
    }
  }

  @Test({
    description: "should return 'false' when the configuration 'enabled' property is 'false'"
  })
  public enableMonitoringFalseTest():void {
    const monitor:HttpMonitoring = new HttpMonitoring(utils.buildConfig(false));
    expect(monitor.enableMonitoring()).to.be.false;
  }
  
  @Test({
    description: "should return 'null' when the configuration 'enabled' property is 'false'"
  })
  public getTransactionMonitorNullTest():void {
    const monitor:HttpMonitoring = new HttpMonitoring(utils.buildConfig(false));
    expect(monitor.getTransactionMonitor()).to.be.null;
  }
  
  @Test({
    description: "should return 'true' when the configuration 'enabled' property is 'true'"
  })
  public enableMonitoringTrueTest():void {
    const monitor:HttpMonitoring = new HttpMonitoring(utils.buildConfig(true));
    expect(monitor.enableMonitoring()).to.be.true;
  }
  
  @Test({
    description: "should return an instance of the TransactionMonitorDerivation class"
  })
  public getTransactionMonitorDefaultTest():void {
    const monitor:HttpMonitoring = new HttpMonitoring(utils.buildConfig(true));
    expect(
      monitor.getTransactionMonitor()
    ).to.be.an.instanceOf(TransactionMonitorDerivation);
  }
  
  @Test({
    description: "should return an instance of the specified monitoring class class"
  })
  public getTransactionMonitorTest():void {
    const config:HttpMonitoringConfig = utils.buildConfig(true);
    config.factory = utils.FACTORY;
    const monitor:HttpMonitoring = new HttpMonitoring(config);
    expect(
      monitor.getTransactionMonitor()
    ).to.be.an.instanceOf(ConsoleTransactionMonitor);
  }
}