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

import {GlassCatError} from "../../exceptions/GlassCatError";

/**
 * The <code>ConfigLoader</code> interface specifies the default API you must 
 * implement to create GlassCat configuration files loaders.
 */
export interface ConfigLoader {

  /**
   * Loads and returns a configuration file for a GlassCat container.
   *
   * @return {any} a configuration file for a GlassCat container.
   */
  loadSync():any;
  
  /**
   * Loads the configuration file for a GlassCat container.
   *
   * @param {Function} success the callback method called in case of file
   *                           loading success. This method takes the loaded
   *                           file reference as parameter.
   * @param {Function} error the callback method called in case of file
   *                           loading error. This method takes the error
   *                           reference as parameter.
   */
  load(success:(data:any)=>void, error:(err:GlassCatError)=>void):void;
};
