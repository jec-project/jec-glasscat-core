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

import {LoginStrategyConfig} from "./config/LoginStrategyConfig";
import {DomainContainer} from "../../domains/containers/DomainContainer";
import {LoginModule} from "./modules/LoginModule";
import {EjpFormModule} from "./modules/EjpFormModule";
import {BasicModule} from "./modules/BasicModule";
import {HttpRequest, HttpResponse, Credentials, SessionOwner, JsletContext,
        SessionContext, SessionError, SessionId, AuthMethod,
      AuthenticationError} from "jec-exchange";
import {SessionIdUtil} from "../session/utils/SessionIdUtil";

/**
 * Representation of a security constraint element for a GlassCat application.
 */
export class LoginStrategy {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LoginStrategy</code> instance.
   * 
   * @param {LoginStrategyConfig} strategyConfig the
   *                                            <code>LoginStrategyConfig</code> 
   *                                             that is  used to initialize
   *                                             this login strategy.
   */
  constructor(strategyConfig:LoginStrategyConfig) {
    this.init(strategyConfig);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * The <code>LoginStrategyConfig</code> instance for this login strategy.
   */
  private _strategyConfig:LoginStrategyConfig = null;
  
  /**
   * The <code>LoginModule</code> instance for this login strategy.
   */
  private _loginModule:LoginModule = null;

  /**
   * The <code>JsletContext</code> instance for this login strategy.
   */
  private _jsletContext:JsletContext = null;
  
  /**
   * The reference to the <code>SessionContext</code> instance for this login
   * module.
   */
  private _sessionContext:SessionContext = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initializes this object.
   * 
   * @param {LoginStrategyConfig} strategyConfig the
   *                                            <code>LoginStrategyConfig</code> 
   *                                             that is  used to initialize
   *                                             this login strategy.
   */
  private init(strategyConfig:LoginStrategyConfig):void {
    this._strategyConfig = strategyConfig;
    const authMethod:AuthMethod = this._strategyConfig.getAuthMethod();
    
    /*if(!authMethod) {
      LoggerManager.getInstance().error(
        GlassCatLocaleManager.getInstance().get("context.invalid")
      );
    }*/

    switch(authMethod) {
      case AuthMethod.EJP_FORM :
      this._loginModule = new EjpFormModule();
        break;
      case AuthMethod.BASIC :
        this._loginModule = new BasicModule();
        break;
      //TODO: add warnings for unsuported cases
      case AuthMethod.DIGEST :
      case AuthMethod.FORM :
      case AuthMethod.NONE :
      default :
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the login strategy for the specified domain container.
   * 
   * @param {DomainContainer} container the domain container for which to
   *                                    initialize the login strategy.
   */
  public initStrategy(container:DomainContainer):void {
    if(this._loginModule) {
      this._jsletContext = container.getJsletContext();
      this._sessionContext = this._jsletContext.getSessionContext();
      this._loginModule.setLoginStrategy(this);
    }
  }

  /**
   * Applies the login strategy for the current HTTP transaction.
   *
   * @param {HttpRequest} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                               transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes an error 
   *                          object as parameter.
   */
  public applyLoginStrategy(req:HttpRequest, res:HttpResponse,
                                             result:(error?:any)=>void):void {
    this._loginModule.applyLoginStrategy(req, res, result);
  }

  /**
   * Returns the <code>LoginStrategyConfig</code> instance for this login
   * strategy.
   * 
   * @return {LoginStrategyConfig} the <code>LoginStrategyConfig</code> instance 
   *                               for this login strategy.
   */
  public getLoginStrategyConfig():LoginStrategyConfig {
    return this._strategyConfig;
  }

  /**
   * Returns the <code>JsletContext</code> instance for this login strategy.
   * 
   * @return {JsletContext} the <code>JsletContext</code> instance for this 
   *                        login strategy.
   */
  public getJsletContext():JsletContext {
    return this._jsletContext;
  }
  
  /**
   * Authenticates the specified crendentials.
   *
   * @param {Credentials} credentials the user's credentials.
   * @param {Function} success the callback method called when the crendentials
   *                           are authenticated.
   * @param {Function} error the callback method called when the crendentials
   *                         are not authenticated. The callback method must 
   *                         specify an <code>error</code> Object parameter.
   */
  public authenticate(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    //TODO: treat error for invalid credentials declaration
    this._loginModule.authenticate(
      this._loginModule.getCredentials(req),
      (owner:SessionOwner) => {
          this._sessionContext.initSession(
            req,
            owner,
            (err:SessionError) => {
              //TODO: if error do 500 error else login strategy
              this._loginModule.applyAuthenticationStrategy(
                req, res, err, result
              );
            }
          );
        },
        (err:AuthenticationError) => { //TODO: add authentication error
          this._loginModule.applyAuthenticationStrategy(req, res, err, result);
        }
    );
  }

  /**
   * Invalidates the current session.
   *
   * @param {HttpRequest} req the <code>HttpRequest</code> instance for the 
   *                          current HTTP transaction.
   * @param {HttpResponse} res the <code>HttpResponse</code> instance for the  
   *                           current HTTP transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed, the
   *                          <code>result()</code> methods takes a 
   *                          <code>SessionError</code>   object as parameter.
   */
  public invalidateSession(req:HttpRequest, res:HttpResponse,
                                       result:(error?:SessionError)=>any):void {
    const cookies:any = req.getCookies();
    const sessionId:SessionId = SessionIdUtil.parseSessionIdCookie(cookies);
    this._sessionContext.unloadSession(
      sessionId,
      (err:SessionError) => {
        // TODO: treat error case
        this._loginModule.applyLogoutStrategy(req, res, result);
      }
    );
  }
}