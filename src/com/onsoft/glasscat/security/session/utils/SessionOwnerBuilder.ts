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

import {SessionOwner, SecurityRole} from "jec-exchange";
import {GlassCatSessionOwner} from "../GlassCatSessionOwner";

/**
 * A utility class for building EJP session owners.
 */
export class SessionOwnerBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SessionOwnerBuilder</code> instance.
   */
  constructor() { }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>SessionOwner</code> object.
   * 
   * @param {string} id the ID for the session owner, computed by the server.
   * @param {string} alias the session owner alias.
   * @param {Array<SecurityRole>} roles the collection of
   *                                    <code>SecurityRole</code> objects 
   *                                    associated with the session owner. 
   * @return {SessionOwner} a new session owner initialized with the specified
   *                        parameters.
   */
  public build(id:string, alias:string, roles:SecurityRole[]):SessionOwner {
    let owner:SessionOwner = new GlassCatSessionOwner(id, alias, roles);
    return owner;
  }
}