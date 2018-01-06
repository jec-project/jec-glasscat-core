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
import { GlassCatSession } from "../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSession";

@TestSuite({
  description: "Test the GlassCatSessionTest class properties"
})
export class GlassCatSessionTest {

  public session:GlassCatSession = null;

  @BeforeAll()
  public initTest():void {
    this.session = new GlassCatSession();
  }

  @Test({
    description: "should have a 'sessionId' property set to 'null'"
  })
  public sessionIdTest():void {
    expect(this.session).to.have.property("sessionId", null);
  }
  
  @Test({
    description: "should have a 'sessionOwner' property set to 'null'"
  })
  public sessionOwnerTest():void {
    expect(this.session).to.have.property("sessionOwner", null);
  }
  
  @Test({
    description: "should have a 'expires' property set to '0'"
  })
  public expiresTest():void {
    expect(this.session).to.have.property("expires", 0);
  }
  
  @Test({
    description: "should have a 'data' property set to 'null'"
  })
  public dataTest():void {
    expect(this.session).to.have.property("data", null);
  }
}