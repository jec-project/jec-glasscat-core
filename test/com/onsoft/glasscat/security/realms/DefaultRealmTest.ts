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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { Realm, RealmType } from "jec-exchange";
import { DefaultRealm } from "../../../../../../src/com/onsoft/glasscat/security/realms/DefaultRealm";
import { AdminFileRealmConnector } from "../../../../../../src/com/onsoft/glasscat/security/realms/connectors/AdminFileRealmConnector";
import { MappedPathUtil } from "../../../../../../src/com/onsoft/glasscat/util/paths/MappedPathUtil";

import * as utils from "../../../../../../utils/test-utils/utilities/DefaultRealmTestUtils";

@TestSuite({
  description: "Test the DefaultRealm class methods: test is incomplete since we cannot test RealmConnector implementations",
  disabled: true
})
export class DefaultRealmTest {

  @BeforeAll()
  public initTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
  }

  @AfterAll()
  public resetTest():void {
    MappedPathUtil.getInstance().init(null);
  }

  @Test({
    description: "should return the same realm type as defined in the context"
  })
  public getRealmTypeADMIN_FILETest():void {
    let realm:Realm = new DefaultRealm(
      utils.buildLoginStrategyConfig(RealmType.ADMIN_FILE)
    );
    console.log(realm)
    //expect(realm.getRealmType()).to.equal(RealmType.ADMIN_FILE);
  }
  
  @Test({
    description: "should return an instance of the AdminFileRealmConnector class"
  })
  public getRealmConnectorADMIN_FILETest():void {
    /*let realm:Realm = new DefaultRealm(
      utils.buildLoginStrategyConfig(RealmType.ADMIN_FILE)
    );
    expect(
      realm.getRealmConnector()
    ).to.be.an.instanceOf(AdminFileRealmConnector);*/
  }
  
  @Test({
    description: "authenticate method test is ignored since we cannot test RealmConnector implementations",
    disabled: true
  })
  public authenticateTest():void { }
}