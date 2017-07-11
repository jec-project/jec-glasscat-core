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

import {Credentials, SecurityContext, SecurityRole, RealmConnector,
        UserHashModule, SessionOwner, AuthenticationError} from "jec-exchange";

/**
 * The abstract class for all <code>RealmConnector</code> interface
 * implementations.
 */
export abstract class AbstractRealmConnector implements RealmConnector {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractRealmConnector</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The security context associated with this realm.
   */
  protected __securityContext:SecurityContext = null;

  /**
   * The <code>UserHashModule</code> instance associated with this realm.
   */
  protected __userHashModule:UserHashModule = null;

  //////////////////////////////////////////////////////////////////////////////
  // Protected methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A convenient method for extrating roles from registered user information.
   * 
   * @param {Array<string>} roles the list of roles to extract.
   * @return {Array<SecurityRole>} the list of extracted roles.
   */
  protected extractRoles(roles:string[]):SecurityRole[] {
    //TODO: add a RoleExtractor object for delegating this method
    let result:SecurityRole[] = new Array<SecurityRole>();
    let len:number = roles.length;
    let role:SecurityRole = null;
    let roleName:string = null;
    while(len--){
      roleName = roles[len];
      role = this.__securityContext.getSecurityRole(roleName);
      if(role) result.push(role);
      else console.log("invalid role: " + roleName);
      // TODO: decide what to do with invalid roles
    }
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public authenticate(credentials:Credentials,
                                 success:(owner:SessionOwner)=>void,
                                 error:(error:AuthenticationError)=>void):void {
    error(null);
  }

  /**
   * @inheritDoc
   */
  public setSecurityContext(securityContext:SecurityContext):void {
    this.__securityContext = securityContext;
  }

  /**
   * @inheritDoc
   */
  public setUserHashModule(userHashModule:UserHashModule):void {
    this.__userHashModule = userHashModule;
  }

  /**
   * @inheritDoc
   */
  public getUserHashModule():UserHashModule {
    return this.__userHashModule;
  }
}