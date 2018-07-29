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

import { TestSuite, Test, TestSorters, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { HttpTransaction } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/HttpTransaction";

@TestSuite({
  description: "Test the HttpTransaction class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class HttpTransactionTest {

  public transaction:HttpTransaction = null;
  public static readonly URL:string = "my/url/path";

  @BeforeAll()
  public initTest():void {
    this.transaction = new HttpTransaction(HttpTransactionTest.URL);
  }
  
  @Test({
    description: "should return a number",
    order: 0
  })
  public getInitialTimestampTest():void {
    expect(this.transaction.getInitialTimestamp()).to.be.a("number");
  }
  
  @Test({
    description: "should be different from '0'",
    order: 1
  })
  public getInitialTimestampNotZeroTest():void {
    expect(this.transaction.getInitialTimestamp()).to.not.equal(0);
  }
  
  @Test({
    description: "should return '0'",
    order: 2
  })
  public getFinalTimestampTest():void {
    expect(this.transaction.getFinalTimestamp()).to.equal(0);
  }
  
  @Test({
    description: "should return the same URL as passed to the constructor function",
    order: 3
  })
  public getUrlTest():void {
    expect(this.transaction.getUrl()).to.equal(HttpTransactionTest.URL);
  }
  
  @Test({
    description: "should return a GUID",
    order: 4
  })
  public geIdTest():void {
    expect(this.transaction.getId()).to.be.a("string");
  }
  
  @Test({
    description: "should return 'false'",
    order: 5
  })
  public isClosedTest():void {
    expect(this.transaction.isClosed()).to.be.false;
  }
  
  @Test({
    description: "should return 'true'",
    order: 6
  })
  public getSuccessTest():void {
    expect(this.transaction.getSuccess()).to.be.true;
  }
  
  @Test({
    description: "should return close the transaction monotiring process for the specified URL",
    order: 7
  })
  public closeTest():void {
    expect(this.transaction.close(true)).to.be.undefined;
  }
  
  @Test({
    description: "should be different from '0'",
    order: 8
  })
  public getFinalTimestampClosedTest():void {
    expect(this.transaction.getFinalTimestamp()).to.not.equal(0);
  }
  
  @Test({
    description: "should return 'true'",
    order: 9
  })
  public isClosedTrueTest():void {
    expect(this.transaction.isClosed()).to.be.true;
  }
  
  @Test({
    description: "should return 'true'",
    order: 10
  })
  public getSuccessTrueTest():void {
    expect(this.transaction.getSuccess()).to.be.true;
  }
  
  @Test({
    description: "should return 'false'",
    order: 11
  })
  public getSuccessFalseTest():void {
    this.transaction.close(false);
    expect(this.transaction.getSuccess()).to.be.false;
  }
}