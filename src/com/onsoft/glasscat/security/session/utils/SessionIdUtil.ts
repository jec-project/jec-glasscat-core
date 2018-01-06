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

import {HttpRequest, SessionId} from "jec-exchange";
import {SessionIdBuilder} from "./SessionIdBuilder";

/**
 * A utility class for working with sessions identifiers.
 */
export class SessionIdUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The separator for session cookie values.
   */
  private static readonly SEPARATOR:string = ":";
  
  /**
   * The separator for session cookie parameters.
   */
  private static readonly PARAM_SEPARATOR:string = "=";

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The cookie session name as defined by the EJP specification.
   */
  public static readonly SESSION_ID_NAME:string = "JSSESSIONID";

  /**
   * A reference to the property used to store cookies over the express 
   * <code>Request</code> class.
   */
  public static readonly COOKIES:string = "cookies";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the <code>SessionId</code> instance for the current HTTP
   * transaction.
   * 
   * @param {any} cookies the session cookies to parse.
   * @return {SessionId} the <code>SessionId</code> instance for the current
   *                     HTTP transaction.
   */
  public static parseSessionIdCookie(cookies:any):SessionId {
    let sessionId:SessionId = null;
    let buffer:string[] = null;
    let rawSessionId:string = cookies[SessionIdUtil.SESSION_ID_NAME];
    let len:number = -1;
    let sessionIdParams:string = null;
    let sessionIdParamsSepId:number = -1;
    let sessionIdProp:string = null;
    let sessionIdBuilder = null;
    if(rawSessionId) {
       sessionIdBuilder = new SessionIdBuilder();
      if(rawSessionId.indexOf(SessionIdUtil.SEPARATOR) === -1) {
        sessionId = sessionIdBuilder.buildSessionId(rawSessionId);
      } else {
        buffer = rawSessionId.split(SessionIdUtil.SEPARATOR);
        sessionId = sessionIdBuilder.buildSessionId(buffer.shift());
        len = buffer.length;
        while(len--){
          sessionIdParams = buffer[len];
          sessionIdParamsSepId =
                         sessionIdParams.indexOf(SessionIdUtil.PARAM_SEPARATOR);
          sessionIdProp = sessionIdParams.substring(0, sessionIdParamsSepId);
          sessionId[sessionIdProp] =
                            sessionIdParams.substring(sessionIdParamsSepId + 1);
        }
      }
    }
    return sessionId;
  }

  /**
   * Builds and returns a string that represents the cookie value for this
   * <code>SessionId</code> object.
   * 
   * @param {SessionId} sessionId the <code>SessionId</code> instance to
   *                              stingify.
   * @return {string} a string that represents the cookie value for the
   *                  specified <code>SessionId</code> instance.
   */
  public static stringifySessionId(sessionId:SessionId):string {
    let result:string = sessionId.getId();
    let authurl:string = sessionId.authurl;
    if(authurl) result += ":authurl=" + authurl;
    return result;
  }
}