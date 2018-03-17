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

import {LoggerManager} from "../../util/logging/LoggerManager";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {HttpRequest, HttpResponse, Session, SessionOwner, SessionError,
        SessionErrorType, SessionContext, SessionId} from "jec-exchange";
import {SessionManager} from "../session/managers/SessionManager";
import {EjpSessionManager} from "../session/managers/EjpSessionManager";
import {SessionBuilder} from "../session/utils/SessionBuilder";
import {SessionUtil} from "../session/utils/SessionUtil";
import {SessionIdUtil} from "../session/utils/SessionIdUtil";
import {SessionStorage} from "../session/connectors/SessionStorage";
import {SessionStorageSolver} from "../session/utils/SessionStorageSolver";
import {EjpConfig} from "../../context/ejp/EjpConfig";
import {EjpSessionConfig} from "../../context/ejp/EjpSessionConfig";
import {SessionErrorBuilder} from "../session/utils/SessionErrorBuilder";

/**
 * The <code>EjpSessionContext</code> class represents the concrete 
 * implementation of the <code>SessionContext</code> interface for EJP domain
 * containers.
 */
export class EjpSessionContext implements SessionContext {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSessionContext</code> instance.
   * 
   * @param {string} contextRoot the context root of the
   *                             <code>DomainContainer</code> associated with 
   *                             this <code>SessionContext</code>.
   * @param {EjpConfig} config the configuration of the
   *                           <code>DomainContainer</code> associated with this
   *                           <code>SessionContext</code>.
   */
  constructor(contextRoot:string, config:EjpConfig) {
    this.init(contextRoot, config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The context root of the <code>DomainContainer</code> associated with this
   * <code>SessionContext</code>
   */
  private _contextRoot:string = null;

  /**
   * The reference to the <code>SessionManager</code> instance for this context.
   */
  private _sessionManager:SessionManager = null;

  /**
   * The reference to the <code>SessionBuilder</code> instance for this context.
   */
  private _sessionBuilder:SessionBuilder = null;

  /**
   * An internal map for storing sessions during HTTP transactions.
   */
  private _sessionMap:Map<string, Session> = null;

  /**
   * Specifies the number (in milliseconds) to use when calculating the
   * expiration date of the cookie. Default value represents 5 minutes.
   */
  private _maxAge:number = 5*60*1000;

  /**
   * Specifies the default URL where to redirect the HTTP transaction in case of
   * session error.
   */
  private _errorUrl:string = null;

  /**
   * The reference to the <code>SessionErrorBuilder</code> instance for this
   * object.
   */
  private _sessionErrorBuilder:SessionErrorBuilder = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this session context.
   *
   * @param {string} contextRoot the context root of the
   *                             <code>DomainContainer</code> associated with 
   *                             this <code>SessionContext</code>.
   * @param {EjpConfig} config the configuration of the
   *                           <code>DomainContainer</code> associated with this
   *                           <code>SessionContext</code>.
   */
  private init(contextRoot:string, config:EjpConfig):void {
    this._contextRoot = contextRoot;
    this._sessionErrorBuilder = new SessionErrorBuilder();
    this.initSessionManager(config.webapp.session);
    this._sessionMap = new Map<string, Session>();
  }

  /**
   * Initializes the session manager for this context.
   * 
   * @param {EjpSessionConfig} sessionConfig the session configuration of the 
   *                                         <code>DomainContainer</code> 
   *                                         associated with this
   *                                         <code>SessionContext</code>
   */
  private initSessionManager(sessionConfig:EjpSessionConfig):void {
    const sessionStorageSolver:SessionStorageSolver =
                                                     new SessionStorageSolver();
    const sessionStorage:SessionStorage = 
                          sessionStorageSolver.getSessionStorage(sessionConfig);
    this._sessionBuilder = new SessionBuilder();
    this._sessionManager = new EjpSessionManager();
    this._sessionManager.setSessionStorage(sessionStorage);
    if(sessionConfig.errorUrl) this._errorUrl = sessionConfig.errorUrl;
    if(sessionConfig.maxAge) {
      this._maxAge = Number(sessionConfig.maxAge) * 1000;
    }
  }
  
  /**
   * Removes an expired session.
   *
   * @param {SessionId} sessionId the ID of the session to delete.
   * @param {Function} result the callback method used to handle the result of
   *                          the original operation.
   */
  private processExpiredSession(sessionId:SessionId,
                                result:(error?:SessionError)=>any):void {
    this._sessionMap.delete(sessionId.getId());
    result(
      this._sessionErrorBuilder.build(
        sessionId, SessionErrorType.SESSION_EXPIRED
      )
    );
    this.unloadSession(
      sessionId,
      (err:SessionError) => {
        if(err) {
          LoggerManager.getInstance().error(
            GlassCatLocaleManager.getInstance().get(
              "errors.session.sessionStorageAccessError", err.toString()
            )
          );
        }
      }
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getContextRoot():string {
    return this._contextRoot;
  }

  /**
   * @inheritDoc
   */
  public getErrorUrl():string {
    return this._errorUrl;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Sessions managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public invalidateSession(req:HttpRequest,
                           result:(error?:SessionError)=>any):void {
    const cookies:any = req.getCookies();
    const sessionId:SessionId = SessionIdUtil.parseSessionIdCookie(cookies);
    this.unloadSession(sessionId, result);
  }

  /**
   * @inheritDoc.
   */
  public initSessionId():SessionId {
    return this._sessionManager.initSessionId();
  }
  
  /**
   * @inheritDoc
   */
  public initSession(req:HttpRequest, sessionOwner:SessionOwner,
                                      result:(error?:SessionError)=>any):void {
    const cookies:any = req.getCookies();
    const sessionId:SessionId = SessionIdUtil.parseSessionIdCookie(cookies);
    const session:Session =
                     this._sessionBuilder.buildSession(sessionId, sessionOwner);
    session.expires = SessionUtil.getExirationTime(this._maxAge);
    this._sessionManager.addSession(
      session,
      (err:SessionError) => {
        if(!err) this._sessionMap.set(sessionId.getId(), session);
        result(err);
      }
    );
  }

  /**
   * @inheritDoc
   */
  public loadSession(sessionId:SessionId, result:(error?:SessionError)=>any):void {
    const maxAge:number = Date.now();
    const id:string = sessionId.getId();
    if(this._sessionMap.has(id)) {
      const cached:Session = this._sessionMap.get(id);
      //console.log("check cached session:", sessionId);
      if(cached.expires <= maxAge) {
        this.processExpiredSession(sessionId, result);
      } else result();
    } else {
      this._sessionManager.getSession(
        sessionId, 
        (session:Session) => {
          //console.log("check loaded session:", sessionId);
          if(session.expires <= maxAge) {
            this.processExpiredSession(sessionId, result);
          } else {
            this._sessionMap.set(id, session);
            result();
          }
        },
        result
      );
    }
  }
  
  /**
   * @inheritDoc
   */
  public refreshSession(sessionId:SessionId, data:any,
                                       result:(error?:SessionError)=>any):void {
    const session:Session = this._sessionMap.get(sessionId.getId());
    if(session) {
      session.data = data;
      session.expires = SessionUtil.getExirationTime(this._maxAge);
      this._sessionManager.addSession(session, result);
    } else {
      result(
        this._sessionErrorBuilder.build(
          sessionId, SessionErrorType.INVALID_SESSION_ID)
        );
    }
  }

  /**
   * @inheritDoc
   */
  public unloadSession(sessionId:SessionId,
                       result:(error?:SessionError)=>any):void {
    this._sessionMap.delete(sessionId.getId());
    this._sessionManager.removeSession(sessionId, result);
  }

  /**
   * @inheritDoc
   */
  public hasSession(sessionId:SessionId):boolean {
    return this._sessionMap.has(sessionId.getId());
  }

  /**
   * @inheritDoc
   */
  public getSession(sessionId:SessionId):Session {
    return this._sessionMap.get(sessionId.getId());
  }
};
