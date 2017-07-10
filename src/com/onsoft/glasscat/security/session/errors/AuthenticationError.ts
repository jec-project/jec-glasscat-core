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

/**
 * A data transfert object for managing authentication errors.
 * 
 * 
 */
export class AuthenticationError {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>AuthenticationError</code> instance.
   * 
   * @param {number} statusCode the HTTP status code for this error. Valid 
   *                            values are constants of the 
   *                            <code>HttpStatusCode</code> ennum.
   */
  constructor(statusCode:number) {
    this._statusCode = statusCode;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The HTTP status code for this error. Valid values are constants of the
   * <code>HttpStatusCode</code> ennum.
   */
  private _statusCode:number = 0;
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the HTTP status code for this error. Valid values are constants of 
   * the <code>HttpStatusCode</code> ennum.
   * 
   * @return {number} a constant of the <code>HttpStatusCode</code> ennum.
   */
  public getStatusCode():number {
    return this._statusCode;
  }
}