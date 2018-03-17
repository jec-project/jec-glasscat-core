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

import {Credentials} from "jec-exchange";
import {BasicCredentials} from "../BasicCredentials";

/**
 * A helper class that builds and returns object that implement the
 * <code>Credentials</code> interface.
 */
export class CredentialsBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>CredentialsBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methpds
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>Credentials</code> object, with the 
   * specified login and password.
   * 
   * @param {string} login the login for the new <code>Credentials</code>
   *                       object.
   * @param {string} password the password for the new <code>Credentials</code>
   *                          object.
   * @return {Credentials} a new <code>Credentials</code> object.
   */
  public build(login:string, password:string):Credentials {
    const crd:Credentials = new BasicCredentials();
    crd.login = login;
    crd.password = password;
    return crd;
  }
}