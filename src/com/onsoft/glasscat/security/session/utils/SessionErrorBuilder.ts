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

import {SessionError, SessionId} from "jec-exchange";
import {BasicSessionError} from "../errors/BasicSessionError";

/**
 * A utility class for building EJP session errors.
 */
export class SessionErrorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SessionErrorBuilder</code> instance.
   */
  constructor() { }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and return a new <code>SessionError</code> instance initialized with 
   * the specified parameters.
   * 
   * @param {SessionId} sessionId the ID of the session that throws the error.
   * @param {string} errorType the type of the session error. Valid values are
   *                           constants of the <code>SessionErrorType</code>
   *                           class.
   * @param {string} message a string that contains the details of the session
   *                         error.
   * @return {SessionError} a new <code>SessionError</code> instance.
   */
  public build(sessionId:SessionId, errorType:string,
                                    message?:string):SessionError {
    let error:SessionError =
                           new BasicSessionError(sessionId, errorType, message);
    return error;
  }
}