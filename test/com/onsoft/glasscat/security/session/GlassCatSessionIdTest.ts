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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { GlassCatSessionId } from "../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";

@TestSuite({
  description: "Test the GlassCatSessionId class methods"
})
export class GlassCatSessionIdTest {

  public sessionid:GlassCatSessionId = null;
  public static readonly GUID:string = "11484413-3af2-4b28-a915-6eb98545f21f";

  @BeforeAll()
  public initTest():void {
    this.sessionid = new GlassCatSessionId(GlassCatSessionIdTest.GUID);
  }

  @Test({
    description: "should same ID as passed to the constructor function"
  })
  public getIdTest():void {
    expect(this.sessionid.getId()).to.equal(GlassCatSessionIdTest.GUID);
  }
  
  @Test({
    description: "should have a 'authurl' property set to 'null'"
  })
  public authurlTest():void {
    expect(this.sessionid).to.have.property("authurl", null);
  }
}