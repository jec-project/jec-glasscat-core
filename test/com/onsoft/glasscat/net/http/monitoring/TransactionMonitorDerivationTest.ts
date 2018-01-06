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
import { TransactionMonitorDerivation } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/TransactionMonitorDerivation";
import { HttpTransaction } from "../../../../../../../src/com/onsoft/glasscat/net/http/monitoring/HttpTransaction";

@TestSuite({
  description: "Test the TransactionMonitorDerivation class methods"
})
export class TransactionMonitorDerivationTest {

  @Test({
    description: "should do nothing"
  })
  public sendTest():void {
    let derivation:TransactionMonitorDerivation =
                                             new TransactionMonitorDerivation();
    expect(derivation.send(new HttpTransaction(null))).to.be.OK;
  }
  
  @Test({
    description: "should do nothing"
  })
  public sendNullTest():void {
    let derivation:TransactionMonitorDerivation =
                                             new TransactionMonitorDerivation();
    expect(derivation.send(null)).to.be.OK;
  }
}