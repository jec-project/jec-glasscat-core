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
import { EjpStaticResourcesConfig } from "../../../../../../src/com/onsoft/glasscat/context/ejp/EjpStaticResourcesConfig";

@TestSuite({
  description: "Test the EjpStaticResourcesConfig class properties"
})
export class EjpStaticResourcesConfigTest {

  public config:EjpStaticResourcesConfig = null;

  @BeforeAll()
  public initTest():void {
    this.config = new EjpStaticResourcesConfig();
  }

  @Test({
    description: "should have a 'urlPattern' property set to 'null'"
  })
  public urlPatternTest():void {
    expect(this.config).to.have.property("urlPattern", null);
  }
  
  @Test({
    description: "should have a 'cacheControlPolicy' property set to 'null'"
  })
  public cacheControlPolicyTest():void {
    expect(this.config).to.have.property("cacheControlPolicy", null);
  }
}