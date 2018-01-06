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

import { TestSuite, Test, BeforeAll, TestSorters, Async } from "jec-juta";
import { expect, assert } from "chai";
import { RealmConnector, SecurityContext, Credentials, UserHashModule } from "jec-exchange";
import { AbstractRealmConnector } from "../../../../../../../src/com/onsoft/glasscat/security/realms/connectors/AbstractRealmConnector";
import { DefaultUserHashModule } from "../../../../../../../src/com/onsoft/glasscat/security/crypto/DefaultUserHashModule";

import { RealmConnectorImpl } from "../../../../../../../utils/test-utils/classes/RealmConnectorImpl";

@TestSuite({
  description: "Test the AbstractRealmConnector class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class AbstractRealmConnectorTest {

  public connector:RealmConnector = null;

  @BeforeAll()
  public initTest():void {
    this.connector = new RealmConnectorImpl();
  }
  
  @Test({
    description: "should return 'null' when no UserHashModule object is defined",
    order: 0
  })
  public getUserHashModuleTest():void {
    expect(this.connector.getUserHashModule()).to.be.null;
  }
  
  @Test({
    description: "should return 'null' when no SecurityContext object is defined",
    order: 1
  })
  public noDefaultSecurityContextTest():void {
    expect(
      (this.connector as RealmConnectorImpl).getSecurityContext()
    ).to.be.null;
  }

  @Test({
    description: "should invoke the error callback function with 'null' as parameter",
    order: 2
  })
  public authenticateTest(@Async done:Function):void {
    this.connector.authenticate(
      ({} as Credentials),
      ()=>{
        assert.fail(null, "authenticated", "Test should fail");
      },
      (error:any)=>{
        done();
        expect(error).to.be.null;
      }
    );
  }
  
  @Test({
    description: "should return the set a UserHashModule instance correctly",
    order: 3
  })
  public setUserHashModuleTest():void {
    let module:UserHashModule = new DefaultUserHashModule();
    this.connector.setUserHashModule(module);
    expect(this.connector.getUserHashModule()).to.equal(module);
  }
}