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

import {ConfigLoaderBase} from "../../../util/loaders/ConfigLoaderBase";
import {GlassCatError} from "../../../exceptions/GlassCatError";

/**
 * A parser utility for loading GlassCat EJP manifest files.
 */
export class EjpConfigLoader extends ConfigLoaderBase {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConfigLoader</code> instance.
   */
   constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the EJP manifest file.
   */
  public static readonly MANIFEST_PATH:string = "/JEC-INF/web.json";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Loads and returns the specified EJP manifest file for a GlassCat container.
   *
   * @param {string} projectPath the path to the EJP manifest file to load.
   * @return {any} the EJP manifest file for a GlassCat container.
   */
  public loadSync(projectPath:string):any {
    return super.loadConfigSync(projectPath + EjpConfigLoader.MANIFEST_PATH);
  }
  
  /**
   * Loads the specified EJP manifest file for a GlassCat container.
   *
   * @param {string} projectPath the path to the EJP manifest file to load.
   * @param {Function} success the callback method called in case of file
   *                           loading success. This method takes the loaded
   *                           file reference as parameter.
   * @param {Function} error the callback method called in case of file
   *                           loading error. This method takes the error
   *                           reference as parameter.
   */
  public load(projectPath:string, 
              success:(data:any)=>void,
              error:(err:GlassCatError)=>void):void {
    super.loadConfig(
      projectPath + EjpConfigLoader.MANIFEST_PATH,
      success,
      error
    );
  }
}
