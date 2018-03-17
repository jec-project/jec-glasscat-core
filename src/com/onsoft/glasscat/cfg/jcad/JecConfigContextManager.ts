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

import {JcadContext, Decorator, DecoratorConnector, JcadContextManager,
        DecoratorConnectorManager, ConfigConnectorRefs} from "jec-commons";
import {JecConfigConnector} from "./connectors/JecConfigConnector";
import {CacheControlDecorator} from "./decorators/CacheControlDecorator";
import {StaticResourceDecorator} from "./decorators/StaticResourceDecorator";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A helper class that is used to manage desciptor contexts for the JEC config
 * decorators specification.
 */
export class JecConfigContextManager {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JecConfigContextManager</code> instance.
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
    const ctxManager:JcadContextManager = JcadContextManager.getInstance();
    const connManager:DecoratorConnectorManager =
                                        DecoratorConnectorManager.getInstance();
    const decorator:Decorator = new decoratorClass();
    const connector:DecoratorConnector =
                               new JecConfigConnector(jcadReference, decorator);
    ctxManager.addContext(jcadReference, this._jcadContext);
    connManager.addConnector(connector, this._jcadContext);
  }

  /**
   * Removes the context with the specified reference.
   * 
   * @param {string} jcadReference the reference of the context to remove.
   */
  private removeContext(jcadReference:string):void {
    const ctxManager:JcadContextManager = JcadContextManager.getInstance();
    const connManager:DecoratorConnectorManager =
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
   * @param {JcadContext} jcadContext the context of the GlassCat container.
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
      ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF, CacheControlDecorator
    );
    this.initContext(
      ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF, StaticResourceDecorator
    );
  }

  /**
   * Finalizes the JCAD context associated with this context manager.
   */
  public deleteContext():void {
    this.removeContext(ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF);
    this.removeContext(ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF);
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
