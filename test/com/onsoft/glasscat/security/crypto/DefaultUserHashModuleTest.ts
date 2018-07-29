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

import { TestSuite, Test, TestSorters, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { DefaultUserHashModule } from "../../../../../../src/com/onsoft/glasscat/security/crypto/DefaultUserHashModule";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/DefaultUserHashModuleTestUtils";

@TestSuite({
  description: "Test the DefaultUserHashModule class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class DefaultUserHashModuleTest {

  public module:DefaultUserHashModule = null;

  @BeforeAll()
  public initTest():void {
    this.module = new DefaultUserHashModule();
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 0
  })
  public decryptAliasErrorTest():void {
    try {
      this.module.decryptAlias(utils.ALIAS);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 1
  })
  public decryptRolesErrorTest():void {
    try {
      this.module.decryptRoles(utils.ROLES_STRING);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 2
  })
  public encryptAliasErrorTest():void {
    try {
      this.module.encryptAlias(utils.ALIAS);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 3
  })
  public encryptPasswordErrorTest():void {
    try {
      this.module.encryptPassword(utils.PASSWORD);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 4
  })
  public encryptRolesErrorTest():void {
    try {
      this.module.encryptRoles(utils.ROLES);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }
  
  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.INVALID_ENCRYPTION_KEY",
    order: 5
  })
  public encryptUserErrorTest():void {
    try {
      this.module.encryptUser(utils.ALIAS, utils.PASSWORD, utils.ROLES);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }
  
  @Test({
    description: "should initialize the private key",
    order: 6
  })
  public setPrivateKeyTest():void {
    expect(this.module.setPrivateKey(utils.KEY)).to.be.undefined;
  }

  @Test({
    description: "should encrypt the specified alias",
    order: 7
  })
  public encryptAliasTest():void {
    expect(this.module.encryptAlias(utils.ALIAS)).to.not.be.null;
  }

  @Test({
    description: "should encrypt the specified alias",
    order: 8
  })
  public decryptAliasTest():void {
    let encrypted:string = this.module.encryptAlias(utils.ALIAS);
    expect(this.module.decryptAlias(encrypted)).to.equal(utils.ALIAS);
  }

   @Test({
    description: "should encrypt the specified password",
    order: 9
  })
  public encryptPasswordTest():void {
    expect(this.module.encryptPassword(utils.PASSWORD)).to.not.be.null;
  }

  @Test({
    description: "should encrypt the specified user information",
    order: 10
  })
  public encryptUserTest():void {
    expect(
      this.module.encryptUser(utils.ALIAS, utils.PASSWORD, utils.ROLES)
    ).to.not.be.null;
  }

  @Test({
    description: "should encrypt the specified roles",
    order: 11
  })
  public encryptRolesTest():void {
    expect(this.module.encryptRoles(utils.ROLES)).to.not.be.null;
  }

  @Test({
    description: "should decrypt the specified roles",
    order: 12
  })
  public decryptRolesTest():void {
    let encrypted:string = this.module.encryptRoles(utils.ROLES);
    let decrypted:string[] = this.module.decryptRoles(encrypted);
    expect(decrypted.join()).to.equal(utils.ROLES.join());
  }
}