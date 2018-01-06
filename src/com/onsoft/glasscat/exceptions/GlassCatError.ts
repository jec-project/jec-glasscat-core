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

/**
 * The <code>GlassCatError</code> represents an exception thrown by a GlassCat 
 * container when an internal error occurs.
 */
export class GlassCatError extends Error {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatError</code> instance.
   * 
   * @param {number} code the code associated with this error. Valid values are
   *                      constants of the <code>GlassCatErrorCode</code> enum.
   * @param {string} message the error message.
   */
  constructor(code:number, message?:string) {
    super(message);
    this.initObj(code);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The code associated with this error. Valid values are constants of the
   * <code>GlassCatErrorCode</code> enum.
   */
  private _code:number = -1;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {number} code the code associated with this error. Valid values are
   *                      constants of the <code>GlassCatErrorCode</code> enum.
   */
  private initObj(code:number):void {
    this._code = code;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the code associated with this error.
   * 
   * @return {number} a constant of the <code>GlassCatErrorCode</code> enum.
   */
  public getCode():number {
    return this._code;
  }
}