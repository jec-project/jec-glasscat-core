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

import { TestSuite, Test, Before, After } from "jec-juta";
import { expect } from "chai";
import { DomainContext } from "../../../../../src/com/onsoft/glasscat/context/DomainContext";
import { Domain } from "../../../../../src/com/onsoft/glasscat/context/domains/Domain";

@TestSuite({
  description: "Test the DomainContext class methods"
})
export class DomainContextTest {

  public context:DomainContext = null;

  @Before()
  public initTest():void {
    this.context = new DomainContext();
  }

  @After()
  public resetTest():void {
    this.context = null;
  }

  @Test({
    description: "should return an empty collection"
  })
  public getDomainListTest():void {
    expect(this.context.getDomainList()).to.have.a.lengthOf(0);
  }
  
  @Test({
    description: "should add the specified domain  to the context"
  })
  public addDomainTest():void {
    let domain:Domain = new Domain();
    this.context.addDomain(domain);
    expect(this.context.getDomainList()[0]).to.equal(domain);
  }
}