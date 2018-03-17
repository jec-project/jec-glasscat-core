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

import {LoginStrategyConfig} from "./LoginStrategyConfig";
import {AuthMethod} from "jec-exchange";
import {FormProperties} from "./FormProperties";
import {EjpLoginConfig} from "../../../context/ejp/EjpLoginConfig";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * The GlassCat default implementation of the <code>LoginStrategyConfig</code>
 * interface.
 */
export class EjpLoginStrategyConfig implements LoginStrategyConfig {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>FormProperties</code> instance.
   * 
   * 
   * @param {EjpLoginConfig} context the context that is used to initialize this
   *                                 <code>LoginStrategyConfig</code> object.
   */
  constructor(context:EjpLoginConfig) {
    this.init(context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initializes this object.
   * 
   * @param {EjpLoginConfig} context the context that is used to initialize this
   *                                 <code>LoginStrategyConfig</code> object.
   */
  private init(context:EjpLoginConfig):void {
    if(!context) {
      throw new GlassCatError(
        GlassCatErrorCode.NULL_EJP_CONFIG,
        "context must not be null"
      );
    }
    const authMethod:AuthMethod = context.authMethod;
    let realm:any = null;
    if(authMethod) {
      this._context = context;
      this._authMethod = authMethod;
      this._formProperties = new FormProperties(context.formConfig);
      realm = context.realm;
      if(realm) {
        this._securedArea = realm.securedArea;
      } else {
        this._securedArea = "securedArea";
      }
    } else {
      this._authMethod = AuthMethod.NONE;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * The context for this <code>LoginStrategyConfig</code> object, as defined by 
   * the <code>web.json</code> configuration file.
   */
  private _context:EjpLoginConfig = null;

  /**
   * The authentication method specified for this
   * <code>LoginStrategyConfig</code> object.
   */
  private _authMethod:AuthMethod = null;

  /**
   * The form configuration for this <code>LoginStrategyConfig</code> object.
   */
  private _formProperties:FormProperties = null;

  /**
   * The realm property used for generating the basic authentication response
   * header.
   */
  private _securedArea:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getAuthMethod():AuthMethod {
    return this._authMethod;
  }

  /**
   * @inheritDoc
   */
  public getFormProperties():FormProperties {
    return this._formProperties;
  }

  /**
   * @inheritDoc
   */
  public getSecuredArea():string {
    return this._securedArea;
  }
}