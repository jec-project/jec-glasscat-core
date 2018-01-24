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
import { SessionOwnerBuilder } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionOwnerBuilder";
import { GlassCatSessionOwner } from "../../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSessionOwner";
import { BasicSecurityRole } from "../../../../../../../src/com/onsoft/glasscat/security/roles/BasicSecurityRole";

import { GlobalGuidGenerator } from "jec-commons";
import { SecurityRole, SessionOwner } from "jec-exchange";

@TestSuite({
  description: "Test the SessionOwnerBuilder class methods"
})
export class SessionOwnerBuilderTest {

  public builder:SessionOwnerBuilder = null;
  public ownerId:string = null;
  public ownerAlias:string = null;
  public ownerRoles:SecurityRole[] = null;

  @BeforeAll()
  public initTest():void {
    this.builder = new SessionOwnerBuilder();
    this.ownerId = GlobalGuidGenerator.getInstance().generate();
    this.ownerAlias = "ownerAlias";
    this.ownerRoles = [new BasicSecurityRole("ownerRole")];
  }

  @Test({
    description: "should return an implementation of the SessionId interface"
  })
  public buildTest():void {
    expect(
      this.builder.build(this.ownerId, this.ownerAlias, this.ownerRoles)
    ).to.be.an.instanceOf(GlassCatSessionOwner);
  }
  
  @Test({
    description: "should return a SessionId object that contains to correct alias"
  })
  public getAliasTest():void {
    let owner:SessionOwner =
             this.builder.build(this.ownerId, this.ownerAlias, this.ownerRoles);
    expect(owner.getAlias()).to.equal(this.ownerAlias);
  }
}