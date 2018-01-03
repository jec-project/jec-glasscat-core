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

import { LogLevelUtil } from "jec-commons";
import { GlassCatSessionId } from "../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";
import { SessionId, SessionErrorType } from "jec-exchange";

/*!
 * This module constains utilities used by the BasicSessionErrorTest test suite.
 */

// Utilities:
const buildSession:Function = function():SessionId {
  let session:SessionId =
                  new GlassCatSessionId("0498c7a9-b64f-412b-a033-95d5e9340ed7");
  return session;
};
export const SESSION_ID:SessionId = buildSession();
export const ERROR_TYPE:string = SessionErrorType.INVALID_SESSION_ID;
export const ERROR_MESSAGE:string = "session error";
