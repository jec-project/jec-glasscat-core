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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { SessionIdUtil } from "../../../../../../../src/com/onsoft/glasscat/security/session/utils/SessionIdUtil";
import { GlassCatSessionId } from "../../../../../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";

import * as utils from "../../../../../../../utils/test-utils/utilities/SessionIdUtilTestUtils";
import { SessionId } from "jec-exchange";

@TestSuite({
  description: "Test the SessionIdUtil class properties and methods"
})
export class SessionIdUtilTest {

  @Test({
    description: "SessionIdUtil.COOKIES should be equal to 'cookies'"
  })
  public COOKIESTest():void {
    expect(SessionIdUtil.COOKIES).to.equal(utils.COOKIES);
  }
  
  @Test({
    description: "SessionIdUtil.SESSION_ID_NAME should be equal to 'JSSESSIONID'"
  })
  public SESSION_ID_NAMETest():void {
    expect(SessionIdUtil.SESSION_ID_NAME).to.equal(utils.SESSION_ID_NAME);
  }

  @Test({
    description: "should return 'null' when  no session cookie is available"
  })
  public parseSessionIdCookieNullTest():void {
    expect(SessionIdUtil.parseSessionIdCookie(utils.EMPTY_COOKIE)).to.be.null;
  }

  @Test({
    description: "should return an implementation of the SessionId interface"
  })
  public parseSessionIdCookieTest():void {
    expect(
      SessionIdUtil.parseSessionIdCookie(utils.VALID_BASIC_COOKIE)
    ).to.be.an.instanceOf(GlassCatSessionId);
  }
  
  @Test({
    description: "should return a SessionId object with a valid GUID"
  })
  public parseSessionIdCookieBasicTest():void {
    let result:SessionId =
                   SessionIdUtil.parseSessionIdCookie(utils.VALID_BASIC_COOKIE);
    expect(result.getId()).to.equal(utils.VALID_BASIC_COOKIE.JSSESSIONID);
  }
  
  @Test({
    description: "should return a SessionId object with a valid GUID"
  })
  public parseSessionIdCookieComplexTest():void {
    let result:SessionId =
                 SessionIdUtil.parseSessionIdCookie(utils.VALID_COMPLEX_COOKIE);
    expect(result.getId()).to.equal(utils.VALID_COMPLEX_GUID);
  }
  
  @Test({
    description: "should return a SessionId object with a valid authentication URL"
  })
  public parseSessionIdCookieAuthUrlTest():void {
    let result:SessionId =
                 SessionIdUtil.parseSessionIdCookie(utils.VALID_COMPLEX_COOKIE);
    expect(result.authurl).to.equal(utils.AUTH_URI_PATH);
  }
  
  @Test({
    description: "should return a string that represents a basic SessionId object"
  })
  public stringifySessionIdBasicTest():void {
    let result:string = 
                     SessionIdUtil.stringifySessionId(utils.buildSessionId());
    expect(result).to.equal(utils.VALID_COMPLEX_GUID);
  }

  @Test({
    description: "should return a string that represents a complex SessionId object"
  })
  public stringifySessionIdComplexTest():void {
    let sessionId:SessionId = utils.buildSessionId();
    sessionId.authurl = utils.AUTH_URI_PATH;
    let result:string = SessionIdUtil.stringifySessionId(sessionId);
    expect(result).to.equal(utils.COMPLEX_COOKIE_CONTENT);
  }
}