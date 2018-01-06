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

import {MappedPathUtil} from "../../util/paths/MappedPathUtil";
import * as fs from "fs";
import {BootstrapConfig} from "../core/BootstrapConfig";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A utility class for updating the GlassCat context configuration file.
 */
export class GlassCatConfigUpdater {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatConfigUpdater</code> instance.
   */
  constructor() {}

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
   * Updates the bootstrap configuration file for a GlassCat container.
   *
   * @method update
   * @param {BootstrapConfig} config the <code>BootstrapConfig</code> to update
   *                         reference as parameter.
   * @param {Function} error the callback method called to handle the result of
   *                         this operation. This method takes the error object
   *                         reference as parameter.
   */
  public update(config:BootstrapConfig, result:(err:any)=>void):void {
    let path:string =
      MappedPathUtil.getInstance()
                    .resolve(GlassCatConfigUpdater.BOOTSTRAP_FILE_PATH);
    let data:string = JSON.stringify(config);
    let glassCatError:GlassCatError = null;
    //console.log(data);
    fs.writeFile(
      path,
      data,
      (error:NodeJS.ErrnoException)=> {
        if(error) {
          glassCatError = new GlassCatError(
            GlassCatErrorCode.CONFIG_UPDATE_ERROR,
            String(error)
          )
        }
        result(glassCatError);
      }
    );
  }
};
