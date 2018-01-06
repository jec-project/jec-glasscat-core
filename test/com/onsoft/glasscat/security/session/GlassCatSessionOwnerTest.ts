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
import { GlassCatSessionOwner } from "../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSessionOwner";

import * as utils from "../../../../../../utils/test-utils/utilities/GlassCatSessionOwnerTestUtils";

@TestSuite({
  description: "Test the GlassCatSessionOwner class methods"
})
export class GlassCatSessionOwnerTest {

  public owner:GlassCatSessionOwner = null;

  @BeforeAll()
  public initTest():void {
    this.owner = new GlassCatSessionOwner(utils.ID, utils.ALIAS, utils.ROLES);
  }

  @Test({
    description: "should same alias as passed to the constructor function"
  })
  public getAliasTest():void {
    expect(this.owner.getAlias()).to.equal(utils.ALIAS);
  }
  
  @Test({
    description: "should 'false' when the specified constraint is not granted"
  })
  public isGrantedFalseTest():void {
    expect(this.owner.isGranted(utils.buildNotGrantedConstraint())).to.be.false;
  }
  
  @Test({
    description: "should 'true' when the specified constraint not granted"
  })
  public isGrantedTest():void {
    expect(this.owner.isGranted(utils.buildGrantedConstraint())).to.be.true;
  }
}