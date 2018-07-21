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
import { SessionStorageSolver } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionStorageSolver";
import { LocalSessionStorage } from "../../../../../../../src/com/onsoft/glasscat/security/session/connectors/LocalSessionStorage";
import { SessionStorageType } from "jec-exchange";
import { EjpSessionConfig } from "jec-glasscat-config";

@TestSuite({
  description: "Test the SessionStorageSolver class methods"
})
export class SessionStorageSolverTest {

  public solver:SessionStorageSolver = null;

  @BeforeAll()
  public initTest():void {
    this.solver = new SessionStorageSolver();
  }

  @Test({
    description: "should return an instance of the LocalSessionStorage class when no type is defined in the context"
  })
  public getSessionStorageUndefinedTest():void {
    expect(
      this.solver.getSessionStorage(({} as EjpSessionConfig))
    ).to.be.an.instanceOf(LocalSessionStorage);
  }
  
  @Test({
    description: "should return an instance of the LocalSessionStorage class when type in context is 'SessionStorageType.LOCAL'"
  })
  public getSessionStorageLocalTest():void {
    expect(
      this.solver.getSessionStorage(({ 
            storage: SessionStorageType.LOCAL,
            errorUrl: null,
            maxAge: 3600
      } as EjpSessionConfig))
    ).to.be.an.instanceOf(LocalSessionStorage);
  }
  
  @Test({
    description: "'SessionStorageType.DISTANT' type is not supported yet",
    disabled: true
  })
  public getSessionStorageDistantTest():void {}
  
  @Test({
    description: "'SessionStorageType.CUSTOM' type is not supported yet",
    disabled: true
  })
  public getSessionStorageCustomTest():void {}
}