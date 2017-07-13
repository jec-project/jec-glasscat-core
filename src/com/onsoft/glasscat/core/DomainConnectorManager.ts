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

import {DomainConnector} from "../domains/connectors/DomainConnector";
import {LoggerManager} from "../util/logging/LoggerManager";
import {LocaleManager} from "../i18n/LocaleManager";
import {ContextRootUtil} from "../util/contextroot/ContextRootUtil";
import {HttpListener} from "../services/http/listeners/HttpListener";

/**
 * The <code>DomainConnectorManager</code> class provides the API for accessing 
 * to all <code>DomainConnector</code> instances in a GlassCat container.
 */
export class DomainConnectorManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConnectorManager</code> instance.
   */
  constructor() {
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the domain connectors for the current GlassCat container.
   */
  private _connectorMap:Map<string, DomainConnector> = null;

  /**
   * The reference to the <code>ContextRootUtil</code> instance for this object.
   */
  private _contextRootUtil:ContextRootUtil = null;

  /**
   * The path to the error rendering jslet.
   */
  private _errorPage:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this service manager.
   */
  public init():void {
      this._connectorMap = new Map<string, DomainConnector>();
      this._contextRootUtil = new ContextRootUtil();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Add the specified connector to this <code>DomainConnectorManager</code>
   * instance.
   *
   * @param {DomainConnector} connector the specified connector for this
   *                                    <code>DomainConnectorManager</code>
   *                                    instance.
   * @param {HttpListener} listener the <code>HttpListener</code> object used to 
   *                                build the context root reference for the 
   *                                specified connector.
   */
  public addConnector(connector:DomainConnector, listener:HttpListener):void {
    let i18n:LocaleManager = LocaleManager.getInstance();
    let contextRootRef:string = 
                    this._contextRootUtil.buildContextRoot(connector, listener);
    this._connectorMap.set(contextRootRef, connector);
    let msg:string = i18n.get("domains.connectors.added");
    msg += "\n   => " + i18n.get(
                            "domains.connectors.name",
                            connector.getName()
                          );
    msg += "\n   * " + i18n.get(
                            "domains.connectors.type",
                            connector.toString()
                          );
    msg += "\n   * " + i18n.get(
                            "domains.connectors.target",
                            connector.getTarget()
                          );
    msg += "\n   * " + i18n.get(
                            "domains.connectors.contextRoot",
                            connector.getContextRoot()
                          );
    msg += "\n   * " + i18n.get(
                            "domains.connectors.server",
                            connector.getServer()
                          );
    LoggerManager.getInstance().info(msg);
  }

  /**
   * Returns the <code>DomainConnectorManager</code> that matches with the 
   * specified context root.
   *
   * @param {string} contextRoot a context root associated with a
   *                            <code>DomainConnectorManager</code>.
   * @return {HttpBroker} the <code>DomainConnectorManager</code> that matches
   *                      with the  specified parameters; <code>null</code>
   *                      otherwise.
   */
  public getDomainConnector(contextRoot:string):DomainConnector {
    return this._connectorMap.get(contextRoot);
  }
  
  /**
   * Returns the path to the error rendering jslet.
   *
   * @return {string} the path to the error rendering jslet.
   */
  public getErrorPage():string {
    return this._errorPage;
  }
  
  /**
   * Sets the path to the error rendering jslet.
   *
   * @param {string} errorPage the path to the error rendering jslet.
   */
  public setErrorPage(errorPage:string):void {
    this._errorPage = errorPage;
  }
}
