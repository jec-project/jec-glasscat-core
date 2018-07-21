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

import {EjpFormConfig} from "jec-glasscat-config";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * The <code>FormProperties</code> class provides the form login configuration.
 *
 */
export class FormProperties {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>FormProperties</code> instance.
   * 
   * 
   * @param {EjpFormConfig} context the context that is used to initialize this
   *                             <code>FormProperties</code> object.
   */
  constructor(context:EjpFormConfig) {
    this.init(context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The login URL for this module.
   */
  private _loginUrl:string = null;

  /**
   * The error URL for this module.
   */
  private _errorUrl:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {EjpFormConfig} context the context that is used to initialize this
   *                                <code>FormProperties</code> object.
   */
  private init(context:EjpFormConfig):void {
    if(!context) {
      throw new GlassCatError(
        GlassCatErrorCode.NULL_EJP_CONFIG,
        "context must not be null"
      );
    }
    this._loginUrl = context.loginUrl;
    this._errorUrl = context.errorUrl;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the login URL for this <code>FormProperties</code> object.
   * 
   * @return {string} the login URL for this <code>FormProperties</code> object.
   */
  public getLoginUrl():string {
    return this._loginUrl;
  }

  /**
   * Returns the error URL for this <code>FormProperties</code> object.
   * 
   * @return {string} the error URL for this <code>FormProperties</code> object.
   */
  public getErrorUrl():string {
    return this._errorUrl;
  }
}