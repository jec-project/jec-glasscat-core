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

import {SessionOwner, Credentials, Realm, RealmType, RealmConnector,
        AuthenticationError} from "jec-exchange";
import {LoginStrategyConfig} from "../login/config/LoginStrategyConfig";
import {AdminFileRealmConnector} from "./connectors/AdminFileRealmConnector";

/**
 * The <code>DefaultRealm</code> class is the basic implementation of the 
 * <code>Realm</code> interface in the GlassCat server.
 */
export class DefaultRealm implements Realm {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultRealm</code> instance.
   * 
   * @param {LoginStrategyConfig} config the login configuration used for the 
   *                                     building the realm.
   */
  constructor(config:LoginStrategyConfig) {
    this.init(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The type of realm for this realm. Valid values are constants of the
   * <code>RealmType</code> class.
   */
  private _realmType:string = null;

  /**
   * The reference to the <code>RealmConnector</code> instance for this realm
   * object.
   */
  private _realmConnector:RealmConnector = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {LoginStrategyConfig} config the login configuration used for the 
   *                                     building the realm.
   */
  private init(config:LoginStrategyConfig):void {
    // TODO: use configuration object to set internal properties when connectors
    // will be available.
    this._realmType = RealmType.ADMIN_FILE;
    if(this._realmType === RealmType.FILE) {
      this._realmConnector = new AdminFileRealmConnector();
    } else if(this._realmType === RealmType.ADMIN_FILE) {
      this._realmConnector = new AdminFileRealmConnector();
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getRealmType():string {
    return this._realmType;
  }

  /**
   * @inheritDoc
   */
  public getRealmConnector():RealmConnector {
    return this._realmConnector;
  }

  /**
   * @inheritDoc
   */
  public authenticate(credentials:Credentials,
                                success:(sessionOwner:SessionOwner)=> void,
                                error:(error:AuthenticationError)=> void):void {
    this._realmConnector.authenticate(credentials, success, error);
  }
}