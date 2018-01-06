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

import {RealmBuilder} from "./RealmBuilder";
import {DefaultRealm} from "../DefaultRealm";
import {SecurityContext, Realm} from "jec-exchange";
import {LoginStrategyConfig} from "../../login/config/LoginStrategyConfig";

/**
 * The default implementation of the <code>RealmBuilder</code> interface.
 */
export class DefaultRealmBuilder implements RealmBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultRealmBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public buildRealm(strategyConfig:LoginStrategyConfig,
                                        securityContext:SecurityContext):Realm {
    let realm:Realm = new DefaultRealm(strategyConfig);
    realm.getRealmConnector().setSecurityContext(securityContext);
    return realm;
  }
}