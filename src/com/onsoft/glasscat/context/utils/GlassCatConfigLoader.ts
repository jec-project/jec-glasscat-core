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

import {ConfigLoaderBase} from "../../util/loaders/ConfigLoaderBase";
import {ConfigLoader} from "../../util/loaders/ConfigLoader";
import {GlassCatError} from "../../exceptions/GlassCatError";

/**
 * A utility class for loading the GlassCat context configuration file.
 */
export class GlassCatConfigLoader extends ConfigLoaderBase 
                                  implements ConfigLoader {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatConfigLoader</code> instance.
   */
   constructor() {
    super();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the bootstrap configuration file.
   */
  private static readonly BOOTSTRAP_FILE_PATH:string =
                                            "${root}/public/cfg/bootstrap.json";

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public loadSync():any {
    return super.loadConfigSync(GlassCatConfigLoader.BOOTSTRAP_FILE_PATH);
  }
  
  /**
   * @inheritDoc
   */
  public load(success:(data:any)=>void, error:(err:GlassCatError)=>void):void {
    super.loadConfig(
      GlassCatConfigLoader.BOOTSTRAP_FILE_PATH,
      success,
      error
    );
  }
};
