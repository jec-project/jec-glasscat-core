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

import {HttpRequest, HttpResponse, Credentials, SessionOwner,
        AuthenticationError} from "jec-exchange";
import {LoginStrategy} from "../LoginStrategy";

/**
 * The <code>LoginModule</code> interface provides the basic set of API for 
 * creating contexts to be used by a login strategy.
 */
export interface LoginModule {

  /**
   * Sets the configuration for this object.
   * 
   * @param {LoginStrategy} strategy the <code>LoginStrategy</code> that is used  
   *                                 to initialize this login module.
   */
  setLoginStrategy(strategy:LoginStrategy):void;

  /**
   * Applies the login strategy for the current HTTP transaction.
   *
   * @param {HttpRequest} req the HTTP request for the current HTTP
   *                          transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                           transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes an error 
   *                          object as parameter.
   */
  applyLoginStrategy(req:HttpRequest, res:HttpResponse,
                                                result:(error?:any)=>void):void;

  /**
   * Applies the logout strategy for the current HTTP transaction.
   *
   * @param {HttpRequest} req the HTTP request for the current HTTP
   *                          transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                           transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes an error 
   *                          object as parameter.
   */
  applyLogoutStrategy(req:HttpRequest, res:HttpResponse,
                                                result:(error?:any)=>void):void;

  //TODO: add types to errors in the following method                                             
  /**
   * Applies the login strategy, depending on the authentication result, for the
   * current HTTP transaction.
   *
   * @param {HttpRequest} req the HTTP request for the current HTTP
   *                          transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP
   *                           transaction.
   * @param {any} error an error occured during the authentication process,
   *                    whether the authentication failed, or <code>null</code>.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes an error 
   *                          object as parameter.
   */
  applyAuthenticationStrategy(req:HttpRequest, res:HttpResponse, error:any,
                                                result:(error?:any)=>void):void;
  
  /**
   * Returns the <code>Crendentials</code> instance for the specified HTTP
   * request.
   * 
   * @param {HttpRequest} req the HTTP request for which to extract the
   *                          credentials.
   * @return {Crendentials} the <code>Crendentials</code> instance for the 
   *                        specified HTTP request.
   */
  getCredentials(req:HttpRequest):Credentials;
  
  /**
   * Authenticates the specified crendentials.
   *
   * @param {Credentials} credentails the user's credentails.
   * @param {Function} success the callback method called when the crendentials
   *                           are authenticated.
   * @param {Function} error the callback method called when the crendentials
   *                         are not authenticated. The callback method must
   *                         specify an <code>AuthenticationError</code> object
   *                         parameter.
   */
  authenticate(credentails:Credentials,
                                  success:(owner:SessionOwner)=>void,
                                  error:(error:AuthenticationError)=>void):void;
}