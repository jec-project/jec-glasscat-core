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

import { GlobalGuidGenerator } from "jec-commons";
import { SessionId } from "jec-exchange";
import { GlassCatSessionId } from "../../../src/com/onsoft/glasscat/security/session/GlassCatSessionId";

/*!
 * This module constains utilities used by the SessionIdUtilTest test suite.
 */

// Utilities:

export const SESSION_ID_NAME:string = "JSSESSIONID";
export const COOKIES:string = "cookies";
export const AUTH_URI_PATH:string = "/my/auth/uri/path";
export const EMPTY_COOKIE:any = {};
export const VALID_BASIC_COOKIE:any = {
  JSSESSIONID: String(GlobalGuidGenerator.getInstance().generate())
};
export const VALID_COMPLEX_GUID:string = GlobalGuidGenerator.getInstance().generate();
export const COMPLEX_COOKIE_CONTENT:string = VALID_COMPLEX_GUID + ":authurl=" + AUTH_URI_PATH;
export const VALID_COMPLEX_COOKIE:any = {
  JSSESSIONID: COMPLEX_COOKIE_CONTENT
};
export const buildSessionId:Function = function():SessionId{
  const id:SessionId = new GlassCatSessionId(VALID_COMPLEX_GUID);
  return id;
};
