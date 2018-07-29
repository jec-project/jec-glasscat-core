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
import { DomainConfigParser } from "../../../../../../../src/com/onsoft/glasscat/context/domains/utils/DomainConfigParser";
import { Domain } from "jec-glasscat-config";
import { DomainConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/domains/DomainConfigImpl";
import { DomainImpl } from "../../../../../../../src/com/onsoft/glasscat/context/domains/DomainImpl";
import { DomainConnectorConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/domains/DomainConnectorConfigImpl";

import * as configUtils from "../../../../../../../utils/test-utils/utilities/DomainConfigurationUtils";
import * as utils from "../../../../../../../utils/test-utils/utilities/DomainConfigParserTestUtils";

@TestSuite({
  description: "Test the DomainConfigParser class template methods"
})
export class DomainConfigParserTest {

  private parser:DomainConfigParser = null;

  @BeforeAll()
  public initTest():void {
    this.parser = new DomainConfigParser();
  }

  @Test({
    description: "should throw an error when the object to parse is 'null'"
  })
  public parseFailNullTest():void {
    const doParse:Function = function():void {
      this.parser.parse(null);
    }
    expect(doParse).to.throw(Error);
  }
  
  @Test({
    description: "should throw an error when the object to parse is not valid"
  })
  public parseFailInvalidTest():void {
    const doParse:Function = function():void {
      this.parser.parse(utils.INVALID_DOMAINS_CONFIG);
    }
    expect(doParse).to.throw(Error);
  }
  
  @Test({
    description: "should return a DomainConfig instance"
  })
  public parseDomainConfigTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    expect(result).to.be.an.instanceOf(DomainConfigImpl);
  }
  
  @Test({
    description: "should return an object with a valid 'domains' property"
  })
  public parseValidTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    expect(result.domains).to.have.lengthOf(1);
  }

  @Test({
    description: "should return an object with a Domain instance"
  })
  public parseDomainTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    expect(result.domains[0]).to.be.an.instanceOf(DomainImpl);
  }
    
  @Test({
    description: "should return an object with a valid 'name' property"
  })
  public parseNameTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.name).to.equal(configUtils.CONFIG_NAME);
  }
  
  @Test({
    description: "should return an object with a valid 'host' property"
  })
  public parseHostTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.host).to.equal(configUtils.CONFIG_HOST);
  }
  
  @Test({
    description: "should return an object with a valid 'target' property"
  })
  public parseTargetTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.target).to.equal(configUtils.CONFIG_TARGET);
  }
  
  @Test({
    description: "should return an object with a valid 'connector' property"
  })
  public parseDomainConnectorConfigTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.connector).to.be.an.instanceOf(DomainConnectorConfigImpl);
  }
  
  @Test({
    description: "should return an object with a valid 'type' property"
  })
  public parseTypeTest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.connector.type).to.equal(configUtils.CONFIG_TYPE);
  }
  
  @Test({
    description: "should return an object with a valid 'server' property"
  })
  public parseServerest():void {
    const result:any = this.parser.parse(utils.DOMAINS_CONFIG);
    const config:Domain = result.domains[0];
    expect(config.connector.server).to.equal(configUtils.CONFIG_SERVER);
  }
}