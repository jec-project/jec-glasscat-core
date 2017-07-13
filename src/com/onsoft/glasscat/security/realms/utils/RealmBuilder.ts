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

import {SecurityContext, Realm} from "jec-exchange";
import {LoginStrategyConfig} from "../../login/config/LoginStrategyConfig";

/**
 * Provides the API for creating <code>Realm</code> builders.
 */
export interface RealmBuilder {

  /**
   * Builds and returns a <code>Realm</code> object, based on the specified 
   * security context.
   *
   * @param {LoginStrategyConfig} strategyConfig the configuration used for the 
   *                                             building the realm.
   * @param {SecurityContext} securityContext the security context associated
   *                                          with the realm connector.
   * @return {Realm} a new <code>Realm</code> object.
   */
  buildRealm(strategyConfig:LoginStrategyConfig,
                                         securityContext:SecurityContext):Realm;
}