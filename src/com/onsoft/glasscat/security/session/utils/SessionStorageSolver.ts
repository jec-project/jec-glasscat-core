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

import {SessionStorage} from "../connectors/SessionStorage";
import {LocalSessionStorage} from "../connectors/LocalSessionStorage";
import {SessionStorageType} from "jec-exchange";
import {EjpSessionConfig} from "../../../context/ejp/EjpSessionConfig";

/**
 * A utility class that resolves the session storage connector to use with a
 * a <code>SessionContext</code> instance.
 */
export class SessionStorageSolver {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SessionStorageSolver</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the <code>SessionStorage</code> implementation to be used by the
   * associated <code>SessionContext<code> object, depending on the specified
   * configuration.
   *
   * @param {EjpSessionConfig} config a reference to the session configuration  
   *                                  of the associated
   *                                 <code>SessionContext</code> implementation.
   * @return {SessionStorage} the <code>SessionStorage</code> implementation to 
   *                          be used by the associated
   *                          <code>SessionContext<code> object.
   */
  public getSessionStorage(config:EjpSessionConfig):SessionStorage {
    let sessionStorage:SessionStorage = null;
    let storage:SessionStorageType = config.storage
    if(storage) {
      switch(storage) {
        case SessionStorageType.DISTANT :
          break;
        case SessionStorageType.CUSTOM :
          break;
        case SessionStorageType.LOCAL :
        default :
          sessionStorage = new LocalSessionStorage();
      }
    } else sessionStorage = new LocalSessionStorage();
    return sessionStorage;
  }
}