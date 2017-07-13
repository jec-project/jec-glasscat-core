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

import {SessionContext, JsletContext, SecurityConstraint, Session,
        SessionOwner, SessionError, SessionErrorType, SecurityContext,
        StaticResources, SessionId, AuthenticationError} from "jec-exchange";
import * as express from "express";
import {HttpService} from "../services/http/HttpService";
import {ContextRootUtil} from "../util/contextroot/ContextRootUtil";
import {ContextRootData} from "../util/contextroot/ContextRootData";
import {DomainConnector} from "../domains/connectors/DomainConnector";
import {DomainContainer} from "../domains/containers/DomainContainer";
import {UrlUtils} from "../util/url/UrlUtils";
import {HttpListener} from "../services/http/listeners/HttpListener";
import {DomainConnectorManager} from "./DomainConnectorManager";
import {ResourceProxy} from "../services/http/proxy/ResourceProxy";
import {DomainState} from "../domains/containers/DomainState";
import {SessionUtil} from "../security/session/utils/SessionUtil";
import {HttpLocalProperties} from "../services/http/utils/HttpLocalProperties";
import {SessionIdUtil} from "../security/session/utils/SessionIdUtil";
import {UrlStringsEnum, HttpStatusCode} from "jec-commons";
import {BasicAuthenticationError} from "../security/session/errors/BasicAuthenticationError";

/**
 * The manager for secured session accesses over the current GlassCat container.
 */
