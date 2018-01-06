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

import { TestSuite, Test, BeforeAll, Async, AfterAll } from "jec-juta";
import { expect, assert } from "chai";
import { Credentials, AuthenticationError } from "jec-exchange";
import { AdminFileRealmConnector } from "../../../../../../../src/com/onsoft/glasscat/security/realms/connectors/AdminFileRealmConnector";
import { MappedPathUtil } from "../../../../../../../src/com/onsoft/glasscat/util/paths/MappedPathUtil";

import * as utils from "../../../../../../../utils/test-utils/utilities/AdminFileRealmConnectorTesttUtils";

@TestSuite({
  description: "Test the AdminFileRealmConnector class methods: got some trouble with this test",
  disabled: true
})
export class AdminFileRealmConnectorTest {

  public connector:AdminFileRealmConnector = null;

  @BeforeAll()
  public initTest():void {
    MappedPathUtil.getInstance().init(utils.CONTEXTROOT);
    this.connector = new AdminFileRealmConnector();
  }

  @AfterAll()
  public resetTest():void {
    MappedPathUtil.getInstance().init(null);
    this.connector = null;
  }

  @Test({
    description: "should invoke the error callback function with an AuthenticationError object as parameter",
  })
  public authenticateErrorTest(@Async done:Function):void {
    this.connector.authenticate(
      utils.buildBadCredentials(),
      ()=>{
        assert.fail(null, "authenticated", "Test should fail");
      },
      (error:AuthenticationError)=>{
        console.log(error)
        //expect(error).to.not.be.null;
        done();
      }
    );
  }
}