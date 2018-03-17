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

import {LoginModule} from "./LoginModule";
import {LoginStrategyConfig} from "../config/LoginStrategyConfig";
import {LoginStrategy} from "../LoginStrategy";
import {HttpRequest, HttpResponse, Credentials, SessionOwner, JsletContext,
        Realm, AuthenticationError} from "jec-exchange";
import {RealmBuilder} from "../../realms/utils/RealmBuilder";
import {DefaultRealmBuilder} from "../../realms/utils/DefaultRealmBuilder";
import {SessionIdUtil} from "../../session/utils/SessionIdUtil";

/**
 * The abstract class for all <code>LoginModule</code> implementation.
 */
export abstract class AbstractLoginModule implements LoginModule {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractLoginModule</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>Realm</code> instance for this login module.
   */
  protected __realm:Realm = null;

  /**
   * The reference to the <code>LoginStrategy</code> instance for this login
   * module.
   */
  protected __strategy:LoginStrategy = null;

  /**
   * The reference to the <code>LoginStrategyConfig</code> instance for this
   * login module.
   */
  protected __loginStrategyConfig:LoginStrategyConfig = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setLoginStrategy(strategy:LoginStrategy):void {
    const builder:RealmBuilder = new DefaultRealmBuilder();
    const jsletContext:JsletContext = strategy.getJsletContext();
    this.__realm = builder.buildRealm(
      strategy.getLoginStrategyConfig(), jsletContext.getSecurityContext()
    );
    this.__strategy = strategy;
    this.__loginStrategyConfig = strategy.getLoginStrategyConfig();
  }

  /**
   * @inheritDoc
   */
  public applyLoginStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    result();
  }

  /**
   * @inheritDoc
   */
  public applyLogoutStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    res.clearCookie(SessionIdUtil.SESSION_ID_NAME);
    result();
  }

  /**
   * @inheritDoc
   */
  public applyAuthenticationStrategy(req:HttpRequest, res:HttpResponse,
                                    error:any, result:(error?:any)=>void):void {
    result(error);
  }
  
  /**
   * @inheritDoc
   */
  public getCredentials(req:HttpRequest):Credentials {
    return null;
  }
  
  /**
   * @inheritDoc
   */
  public authenticate(credentials:Credentials,
                                 success:(owner:SessionOwner)=>void,
                                 error:(error:AuthenticationError)=>void):void {
    this.__realm.authenticate(credentials, success, error);
  }
}