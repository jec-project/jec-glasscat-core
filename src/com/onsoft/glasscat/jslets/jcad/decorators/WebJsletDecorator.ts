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

import {Decorator} from "jec-commons";
import {WebJsletParams, JsletError} from"jec-exchange";

/**
 * The <code>WebJsletDecorator</code> class defines the <code>Decorator</code>
 * implementation for the JEC <code>@WebJslet</code> decorator.
 */
export class WebJsletDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>WebJsletDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The string used to defined the internal metadata peroperty.
   */
  private static readonly METADATA_REF:string = "__webJsletMetadata";

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, params:WebJsletParams):any {
    
    ////////////////////////////////////////////////////////////////////////////
    // Validation process
    ////////////////////////////////////////////////////////////////////////////

    const patterns:string[] = params.urlPatterns;
    if(!patterns) {
      throw new JsletError("errors.jslet.patternsMissing");
    } else if(patterns.length === 0) {
      throw new JsletError("errors.jslet.patternsEmpty");
    }
    
    /*
     * The reference to the metadata passed to the WebJslet.
     */
    Reflect.defineProperty(target, WebJsletDecorator.METADATA_REF, {
      value: params,
      configurable: false,
      enumerable: false,
      writable: false
    });
    
    /*
     * @override
     */
    target.prototype.getName = function():string {
      return target.__webJsletMetadata.name;
    }

    /*
     * @override
     */
    target.prototype.getUrlPatterns = function():string[] {
      return target.__webJsletMetadata.urlPatterns;
    }
    
    if(target.__webJsletMetadata.template) {
      
      /*
       * @override
       */
      target.prototype.getTemplate = function():string {
        return target.__webJsletMetadata.template;
      }
    }
    
    return target;
  }
}
