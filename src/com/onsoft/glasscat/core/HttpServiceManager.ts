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

import {HttpService} from "../services/http/HttpService";
import {LoggerManager} from "../util/logging/LoggerManager";
import {LocaleManager} from "jec-commons-node";
import {HttpListener} from "../services/http/listeners/HttpListener";
import {DomainConnectorManager} from "../core/DomainConnectorManager";
import {SecurityManager} from "../core/SecurityManager";
import {GlassCatLocaleManager} from "../i18n/GlassCatLocaleManager";

/**
 * The manager for all HTTP services of the current GlassCat container.
 */
export class HttpServiceManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpServiceManager</code> instance.
   */
  constructor() {
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the http service for the current GlassCat container.
   */
  private _httpServiceMap:Map<String, HttpService> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this service manager.
   */
  public init():void {
      this._httpServiceMap = new Map<string, HttpService>();
  }
  
  /**
   * Initializes all <code>HttpService</code> objects by passing them a
   * reference to the manager objects instanciated whithin the kernel.
   *
   * @method initManagers
   * @param {DomainConnectorManager} connectorManager the reference to the
   *                                         <code>DomainConnectorManager</code>
   *                                                  instance.
   * @param {SecurityManager} securityManager the reference to the
   *                                          <code>SecurityManager</code>
   *                                          instance.
   */
  public initManagers(connectorManager:DomainConnectorManager,
                      securityManager:SecurityManager):void {
    this._httpServiceMap.forEach(function (svc:HttpService, key:String) {
      svc.initConnectors(connectorManager);
      svc.initSecurity(securityManager);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a HTTP service to this service manager.
   *
   * @param {HttpService} service the service to add.
   */
  public addService(service:HttpService):void {
    let i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    this._httpServiceMap.set(service.getHttpListener().getServer(), service);
    let msg:string = i18n.get("http.services.service.added");
    let listener:HttpListener = service.getHttpListener();
    msg += "\n   => " + i18n.get("http.services.service.id", listener.getId());
    msg += "\n   * " + i18n.get(
                          "http.services.service.server",
                          listener.getServer()
                        );
    msg += "\n   * " + i18n.get(
                          "http.services.service.config",
                          listener.getAdress(),
                          String(listener.getPort())
                        );
    msg += "\n   * " + i18n.get(
                          "http.services.service.secured",
                           String(listener.getSecured())
                         );
    LoggerManager.getInstance().info(msg);
  }

  /**
   * Returns the registered HTTP service with the specified name.
   *
   * @param {string} name the name of the service to return.
   * @returns {HttpService} the <code>HttpService</code> instance with the
   *                        specified name.
   */
  public getService(name:string):HttpService {
    return this._httpServiceMap.get(name);
  }

  /**
   * Starts the registered HTTP services.
   */
  public startServices():void {
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get("http.services.start")
    );
    let logMapElements = function (svc:HttpService, key:String) {
      if(!svc.isActive()) svc.start();
    }
    this._httpServiceMap.forEach(logMapElements);
  }

  /**
   * Stops the registered HTTP services.
   */
  public stopServices():void {
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get("http.services.stop")
    );
    let logMapElements = function (svc:HttpService, key:String) {
      if(svc.isActive()) svc.stop();
    }
    this._httpServiceMap.forEach(logMapElements);
  }
};
