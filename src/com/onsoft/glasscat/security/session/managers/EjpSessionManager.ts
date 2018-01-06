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

import {SessionManager} from "./SessionManager";
import {GuidGenerator, GuidGeneratorBase} from "jec-commons";
import * as crypto from "crypto";
import {SecurityManager} from "../../../core/SecurityManager";
import {Session, SessionError, SessionId} from "jec-exchange";
import {HttpService} from "../../../services/http/HttpService";
import {SessionStorage} from "../connectors/SessionStorage";
import {SessionIdUtil} from "../utils/SessionIdUtil";
import {SessionIdBuilder} from "../utils/SessionIdBuilder";

/**
 * The default <code>SessionManager</code> implementation to be used by GlassCat
 * servers.
 */
export class EjpSessionManager implements SessionManager {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSessionManager</code> instance.
   */
  constructor() {
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the GUID for this manager.
   */
  private _guid:string = null;

  /**
   * The type of algorithm used by the associated<code>UserHashModule</code>  
   * instance for cookies encryption.
   */
  private readonly HASH_ALGORITHM:string = "sha256";

  /**
   * The type of output encoding used by the associated
   * <code>UserHashModule</code> instance for cookies encryption.
   */
  private readonly OUTPUT_ENCODING:any = "hex";

  /**
   * The reference to the <code>SessionStorage</code> instance for this manager.
   */
  private _connector:SessionStorage = null;

  /**
   * The reference to the <code>SessionIdBuilder</code> instance for this
   * manager.
   */
  private _sessionIdBuilder:SessionIdBuilder = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this session manager.
   */
  private init():void {
    let generator:GuidGenerator = new GuidGeneratorBase();
    this._guid = generator.generate();
    this._sessionIdBuilder = new SessionIdBuilder();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getSessionStorage():SessionStorage {
    return this._connector;
  }

  /**
   * @inheritDoc
   */
  public setSessionStorage(sessionStorage:SessionStorage):void {
    //TODO : log this action
    this._connector = sessionStorage;
  }

  /**
   * @inheritDoc
   */
  public initSessionId():SessionId {
    let sha:crypto.Hash = crypto.createHash(this.HASH_ALGORITHM)
                                .update(Date.now() + this._guid);
    let sessionId:SessionId = this._sessionIdBuilder.buildSessionId(
      sha.digest(this.OUTPUT_ENCODING)
    );
    return sessionId;
  }
  
  /**
   * @inheritDoc
   */
  public addSession(session:Session, result:(error?:SessionError)=>any):void {
    this._connector.add(session, result);
  }

  /**
   * @inheritDoc
   */
  public getSession(sessionId:SessionId, success:(session:Session)=>any,
                                         error:(error:SessionError)=>any):void {
    this._connector.get(
      sessionId,
      success,
      error
    );
  }

  /**
   * @inheritDoc
   */
  public removeSession(sessionId:SessionId,
                       result:(error?:SessionError)=>any):void {
    this._connector.remove(sessionId, result);
  }
}