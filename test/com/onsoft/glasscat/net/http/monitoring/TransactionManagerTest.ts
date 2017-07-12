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

import { TestSuite, Test, TestSorters, BeforeAll } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { TransactionManager } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionManager";
import { TransactionMonitor } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionMonitor";
import { TransactionMonitorDerivation } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionMonitorDerivation";
import * as express from "express";

// Chai declarations:
const expect = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the TransactionManager class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class TransactionManagerTest {

  public manager:TransactionManager = null;
  public request:express.Request = null;
  public response:express.Response = null
  public monitor:TransactionMonitor = null;

  @BeforeAll()
  public initTest():void {
    this.manager = new TransactionManager();
    this.monitor = new TransactionMonitorDerivation();
    this.request = ( {  originalUrl: "my/url/path" } as express.Request );
    this.response = ( { locals: { transactionId: null } } as express.Response );
  }
  
  @Test({
    description: "should return a 'null'",
    order: 0
  })
  public getTransactionMonitorTest():void {
    expect(this.manager.getTransactionMonitor()).to.be.null;
  }
  
  @Test({
    description: "should add the specified monitor to the TransactionManager object",
    order: 1
  })
  public setTransactionMonitorTest():void {
    this.manager.setTransactionMonitor(this.monitor);
    expect(this.manager.getTransactionMonitor()).to.equal(this.monitor);
  }
  
  @Test({
    description: "should open the transaction for the specified request",
    order: 2
  })
  public openTransactionTest():void {
    expect(this.response.locals.transactionId).to.be.null;
    this.manager.openTransaction(this.request, this.response);
    expect(this.response.locals.transactionId).to.be.a("string");
  }
  
  @Test({
    description: "should close the transaction an send the HttpTransaction reference to the monitor",
    order: 3
  })
  public closeTransactionTest():void {
    let spy:any = chai.spy.on(this.monitor, "send");
    this.manager.closeTransaction(this.request, this.response);
    expect(spy).to.have.been.called();
  }
}