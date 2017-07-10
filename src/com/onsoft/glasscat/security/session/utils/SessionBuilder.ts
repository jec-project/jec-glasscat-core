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
import {GlassCatSession} from "../GlassCatSession";

/**
 * A utility class for building EJP sessions.
 */
export class SessionBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SessionBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new session object.
   * 
   * @param {SessionId} sessionId the session ID for the new session.
   * @param {SessionOwner} sessionOwner the session owner.
   * @return {Session} a new session initialized with the specified parameters.
   */
  public buildSession(sessionId:SessionId, sessionOwner:SessionOwner):Session {
    let session:Session = new GlassCatSession();
    session.sessionId = sessionId;
    session.sessionOwner = sessionOwner;
    return session;
  }
}