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

import {HttpListener} from "./listeners/HttpListener";
import {DomainConnectorManager} from "../../core/DomainConnectorManager";
import {SecurityManager} from "../../core/SecurityManager";

/**
 * The <code>HttpService</code> interface contains methods for services that 
 * manage HTTP virtual servers.
 */
export interface HttpService {

  /**
   * Returns the <code>HttpListener</code> objects for this 
   * <code>HttpService</code> object.
   *
   * @return {HttpListener} the <code>HttpListener</code> objects for this 
   *                        <code>HttpService</code> object.
   */
  getHttpListener():HttpListener;

  /**
   * Initializes the <code>DomainConnectorManager</code> object for this
   * <code>HttpService</code> object.
   *
   * @param {DomainConnectorManager} connectorManager the reference to the
   *                                         <code>DomainConnectorManager</code>
   *                                                  instance.
   */
  initConnectors(connectorManager:DomainConnectorManager):void;
  
  /**
   * Initializes the <code>SecurityManager</code> instance for this
   * <code>HttpService</code> object.
   *
   * @param {SecurityManager} securityManager the reference to the
   *                                          <code>SecurityManager</code>
   *                                          instance.
   */
  initSecurity(securityManager:SecurityManager):void;

  /**
   * Starts the HTTP virtual server for this <code>HttpService</code> object.
   */
  start():void;

  /**
   * Stops the HTTP virtual server for this <code>HttpService</code> object.
   */
  stop():void;

  /**
   * Returns a boolean value that indicates wether this <code>HttpService</code> 
   * object is started (<code>true</code>), or not (<code>false</code>).
   *
   * @return {boolean} a boolean value that indicates wether this service is
   *                   started (<code>true</code>), or not (<code>false</code>).
   */
  isActive():boolean;
}
