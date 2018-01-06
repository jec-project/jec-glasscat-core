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
import { DomainConfig } from "../../../../../../src/com/onsoft/glasscat/context/domains/DomainConfig";

@TestSuite({
  description: "Test the DomainConfig class properties"
})
export class DomainConfigTest {

  public config:DomainConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new DomainConfig();
  }

  @Test({
    description: "should have a 'domains' property set to 'null'"
  })
  public domainsTest():void {
    expect(this.config).to.have.property("domains", null);
  }
}