export class SecurityManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SecurityManager</code> instance.
   */
  constructor() {
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>ContextRootUtil</code> instance for this
   * manager.
   */
  private _contextRootUtil:ContextRootUtil = null;

  /**
   * The reference to the <code>DomainConnectorManager</code> object for this
   * manager.
   */
  private _connectorManager:DomainConnectorManager = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this security manager.
   */
  private init():void {
    this._contextRootUtil = new ContextRootUtil();
  }

  /**
   * Returns a boolean value that inicates whether the specified session has
   * security access rights for the current HTTP transcation
   * (<code>true</code>), or not (<code>false</code>).
   *
   * @param {Session} session the session to validate.
   * @param {SecurityConstraint} constraint the security constraints specified
   *                                        for the current HTTP transction.
   * @return {boolean} <code>true</code> whether the session is authorized for
   *                   the current transaction; <code>false</code> otherwise.
   */
  private validateSession(session:Session,
                          constraint:SecurityConstraint):boolean {
    let isValid:boolean =
                   session ? session.sessionOwner.isGranted(constraint) : false;
    return isValid;
  }

  /**
   * Returns a boolean value that inicates whether the current HTTP transaction
   * processes static resources (<code>true</code>), or not (<code>false</code>).
   *
   * @param {ContextRootData} crd the context root data for the current HTTP
   *                              transaction.
   * @param {SecurityContext} context the security context related to the
   *                                  the current HTTP transaction.
   * @param {HttpLocalProperties} properties the reference to the HTTP local
   *                                         properties for the current HTTP
   *                                         transaction.
   * @return {boolean} <code>true</code> whether current HTTP transaction
   *                   processes static resources; <code>false</code>
   *                   otherwise.
   */
  private isStaticResource(crd:ContextRootData,
                           context:SecurityContext,
                           properties:HttpLocalProperties):boolean {
    let result:boolean = false;
    let staticResources:StaticResources =
                              context.getStaticResources(properties.trimmedUrl);
    if(staticResources) {
      properties.isStatic = result = true;
    }
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the reference to the <code>DomainConnectorManager</code> instance for this
   * security manager. This method is called by the kernel.
   *
   * @param {DomainConnectorManager} connectorManager the reference to the
   *                                         <code>DomainConnectorManager</code>
   *                                                  instance.
   */
  public setDomainConnectorManager(manager:DomainConnectorManager):void {
    this._connectorManager = manager;
  }

  /**
   * Returns a boolean that indicates whether the transaction is authorized
   * (<code>true</code>), or nor (<code>false</code>).
   *
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   * @param {HttpService} service the HTTP service that intercepts the current 
   *                              HTTP transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a   
   *                          <code>AuthenticationError</code> object as
   *                          parameter.
   */
  public validateTransaction(req:express.Request, res:express.Response,
                             service:HttpService,
                             result:(error?:AuthenticationError)=>any):void {
    let isSecuredTransaction:boolean = true;
    let properties:HttpLocalProperties = res.locals.properties;
    let crd:ContextRootData = properties.contextRootData;
    let listener:HttpListener = service.getHttpListener();
    let connector:DomainConnector = properties.connector;
    let redirectUrl:string = null;
    let jsletContext:JsletContext = null;
    let securityConstraint:SecurityConstraint = null;
    let session:Session = null;
    let err:AuthenticationError = null;
    let sessionId:SessionId = null;
    let errorStatusCode:number = 0;
    if(crd.containsNestedResource) {
      crd.newPath = ResourceProxy.getInstance().getProxyPath(
        req.url, listener, this._connectorManager
      );
    } else if(properties.containerState === DomainState.STATEFUL) {
      if(!crd.needsRedirection) {
        if(!connector || connector.getServer() !== listener.getServer()) {
          isSecuredTransaction = false;
          errorStatusCode = HttpStatusCode.NOT_FOUND;
        } else {
          jsletContext = connector.getContainer().getJsletContext();
          securityConstraint = jsletContext.getSecurityContext()
                                  .getSecurityConstraint(properties.trimmedUrl);
          if(securityConstraint) {
            session = jsletContext.getSessionContext()
                                  .getSession(properties.sessionId);
            isSecuredTransaction = this.validateSession(
              session, securityConstraint
            );
            if(!isSecuredTransaction) {
              errorStatusCode = HttpStatusCode.UNAUTHORIZED;
            }
          }
        }
      }
    }
    if(!isSecuredTransaction) {
      sessionId = properties.sessionId;
      if(!sessionId.authurl) {
        sessionId.authurl = req.url;
        SessionUtil.setSessionCookie(res, sessionId, service);
      }
      err = new BasicAuthenticationError(errorStatusCode);
    }
    result(err);
  }

  /**
   * Returns the header security parameters for the specified HTTP service.
   *
   * @param {HttpService} service the HTTP service for which to return the 
   *                              header security parameters.
   */
  public getHeaderSecurityParams(service:HttpService):string[] {
    let secParams:string[] = new Array<string>();
    return secParams;
  }

  /**
   * Checks whether the EJP session exists on the specified HTTP request; if the
   * EJP session does not exist, creates and attaches a new EJP session to the
   * request, regarding the current state of the domain container.
   *
   * @param {HttpService} service the HTTP service that intercepts the current 
   *                              HTTP transaction.
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a 
   *                          <code>SessionError</code> object as parameter.
   */
  public processSession(service:HttpService,
                        req:express.Request, res:express.Response,
                        result:(error?:SessionError)=>any):void {
    let sessionId:SessionId = null;
    let connector:DomainConnector = null;
    let container:DomainContainer = null;
    let jsletContext:JsletContext = null;
    let sessionContext:SessionContext = null;
    let isStaticUrl:boolean = false;
    let ctxRootRef:string = null;
    let crd:ContextRootData = this._contextRootUtil.extractContextRoot(req);
    let properties:HttpLocalProperties = res.locals.properties;
    let cookies:any = null;
    properties.contextRootData = crd;
    connector = this._connectorManager.getDomainConnector(crd.contextRoot);
    properties.connector = connector;
    properties.sessionId = null;
    if(connector) {
      container = connector.getContainer();
      ctxRootRef = UrlStringsEnum.SLASH + connector.getContextRoot();
      properties.trimmedUrl = UrlUtils.getInstance()
                                      .trimContextRoot(req.url, ctxRootRef);
      if(container.getState() === DomainState.STATEFUL) {
        properties.containerState = DomainState.STATEFUL;
        properties.contextRootRef = ctxRootRef;
        jsletContext = container.getJsletContext();
        sessionContext = jsletContext.getSessionContext();
        isStaticUrl = this.isStaticResource(
                              crd,
                              jsletContext.getSecurityContext(),
                              properties
                            );
        if(isStaticUrl) result();
        else {
          cookies = req[SessionIdUtil.COOKIES];
          sessionId = SessionIdUtil.parseSessionIdCookie(cookies);
          if(!sessionId) {
            sessionId = sessionContext.initSessionId();
            SessionUtil.setSessionCookie(res, sessionId, service);
            properties.sessionId = sessionId;
            result();
          } else {
            properties.sessionId = sessionId;
            sessionContext.loadSession(
              sessionId,
              (err:SessionError) => {
                if(err) {
                  let errorType:string = err.getErrorType();
                  // Session does not exists => owner is not authenticated yet:
                   if(errorType === SessionErrorType.INVALID_SESSION_ID) {
                     result();
                   } else {
                     properties.redirectUrl = sessionContext.getErrorUrl();
                     result(err);
                   }
                } else result();
              }
            );
          }
        }     
      } else result();
    } else result();
  }
};
