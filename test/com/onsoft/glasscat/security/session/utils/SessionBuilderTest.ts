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
import { SessionBuilder } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionBuilder";
import { GlassCatSession } from "../../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSession";
import { SessionId, SessionOwner, Session } from "jec-exchange";

@TestSuite({
  description: "Test the SessionBuilder class properties"
})
export class SessionBuilderTest {

  public builder:SessionBuilder = null;
  public readonly sessionId:SessionId = ({} as SessionId);
  public readonly sessionOwner:SessionOwner = ({} as SessionOwner);

  @BeforeAll()
  public initTest():void {
    this.builder = new SessionBuilder();
  }

  @Test({
    description: "should return an implementation of the SessionBuilder interface"
  })
  public buildTest():void {
    expect(
      this.builder.buildSession(this.sessionId, this.sessionOwner)
    ).to.be.an.instanceOf(GlassCatSession);
  }
  
  @Test({
    description: "should return the same SessionId object as passed to the constructor function"
  })
  public sessionIdTest():void {
    let session:Session =
                   this.builder.buildSession(this.sessionId, this.sessionOwner);
    expect(session.sessionId).to.equal(this.sessionId);
  }
  
  @Test({
    description: "should return the same SessionOwner object as passed to the constructor function"
  })
  public sessionOwnerTest():void {
    let session:Session =
                   this.builder.buildSession(this.sessionId, this.sessionOwner);
    expect(session.sessionOwner).to.equal(this.sessionOwner);
  }
}