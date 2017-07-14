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

import {JsletContext, Jslet, HttpJslet, SecurityContext, HttpRequest,
        HttpResponse, SessionError, SessionContext} from "jec-exchange";
import {LocaleManager} from "../i18n/LocaleManager";
import {LoggerManager} from "../util/logging/LoggerManager";
import {UrlPatternUtils} from "../util/url/UrlPatternUtils";
import {UrlPatternBuilder} from "../util/url/UrlPatternBuilder";
import {DomainConnector} from "../domains/connectors/DomainConnector";
import {ContextRootUtil} from "../util/contextroot/ContextRootUtil";;
import {LoginStrategy} from "../security/login/LoginStrategy";
import {SecurityManager} from "../core/SecurityManager";
import {Logger, JecStringsEnum, UrlStringsEnum, UrlPattern} from "jec-commons";

/**
 * The <code>EjpJsletContext</code> class represents the jslets context for a
 * <code>EjpContainer</code> instance.
 */
export class EjpJsletContext implements JsletContext {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpJsletContext</code> instance.
   * 
   * @param {DomainConnector} connector The domain connector on which is 
   *                                    deployed this jslet context.
   * @param {SecurityContext} securityContext the <code>SecurityContext</code> 
   *                                          associated with this
   *                                          <code>JsletContext</code> object.
   * @param {SessionContext} sessionContext the <code>SessionContext</code> 
   *                                        associated with this 
   *                                        <code>JsletContext</code> object.
   * @param {LoginStrategy} loginStrategy the <code>LoginStrategy</code> 
   *                                      associated with this 
   *                                      <code>JsletContext</code> object.
   */
  constructor(connector:DomainConnector, securityContext:SecurityContext,
                                         sessionContext:SessionContext,
                                         loginStrategy:LoginStrategy) {
    this.init(connector, securityContext, sessionContext, loginStrategy);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The map that contains all jslet for this context.
   */
  private _jsletMap:Map<string, Jslet> = null;

  /**
   * The reference to the <code>UrlPatternUtils</code> class for this context.
   */
  private _urlPatternUtils:UrlPatternUtils = null;

  /**
   * The reference to the <code>UrlPatternBuilder</code> class for this context.
   */
  private _urlPatternBuilder:UrlPatternBuilder = null;

  /**
   * A collection that contains all <code>UrlPattern</code> objects for this
   * context.
   */
  private _urlPatternColl:UrlPattern[] = null;

  /**
   * The domain connector on which is deployed this jslet context.
   */
  private _connector:DomainConnector = null;

  /**
   * The security context associated with this <code>JsletContext</code> object.
   */
  private _securityContext:SecurityContext = null;

  /**
   * The session context associated with this <code>JsletContext</code> object.
   */
  private _sessionContext:SessionContext = null;

  /**
   * The login strategy associated with this <code>JsletContext</code> object.
   */
  private _loginStrategy:LoginStrategy = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {DomainConnector} connector The domain connector on which is 
   *                                    deployed this jslet context.
   * @param {SecurityContext} securityContext the <code>SecurityContext</code> 
   *                                          associated with this
   *                                          <code>JsletContext</code> object.
   * @param {SessionContext} sessionContext the <code>SessionContext</code> 
   *                                        associated with this 
   *                                        <code>JsletContext</code> object.
   * @param {LoginStrategy} loginStrategy the <code>LoginStrategy</code> 
   *                                      associated with this 
   *                                      <code>JsletContext</code> object.
   */
  private init(connector:DomainConnector, securityContext:SecurityContext,
                                          sessionContext:SessionContext,
                                          loginStrategy:LoginStrategy):void {
    this._connector = connector;
    this._securityContext = securityContext;
    this._sessionContext = sessionContext
    this._jsletMap = new Map<string, Jslet>();
    this._urlPatternUtils = new UrlPatternUtils();
    this._urlPatternBuilder = new UrlPatternBuilder();
    this._urlPatternColl = new Array<UrlPattern>();
    this._loginStrategy = loginStrategy;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addJslet(jslet:Jslet):void {
    let httpJslet:HttpJslet = jslet as HttpJslet;
    httpJslet.setContext(this);
    let urlPattern:UrlPattern = null;
    let patterns:string[] = httpJslet.getUrlPatterns();
    let len:number = patterns.length;
    let pattern:string = null;
    while(len--) {
      pattern = patterns[len];
      urlPattern = this._urlPatternBuilder.build(pattern);
      this._urlPatternColl.push(urlPattern);
      this._jsletMap.set(urlPattern.baseUrl, jslet);
    }
    jslet.init();
    let i18n:LocaleManager = LocaleManager.getInstance();
    var msg:string = i18n.get(
      "jslet.added",
      httpJslet.getName(),
      patterns.toString(),
      httpJslet.getTemplate()
    );
    LoggerManager.getInstance().info(msg);
  }

  //public removeJslet(jslet:Jslet):void { }

  /**
   * @inheritDoc
   */
  public getJslet(url:string):Jslet {
    let jslet:Jslet = undefined;
    let len:number = this._urlPatternColl.length;
    let urlPattern:UrlPattern = null;
    let baseUrl:string =
              url === UrlStringsEnum.EMPTY_STRING ? ContextRootUtil.INDEX : url; 
    while(len--) {
      urlPattern = this._urlPatternColl[len];
      if(this._urlPatternUtils.match(baseUrl, urlPattern)) {
        jslet = this._jsletMap.get(urlPattern.baseUrl);
        break;
      }
    }
    return jslet;
  }
  
  /**
   * @inheritDoc
   */
  public getStatusInfo():any {
     return this._connector.getStatusInfo();
  }

  /**
   * @inheritDoc
   */
  public getDirectoryPath():string {
     return this._connector.getTarget() + JecStringsEnum.WEB_APP;
  }

  /**
   * @inheritDoc
   */
  public getSourcePath():string{
     return this._connector.getTarget() + JecStringsEnum.SRC;
  }

  /**
   * @inheritDoc
   */
  public getSecurityContext():SecurityContext {
     return this._securityContext;
  }

  /**
   * @inheritDoc
   */
  public getSessionContext():SessionContext {
     return this._sessionContext;
  }
  
  /**
   * @inheritDoc
   */
  public authenticate(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    this._loginStrategy.authenticate(req, res, result);
  }

  /**
   * @inheritDoc
   */
  public invalidateSession(req:HttpRequest, res:HttpResponse,
                                       result:(error?:SessionError)=>any):void {
    this._loginStrategy.invalidateSession(req, res, result);
  }
  
  /**
   * @inheritDoc
   */
  public getLogger():Logger {
    return LoggerManager.getInstance();
  }
}