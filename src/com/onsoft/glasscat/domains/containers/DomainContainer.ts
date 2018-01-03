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

import {DomainConnector} from "../connectors/DomainConnector";
import {DomainRequestError} from "../errors/DomainRequestError";
import {JsletManager} from "../../core/JsletManager";
import {HttpResponse, HttpRequest, JsletContext} from "jec-exchange";
import {HttpLocalProperties} from "../../services/http/utils/HttpLocalProperties";
import {LoginStrategy} from "../../security/login/LoginStrategy";
import {SourceFileInspector, JecContainer, BootstrapContext} from "jec-commons";

/**
 * The <code>DomainContainer</code> interface provides the API for managing 
 * domains deployed in a GlassCat container.
 */
export interface DomainContainer extends JecContainer {

  /**
   * Initializes this <code>DomainContainer</code> instance.
   *
   * @param {DomainConnector} connector the domain connector associated with
   *                                    this <code>DomainContainer</code>
   *                                    instance.
   * @param {JsletManager} jsletManager the reference to the  of
   *                                    <code>JsletManager</code> the GlassCat
   *                                    container.
   */
  init(connector:DomainConnector, jsletManager:JsletManager):void;

  /**
   * Returns the <code>BootstrapContext</code> object associated with this
   * container.
   *
   * @return {BootstrapContext} the <code>BootstrapContext</code> object for 
   *                            this container.
   */
  getBootstrapContext():BootstrapContext;

  /**
   * Returns the <code>JsletContext</code> object associated with this
   * container.
   *
   * @return {JsletContext} the <code>JsletContext</code> object for this
   *                        container.
   */
  getJsletContext():JsletContext;
  
  /**
   * Returns the <code>LoginStrategy</code> object associated with this
   * container.
   *
   * @return {LoginStrategy} the <code>LoginStrategy</code> object for this
   *                         container.
   */
  getLoginStrategy():LoginStrategy;

  /**
   * Returns the source file inspector for this domain.
   *
   * @return {SourceFileInspector} the source file inspector for this domain.
   */
  getSourceFileInspector():SourceFileInspector;

  /**
   * Performs internal jslet actions for a specific HTTP request.
   *
   * @param {HttpLocalProperties} properties the properties associated with the
   *                                         current HTTP transaction.
   * @param {HttpRequest} req the HTTP request for this operation.
   * @param {HttpResponse} res the HTTP response for this operation.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code>methods takes a
   *                          <code>DomainRequestError</code> error object as
   *                          parameter.
   */
  process(properties:HttpLocalProperties,
          req:HttpRequest, res:HttpResponse,
          result:(error?:DomainRequestError)=>any):void;
  
  /**
   * Returns the state of this GlassCat container. Possible values are constants
   * of the <code>DomainState</code> class.
   *
   * @return {string} a constant of the <code>DomainState</code> class.
   */
  getState():string;

  /**
   * Returns the mapped resource with the specified reference.
   *
   * @param {string} name the name of the mapped resource to find.
   * @return {string} the replacement value for the specified resource name,
   *                  or <code>undefined</code>.
   */
  getMappedResource(name:string):string;
}
