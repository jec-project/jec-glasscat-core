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

import {UrlPattern} from "jec-commons";
import {StaticResources} from "jec-exchange";
import {UrlPatternBuilder} from "../../util/url/UrlPatternBuilder";
import {EjpStaticResourcesConfig} from "jec-glasscat-config";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The default implementation of the <code>StaticResources</code> interface for 
 * a GlassCat application.
 * 
 * @param {EjpStaticResourcesConfig} context the context that is used to initialize
 *                                        this <code>StaticResources</code> object.
 */
export class BasicStaticResources implements StaticResources {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicStaticResources</code> instance.
   * 
   * 
   * @param {EjpStaticResourcesConfig} context the context that is used to  
   *               initialize this <code>EjpStaticResourcesConfig</code> object.
   */
  constructor(context:EjpStaticResourcesConfig){
    this.init(context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * The <code>UrlPattern</code> instance used to identify the static ressources
   * URLs.
   */
  private _urlPattern:UrlPattern = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initializes this object.
   * 
   * @param {EjpStaticResourcesConfig} context the context that is used to
   *                        initialize this <code>StaticResources</code> object.
   */
  private init(context:EjpStaticResourcesConfig):void {
    if(!context) {
      throw new GlassCatError(GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
    }
    const builder:UrlPatternBuilder = new UrlPatternBuilder();
    this._urlPattern = builder.build(context.urlPattern);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * @inheritDoc
   */
  public getUrlPattern():UrlPattern {
    return this._urlPattern;
  }
}