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

import {Jslet, JsletContext} from "jec-exchange";

/**
 * The <code>JsletManager</code> class represents the core of the jslet engine 
 * in GlassCat containers.
 */
export class JsletManager {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JsletManager</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The map that contains all jslet contexts for a GlassCat container.
   */
  private _jsletContextMap:Map<string, JsletContext> = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initilaizes this object.
   */
  private init():void {
    this._jsletContextMap = new Map<string, JsletContext>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a new <code>JsletContext</code> object to this context
   * <code>JsletManager</code>.
   * 
   * @param {string} ref the string to reference the context to add; generally a
   *                     context root.
   * @param {JsletContext} context the context to add to this
   *                               <code>JsletManager</code>.
   */
  public addContext(ref:string, context:JsletContext):void {
    this._jsletContextMap.set(ref, context);
  }

  /**
   * Returns the <code>JsletContext</code> instance with the sepecified
   * reference.
   * 
   * @param {string} ref the reference of the context to get; generally a
   *                     context root.
   * @return {JsletContext} the context with the specified reference, or
   *                        <code>undefined</code> whether the reference does
   *                        not exists.
   */
  public getContext(ref:string):JsletContext {
    return this._jsletContextMap.get(ref);
  }

  /**
   * Returns the <code>Jslet</code> object that matches the specified
   * parameters.
   * 
   * @param {string} ref the reference of the context that asks for the jslet.
   * @param {string} url the URL for which to find a jslet.
   * @return {Jslet} the jslet that matches the specified parameters, or
   *                 <code>undefined</code> whether the jslet does not exists.
   */
  public getJslet(ref:string, url:string):Jslet {
    let jslet:Jslet = undefined;
    let ctx:JsletContext = this.getContext(ref);
    if(ctx) jslet = ctx.getJslet(url);
    return jslet;
  }
};
