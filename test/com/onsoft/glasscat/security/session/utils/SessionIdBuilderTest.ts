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
import { SessionIdBuilder } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionIdBuilder";
import { GlassCatSessionId } from "../../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";
import { SessionId } from "jec-exchange";
import { GuidGenerator, GuidGeneratorBase } from "jec-commons";

@TestSuite({
  description: "Test the SessionIdBuilder class properties"
})
export class SessionIdBuilderTest {

  public builder:SessionIdBuilder = null;
  public guidGen:GuidGenerator = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new SessionIdBuilder();
    this.guidGen = new GuidGeneratorBase();
  }

  @Test({
    description: "should return an implementation of the SessionId interface"
  })
  public buildTest():void {
    expect(
      this.builder.buildSessionId(this.guidGen.generate())
    ).to.be.an.instanceOf(GlassCatSessionId);
  }
  
  @Test({
    description: "should return the same GUID as  defied by the SessionId object as passed to the constructor function"
  })
  public getIdTest():void {
    let guid:string = this.guidGen.generate();
    let session:SessionId = this.builder.buildSessionId(guid);
    expect(session.getId()).to.equal(guid);
  }
}