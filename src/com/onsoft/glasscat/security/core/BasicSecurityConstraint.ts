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

import {UrlPattern} from "jec-commons";
import {SecurityConstraint} from "jec-exchange";
import {UrlPatternBuilder} from "../../util/url/UrlPatternBuilder";
import {EjpConstraintConfig} from "../../context/ejp/EjpConstraintConfig";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The default implementation of the <code>SecurityConstraint</code> interface 
 * for a GlassCat application.
 */
export class BasicSecurityConstraint implements SecurityConstraint {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicSecurityConstraint</code> instance.
   * 
   * 
   * @param {EjpConstraintConfig} context the context that is used to initialize 
   *                                      this <code>SecurityConstraint</code>
   *                                      object.
   */
  constructor(context:EjpConstraintConfig){
    this.init(context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * The name of this security constraint.
   */
  private _name:string = null;

  /**
   * The redirection URL in case of security error.
   */
  private _errorUrl:string = null;

  /**
   * The <code>UrlPattern</code> used to identify the ressource protected by  
   * this security constraint.
   */
  private _urlPattern:UrlPattern = null;

  /**
   * A <code>Map</code> that contains all the role references that permit access 
   * to the resources protected by this security constraint.
   */
  private _roles:Map<string, boolean> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initializes this object.
   * 
   * @param {EjpConstraintConfig} context the context that is used to initialize 
   *                                      this <code>SecurityConstraint</code>
   *                                      object.
   */
  private init(context:EjpConstraintConfig):void {
    if(!context) {
      throw new GlassCatError(GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
    }
    this._name = context.name;
    this._errorUrl = context.errorUrl;
    let urlPatternBuilder:UrlPatternBuilder = new UrlPatternBuilder();
    this._urlPattern = urlPatternBuilder.build(context.urlPattern);
    let roles:string[] = context.roles;
    let len:number = roles.length;
    this._roles = new Map<string, boolean>();
    while(len--){
      this._roles.set(roles[len], true);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * @inheritDoc
   */
  public getName():string {
    return this._name;
  }

  /**
   * @inheritDoc
   */
  public getUrlPattern():UrlPattern {
    return this._urlPattern;
  }

  /**
   * @inheritDoc
   */
  public hasRole(role:string):boolean {
    return this._roles.has(role);
  }

  /**
   * @inheritDoc
   */
  public getErrorUrl():string {
    return this._errorUrl;
  }
}