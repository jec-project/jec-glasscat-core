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

import {FormProperties} from "./FormProperties";

/**
 * The <code>LoginStrategyConfig<code> interface provides the basic set of API  
 * for working with login strategy configurations.
 */
export interface LoginStrategyConfig {

  /**
   * Returns the authentication method specified for this
   * <code>LoginStrategyConfig</code> object. Possible values are constants of
   * the <code>AuthMethod</code> class.
   * 
   * @return {string} the authentication method specified for this 
   *                  <code>LoginStrategyConfig</code> object.
   */
  getAuthMethod():string;

  /**
   * Returns the form configuration specified for this 
   * <code>LoginStrategyConfig</code> object.
   * 
   * @return {FormProperties} the form configuration specified for this 
   *                          <code>LoginStrategyConfig</code> object.
   */
  getFormProperties():FormProperties;
  
  /**
   * Returns the reference to the realm property used for generating the basic 
   * authentication response header.
   * 
   * @return {string} the reference to the realm property used for generating 
   *                  the basic authentication response header.
   */
  getSecuredArea():string;
}