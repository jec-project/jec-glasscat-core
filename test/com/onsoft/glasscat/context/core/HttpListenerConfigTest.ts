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
import { HttpListenerConfig } from "../../../../../../src/com/onsoft/glasscat/context/core/HttpListenerConfig";

@TestSuite({
  description: "Test the HttpListenerConfig class properties"
})
export class HttpListenerConfigTest {

  public config:HttpListenerConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new HttpListenerConfig();
  }

  @Test({
    description: "should have a 'monitoring' property set to 'null'"
  })
  public monitoringTest():void {
    expect(this.config).to.have.property("monitoring", null);
  }
  
  @Test({
    description: "should have an 'id' property set to 'null'"
  })
  public idTest():void {
    expect(this.config).to.have.property("id", null);
  }
  
  @Test({
    description: "should have a 'port' property set to 'null'"
  })
  public portTest():void {
    expect(this.config).to.have.property("port", null);
  }
  
  @Test({
    description: "should have an 'address' property set to 'null'"
  })
  public addressTest():void {
    expect(this.config).to.have.property("address", null);
  }
  
  @Test({
    description: "should have a 'secured' property set to 'false'"
  })
  public securedTest():void {
    expect(this.config).to.have.property("secured", false);
  }
  
  @Test({
    description: "should have a 'server' property set to 'null'"
  })
  public serverTest():void {
    expect(this.config).to.have.property("server", null);
  }
  
  @Test({
    description: "should have a 'sslPath' property set to 'null'"
  })
  public sslPathTest():void {
    expect(this.config).to.have.property("sslPath", null);
  }
  
  @Test({
    description: "should have a 'domain' property set to 'null'"
  })
  public domainTest():void {
    expect(this.config).to.have.property("domain", null);
  }
  
  @Test({
    description: "should have a 'securityConfig' property set to 'null'"
  })
  public securityConfigTest():void {
    expect(this.config).to.have.property("securityConfig", null);
  }
}