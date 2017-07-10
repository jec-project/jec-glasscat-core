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

import {SessionOwner, Session, SessionId} from "jec-exchange";
import {GlassCatSessionId} from "../GlassCatSessionId";

/**
 * A utility class for building EJP sessions identifiers.
 */
export class SessionIdBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SessionIdBuilder</code> instance.
   */
  constructor() { }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>SessionId</code> object.
   * 
   * @param {string} guid the unique identifier for the new 
   *                      <code>SessionId</code> object. 
   * @return {SessionId} a new <code>SessionId</code> object.
   */
  public buildSessionId(guid:string):SessionId {
    let sessionId:SessionId = new GlassCatSessionId(guid);
    return sessionId;
  }
}