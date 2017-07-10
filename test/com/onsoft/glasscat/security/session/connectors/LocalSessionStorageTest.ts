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

import { TestSuite, Test, BeforeAll, TestSorters, Async, AfterAll } from "jec-juta";
import { expect, assert } from "chai";
import { LocalSessionStorage } from "../../../../../../../src/com/onsoft/glasscat/security/session/connectors/LocalSessionStorage";

import * as utils from "../../../../../../../utils/test-utils/utilities/LocalSessionStorageTestUtils"; 
import { SessionError, Session, SessionErrorType } from "jec-exchange";

@TestSuite({
  description: "Test the LocalSessionStorage class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class LocalSessionStorageTest {

  public storage:LocalSessionStorage = null;

  @BeforeAll()
  public initTest():void {
    this.storage = new LocalSessionStorage();
  }

  @AfterAll()
  public resetTest():void {
    this.storage = null;
  }

  @Test({
    description: "should invoke the callback function with no error",
    order: 0
  })
  public addVolatileSessionTest(@Async done:Function):void {
    this.storage.add(
      utils.VOLATILE_SESSION,
      (error:SessionError)=> {
        expect(error).to.be.undefined;
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the error callback function with the type of SessionErrorType.INVALID_SESSION_ID",
    order: 1
  })
  public getNotRegisteredSessionTest(@Async done:Function):void {
    this.storage.get(
      utils.SESSION_ID,
      (session:Session)=> {
        assert.fail(null, session, "Exception should not be thrown");
      },
      (error:SessionError)=> {
        expect(
          error.getErrorType()
        ).to.equal(SessionErrorType.INVALID_SESSION_ID);
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the error callback function with the type of SessionErrorType.INVALID_SESSION_ID",
    order: 2
  })
  public removeNotRegisteredSessionTest(@Async done:Function):void {
    this.storage.remove(
      utils.SESSION_ID,
      (error:SessionError)=> {
        expect(
          error.getErrorType()
        ).to.equal(SessionErrorType.INVALID_SESSION_ID);
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the callback function with no error",
    order: 3
  })
  public addTest(@Async done:Function):void {
    this.storage.add(
      utils.STABLE_SESSION,
      (error:SessionError)=> {
        expect(error).to.be.undefined;
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the callback function with no error",
    order: 4
  })
  public addExistingSessionTest(@Async done:Function):void {
    this.storage.add(
      utils.STABLE_SESSION,
      (error:SessionError)=> {
        expect(error).to.be.undefined;
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the callback function with no error",
    order: 5
  })
  public removeTest(@Async done:Function):void {
    this.storage.remove(
      utils.SESSION_ID,
      (error:SessionError)=> {
        expect(error).to.be.undefined;
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the error callback function with the type of SessionErrorType.INVALID_SESSION_ID",
    order: 6
  })
  public getRemovedSessionTest(@Async done:Function):void {
    this.storage.get(
      utils.SESSION_ID,
      (session:Session)=> {
        assert.fail(null, session, "Exception should not be thrown");
      },
      (error:SessionError)=> {
        expect(
          error.getErrorType()
        ).to.equal(SessionErrorType.INVALID_SESSION_ID);
        done();
      }
    )
  }
  
  @Test({
    description: "should invoke the error callback function with the type of SessionErrorType.INVALID_SESSION_ID",
    order: 7
  })
  public expiredSessionTest(@Async done:Function):void {
    this.storage.clearExpired();
    this.storage.get(
      utils.VOLATILE_SESSION_ID,
      (session:Session)=> {
        assert.fail(null, session, "Exception should not be thrown");
      },
      (error:SessionError)=> {
        expect(
          error.getErrorType()
        ).to.equal(SessionErrorType.INVALID_SESSION_ID);
        done();
      }
    )
  }
}