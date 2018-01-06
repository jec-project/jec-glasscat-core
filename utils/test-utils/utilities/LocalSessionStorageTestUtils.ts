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

import {GlassCatSessionId} from "../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";
import {GlassCatSession} from "../../../src/com/onsoft/glasscat/security/session/GlassCatSession";
import { SessionId, SessionErrorType, Session } from "jec-exchange";

/*!
 * This module constains utilities used by the LocalSessionStorageTest test
 * suite.
 */

// Utilities:
const SESSION_GUID:string = "03b7be34-9e4d-4799-89a6-81ae950cca4c";
const VOLATILE_SESSION_GUID:string = "8ee0a6b5-462b-4053-b253-0c374cd1071e";
const buildSessionId:Function = function(guid:string):SessionId {
  let session:SessionId = new GlassCatSessionId(guid);
  return session;
};
export const SESSION_ID:SessionId = buildSessionId(SESSION_GUID);
export const VOLATILE_SESSION_ID:SessionId = buildSessionId(VOLATILE_SESSION_GUID);
const buildSession:Function = function(sessionId:SessionId, expires:number):Session {
  let session:Session = new GlassCatSession();
  session.sessionId = sessionId;
  session.expires = expires;
  return session;
};
export const STABLE_SESSION:Session = buildSession(SESSION_ID, 0);
export const VOLATILE_SESSION:Session = buildSession(VOLATILE_SESSION_ID, Date.now() * 2);
