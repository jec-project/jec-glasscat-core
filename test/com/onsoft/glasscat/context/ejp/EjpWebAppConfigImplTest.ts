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
import { EjpWebAppConfigImpl } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpWebAppConfigImpl";
import { EjpWebAppConfig } from "jec-glasscat-config";

@TestSuite({
  description: "Test the EjpWebAppConfigImpl class properties"
})
export class EjpWebAppConfigImplTest {

  public config:EjpWebAppConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpWebAppConfigImpl();
  }

  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.config).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'description' property set to 'null'"
  })
  public descriptionTest():void {
    expect(this.config).to.have.property("description", null);
  }
  
  @Test({
    description: "should have a 'version' property set to 'null'"
  })
  public versionTest():void {
    expect(this.config).to.have.property("version", null);
  }
  
  @Test({
    description: "should have a 'author' property set to 'null'"
  })
  public authorTest():void {
    expect(this.config).to.have.property("author", null);
  }
  
  @Test({
    description: "should have a 'contextRoot' property set to 'null'"
  })
  public contextRootTest():void {
    expect(this.config).to.have.property("contextRoot", null);
  }
  
  @Test({
    description: "should have a 'state' property set to 'null'"
  })
  public stateTest():void {
    expect(this.config).to.have.property("state", null);
  }
  
  @Test({
    description: "should have a 'welcomeFile' property set to 'null'"
  })
  public welcomeFileTest():void {
    expect(this.config).to.have.property("welcomeFile", null);
  }
  
  @Test({
    description: "should have a 'jslets' property set to 'null'"
  })
  public jsletsTest():void {
    expect(this.config).to.have.property("jslets", null);
  }
  
  @Test({
    description: "should have a 'bootstrap' property set to 'null'"
  })
  public bootstrapTest():void {
    expect(this.config).to.have.property("bootstrap", null);
  }
  
  @Test({
    description: "should have a 'session' property set to 'null'"
  })
  public sessionTest():void {
    expect(this.config).to.have.property("session", null);
  }
  
  @Test({
    description: "should have a 'resourceMap' property set to 'null'"
  })
  public resourceMapTest():void {
    expect(this.config).to.have.property("resourceMap", null);
  }
  
  @Test({
    description: "should have a 'login' property set to 'null'"
  })
  public loginTest():void {
    expect(this.config).to.have.property("login", null);
  }
  
  @Test({
    description: "should have a 'security' property set to 'null'"
  })
  public securityTest():void {
    expect(this.config).to.have.property("security", null);
  }
}