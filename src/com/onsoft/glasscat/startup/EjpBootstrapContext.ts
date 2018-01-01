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

import {LocaleManager} from "jec-commons-node";
import {GlassCatLocaleManager} from "../i18n/GlassCatLocaleManager";
import {LoggerManager} from "../util/logging/LoggerManager";
import {AbstractContainerContext} from "../context/core/AbstractContainerContext";
import {DomainConnector} from "../domains/connectors/DomainConnector";
import {Logger, BootstrapScript, BootstrapContext} from "jec-commons";

/**
 * The <code>EjpBootstrapContext</code> class represents the bootstrap context 
 * for a <code>EjpContainer</code> instance.
 */
export class EjpBootstrapContext extends AbstractContainerContext
                                 implements BootstrapContext {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpBootstrapContext</code> instance.
   * 
   * @param {DomainConnector} connector The domain connector on which is 
   *                                    deployed this jslet context.
   */
  constructor(connector:DomainConnector) {
    super(connector);
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The collection that contains all bootstrap classes for this context.
   */
  private _scriptList:BootstrapScript[] = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._scriptList = new Array<BootstrapScript>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addScript(script:BootstrapScript):void {
    let i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    let msg:string = i18n.get(
      "bootstrap.added", script.constructor.name
    );
    this._scriptList.push(script);
    LoggerManager.getInstance().info(msg);
  }

  /**
   * @inheritDoc
   */
  public getScriptList():BootstrapScript[] {
    return this._scriptList;
  }
}