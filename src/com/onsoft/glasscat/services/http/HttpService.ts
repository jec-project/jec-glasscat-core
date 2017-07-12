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
 * The __HttpService__ interface contains methods for services that manage HTTP
 * virtual servers.
 * @interface
 */
export interface HttpService {

  /**
   * Returns the __HttpListener__ objects for this __HttpService__ instance.
   *
   * @method getHttpListener
   * @return {HttpListener} the __HttpListener__ objects for this __HttpService__
   *                        instance.
   */
  getHttpListener():HttpListener;

  /**
   * Initializes the __DomainConnectorManager__ object for this __HttpService__
   * instance.
   *
   * @method initConnectors
   * @param {DomainConnectorManager} connectorManager the reference to the
   *                                        __DomainConnectorManager__ instance.
   */
  initConnectors(connectorManager:DomainConnectorManager):void;
  
  /**
   * Initializes the __SecurityManager__ object for this __HttpService__
   * instance.
   *
   * @method initSecurity
   * @param {SecurityManager} securityManager the reference to the
   *                                          __SecurityManager__ instance.
   */
  initSecurity(securityManager:SecurityManager):void;

  /**
   * Starts the HTTP virtual server for this __HttpService__ instance.
   *
   * @method start
   */
  start():void;

  /**
   * Stops the HTTP virtual server for this __HttpService__ instance.
   *
   * @method void
   */
  stop():void;

  /**
   * Returns a boolean value that indicates wether this HttpService instance is
   * active (__true__), or not (__false__).
   *
   * @method isActive
   * @return {boolean} a boolean value that indicates wether this service is
   *                   active (__true__), or not (__false__).
   */
  isActive():boolean;
}
