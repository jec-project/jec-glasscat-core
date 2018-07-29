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
import { expect } from "chai";
import { DefaultHttpListener } from "../../../../../../../src/com/onsoft/glasscat/services/http/listeners/DefaultHttpListener";
import { TransactionMonitorDerivation } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionMonitorDerivation";

import * as utils from "../../../../../../../utils/test-utils/utilities/ListenerFactoryTestUtils";

@TestSuite({
  description: "Test the DefaultHttpListener class methods"
})
export class DefaultHttpListenerTest {

  public listener:DefaultHttpListener = null;

  @BeforeAll()
  public initTest():void {
    this.listener = new DefaultHttpListener(utils.buildConfig());
  }

  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public enableMonitoringTest():void {
    expect(this.listener.enableMonitoring()).to.equal(utils.MONITORING.enabled);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public addressTest():void {
    expect(this.listener.getAdress()).to.equal(utils.ADDRESS);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getIdTest():void {
    expect(this.listener.getId()).to.equal(utils.ID);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getPortTest():void {
    expect(this.listener.getPort()).to.equal(utils.PORT);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getProtocolTest():void {
    expect(this.listener.getProtocol()).to.equal(utils.PROTOCOL);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getSecuredTest():void {
    expect(this.listener.getSecured()).to.equal(utils.SECURED);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getSecurityConfigTest():void {
    expect(this.listener.getSecurityConfig()).to.be.null;
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getServerTest():void {
    expect(this.listener.getServer()).to.equal(utils.SERVER);
  }
  
  @Test({
    description: "should return the same value as specified in the configuration context"
  })
  public getTransactionMonitorTest():void {
    expect(
      this.listener.getTransactionMonitor()
    ).to.be.an.instanceOf(TransactionMonitorDerivation);
  }
}