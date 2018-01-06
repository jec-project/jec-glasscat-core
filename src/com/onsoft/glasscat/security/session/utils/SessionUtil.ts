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

import {HttpService} from "../../../services/http/HttpService";
import {HttpListener} from "../../../services/http/listeners/HttpListener";
import {HttpResponse, SessionId} from "jec-exchange";
import {SessionIdUtil} from "../../../security/session/utils/SessionIdUtil";

/**
 * A utility class for working with sessions.
 */
export class SessionUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a session expiration time, in milliseconds, computed from the
   * maximum validity time of the session.
   * 
   * @param {number} maxAge the maximum age to be used to compute the session
   *                        expiration time.
   * @return {number} a session expiration time, in milliseconds.
   */
  public static getExirationTime(maxAge:number):number {
    //see http://mrcoles.com/blog/cookies-max-age-vs-expires/
    let d = new Date();
    return d.setTime(d.getTime() + maxAge);
  }

  /**
   * A visitor function that sets the EJP security cookie for the specified HTTP
   * response.
   * 
   * @param {HttpResponse} res the <code>HttpResponse</code> instance for the  
   *                           current HTTP transaction.
   * @param {SessionId} sessionId the session ID for the new cookie.
   * @param {HttpService} service the <code>HttpService</code> object from which 
   *                              the cookie initialization has been initiated.
   */
  public static setSessionCookie(res:any, sessionId:SessionId,
                                          service:HttpService):void {
    let listener:HttpListener = service.getHttpListener();
    res.cookie(
      SessionIdUtil.SESSION_ID_NAME,
      SessionIdUtil.stringifySessionId(sessionId),
      {
        httpOnly: true,
        secure: listener.getSecured()
      }
    );
  }
}