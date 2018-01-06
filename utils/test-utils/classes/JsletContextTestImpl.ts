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

import {Jslet, JsletContext, SecurityContext, SessionContext,
        HttpRequest, HttpResponse, SessionError} from "jec-exchange";
import {Logger} from "jec-commons";

export class JsletContextTestImpl implements JsletContext {

  private _map:Map<string, Jslet> = null;

  constructor() {
    this._map = new Map<string, Jslet>();
  }

  addJslet(jslet: Jslet): void {
    let jsletImpl:any = (jslet as any);
    this._map.set(jsletImpl.__webJsletMetadata.urlPatterns[0], jslet);
  }

  getJslet(url: string): Jslet {
    return this._map.get(url);
  }

  getStatusInfo() {
    throw new Error("Method not implemented.");
  }

  getDirectoryPath(): string {
    throw new Error("Method not implemented.");
  }

  getSourcePath(): string {
    throw new Error("Method not implemented.");
  }

  getSecurityContext(): SecurityContext {
    throw new Error("Method not implemented.");
  }

  getSessionContext(): SessionContext {
    throw new Error("Method not implemented.");
  }

  authenticate(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void {
    throw new Error("Method not implemented.");
  }

  invalidateSession(req: HttpRequest, res: HttpResponse, result: (error?: SessionError) => any): void {
    throw new Error("Method not implemented.");
  }

  getLogger(): Logger {
    throw new Error("Method not implemented.");
  }
}
