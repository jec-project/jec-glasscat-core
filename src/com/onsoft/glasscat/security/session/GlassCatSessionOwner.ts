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

import {SecurityRole, SecurityConstraint, SessionOwner} from "jec-exchange";

/**
 * The <code>GlassCatSessionOwner</code> class represents the GlassCat  
 * implementation of the <code>SessionOwner</code> interface.
 */
export class GlassCatSessionOwner implements SessionOwner {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SecurityRole</code> instance.
   * 
   * @param {string} id the ID of the session owner, computed by the server.
   * @param {string} alias the session owner alias.
   * @param {Array<SecurityRole>} roles the collection of
   *                                    <code>SecurityRole</code> objects
   *                                    associated with the session owner. 
   */
  constructor(id:string, alias:string, roles:SecurityRole[]) {
    this.init(id, alias, roles);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

 /**
   * The ID of the session owner, computed by the server.
   */
  private _id:string = null;

  /**
   * The alias of the session owner.
   */
  private _alias:string = null;

  /**
   * The collection of <code>SecurityRole</code> objects associated with the 
   * session owner.
   */
  private _roles:SecurityRole[] = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} id the ID of the session owner, computed by the server.
   * @param {string} alias the session owner alias.
   * @param {Array<SecurityRole>} roles the collection of
   *                                    <code>SecurityRole</code> objects
   *                                    associated with the session owner. 
   */
  private init(id:string, alias:string, roles:SecurityRole[]):void {
    this._id = id;
    this._alias = alias;
    this._roles = roles;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getAlias():string {
    return this._alias;
  }
  
  /**
   * @inheritDoc
   */
  public isGranted(securityConstraint:SecurityConstraint):boolean {
    let granted:boolean = false;
    let len:number = this._roles.length;
    let role:SecurityRole = null;
    while(len--){
      role = this._roles[len];
      if(securityConstraint.hasRole(role.getName())) {
        granted = true;
        break;
      }
    }
    return granted;
  }
}