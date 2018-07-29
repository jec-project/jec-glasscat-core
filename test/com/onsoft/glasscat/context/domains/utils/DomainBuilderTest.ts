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
import { DomainBuilder } from "../../../../../../../src/com/onsoft/glasscat/context/domains/utils/DomainBuilder";
import { Domain } from "jec-glasscat-config";
import { DomainConnectorConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/domains/DomainConnectorConfigImpl";

import * as utils from "../../../../../../../utils/test-utils/utilities/DomainConfigurationUtils";

@TestSuite({
  description: "Test the DomainBuilder class methods"
})
export class DomainBuilderTest {

  public builder:DomainBuilder = null;
  public result:Domain = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new DomainBuilder();
    this.result = this.builder.buildDomain(utils.CONFIG);
  }

  @Test({
    description: "should define a 'name' property correctly set"
  })
  public buildNameTest():void {
    expect(this.result).to.have.property("name", utils.CONFIG_NAME);
  }
  
  @Test({
    description: "should define a 'host' property correctly set"
  })
  public buildHostTest():void {
    expect(this.result).to.have.property("host", utils.CONFIG_HOST);
  }
  
  @Test({
    description: "should define a 'target' property correctly set"
  })
  public buildTargetTest():void {
    expect(this.result).to.have.property("target", utils.CONFIG_TARGET);
  }
  
  @Test({
    description: "should define a 'connector' property of type of DomainConnectorConfig"
  })
  public buildConnectorTest():void {
    expect(
      this.result.connector
    ).to.be.an.instanceOf(DomainConnectorConfigImpl);
  }
  
  @Test({
    description: "should define a 'connector.server' property correctly set"
  })
  public buildConnectorServerTest():void {
    expect(
      this.result.connector
    ).to.have.property("server", utils.CONFIG_SERVER);
  }
  
  @Test({
    description: "should define a 'connector.type' property correctly set"
  })
  public buildConnectorTypeTest():void {
    expect(this.result.connector).to.have.property("type", utils.CONFIG_TYPE);
  }
}