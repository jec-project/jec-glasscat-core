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

import {JcadContext, Decorator, DecoratorConnector, JcadContextManager,
        DecoratorConnectorManager, BootstrapConnectorRefs} from "jec-commons";
import {BootstrapConnector} from "./connectors/BootstrapConnector";
import {BootstrapDecorator} from "./decorators/BootstrapDecorator";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A helper class that is used to manage desciptor contexts for the JEC 
 * bootstrap specification.
 */
export class BootstrapContextManager {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapContextManager</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>JcadContext</code> associated with this context
   * manager.
   */
  private _jcadContext:JcadContext = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the context for the specified reference.
   * 
   * @param {string} jcadReference the reference of the context to initialize.
   * @param {Class} decoratorClass the reference to the decorator class
   *                               associated with the context to initialize.
   */
  private initContext(jcadReference:string, decoratorClass:any):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    let decorator:Decorator = new decoratorClass();
    let connector:DecoratorConnector =
                               new BootstrapConnector(jcadReference, decorator);
    ctxManager.addContext(jcadReference, this._jcadContext);
    connManager.addConnector(connector, this._jcadContext);
  }

  /**
   * Removes the context with the specified reference.
   * 
   * @param {string} jcadReference the reference of the context to remove.
   */
  private removeContext(jcadReference:string):void {
    let ctxManager:JcadContextManager = JcadContextManager.getInstance();
    let connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    connManager.removeConnector(jcadReference, this._jcadContext);
    ctxManager.removeContext(jcadReference);
  }

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the JCAD context associated with this context manager.
   * 
   * @param {JcadContext} jcadContext the context of the Glasscat container.
   */
  public createContext(jcadContext:JcadContext):void {
    if(!jcadContext) {
      throw new GlassCatError(
        GlassCatErrorCode.INVALID_CONTEXT,
        "Context must not be null."
      )
    }
    this._jcadContext = jcadContext;
    this.initContext(
      BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF, BootstrapDecorator
    );
  }

  /**
   * Finalizes the JCAD context associated with this context manager.
   */
  public deleteContext():void {
    this.removeContext(BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF);
    this._jcadContext = null;
  }
  
  /**
   * Returns a boolean value that indicates whether the specified context is
   * registred in this context manager (<code>true</code>), or not
   * (<code>false</code>).
   * 
   * @param {string} jcadReference the reference to the context to check.
   * @param {boolean} <code>true</code> whether the specified context is
   *                  registred in this context manager; <code>false</code>
   *                  otherwhise.
   */
  public hasContext(jcadReference:string):boolean {
    return JcadContextManager.getInstance().hasContext(jcadReference);
  }
}
