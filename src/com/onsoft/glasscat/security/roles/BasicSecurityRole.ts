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

import {SecurityRole} from "jec-exchange";

/**
 * Provides the default implementation for the <code>SecurityRole</code>
 * interface.
 */
export class BasicSecurityRole implements SecurityRole {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicSecurityRole</code> instance.
   * 
   * @param {string} name the name of the security role.
   */
  constructor(name:string) {
    this.initObj(name);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Protected properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The name of this <code>SecurityRole</code> instance.
   */
  protected __name:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SecurityRole</code> instance.
   * 
   * @param {string} name the name of the security role.
   */
  private initObj(name:string):void {
    this.__name = name;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getName():string {
    return this.__name;
  }
}