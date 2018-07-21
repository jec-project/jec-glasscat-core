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

import {LoggerManager} from "../../../util/logging/LoggerManager";
import {EjpConfigLoader} from "./EjpConfigLoader";
import {EjpConfig} from "jec-glasscat-config";
import {EjpConfigSerializer} from "./EjpConfigSerializer";
import {MappedPathUtil} from "../../../util/paths/MappedPathUtil";
import * as fs from "fs";
import {GlassCatLocaleManager} from "../../../i18n/GlassCatLocaleManager";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * A utility class for updating EJP configuration files.
 */
export class EjpConfigUpdater {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConfigUpdater</code> instance.
   */
  constructor() {
    this.init();
  }

  /**
   * The serializer object for this <code>EjpConfigUpdater</code> instance.
   */
  private _serializer:EjpConfigSerializer = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._serializer = new EjpConfigSerializer();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Updates the EJP configuration file for a GlassCat container.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance to update.
   * @param {Function} result the callback method called to handle the result of
   *                          this operation. This method takes the error object
   *                          reference as parameter.
   * @param {boolean} optimize indicates whether the JSON configuration file
   *                           must be optimized (<code>true</code>), or not
   *                          (<code> false</code>).
   */
  public update(projectPath:string, config:EjpConfig,
                                    result:(err:GlassCatError)=>void,
                                    optimize:boolean = false):void {
    const path:string =
      MappedPathUtil.getInstance().resolve(
          projectPath + EjpConfigLoader.MANIFEST_PATH
        );
    let glassCatError:GlassCatError = null;
    let stringErr:string = null;
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get("ejp.updateStart", path)
    );
    this._serializer.serialize(
      config,
      (data:string)=> {
        //console.log(data);
        fs.writeFile(path, data, (err:NodeJS.ErrnoException)=> {
          if(err) {
            LoggerManager.getInstance().info(
              GlassCatLocaleManager.getInstance().get(
                "ejp.updateFailed",
                path,
                err.message
              )
            );
            stringErr = err.toString();
            glassCatError = new GlassCatError(
              GlassCatErrorCode.CONFIG_UPDATE_ERROR, stringErr
            );
            result(glassCatError);
          } else {
            LoggerManager.getInstance().info(
              GlassCatLocaleManager.getInstance()
                                   .get("ejp.updateComplete", path)
            );
            result(null);
          }
        });
      },
      (err:any)=> {
        stringErr = err.toString();
        LoggerManager.getInstance().info(
          GlassCatLocaleManager.getInstance().get(
            "ejp.updateFailed",
            path,
            stringErr
          )
        );
        glassCatError = new GlassCatError(
          GlassCatErrorCode.CONFIG_UPDATE_ERROR, stringErr
        );
        result(glassCatError);
      },
      optimize
    );
  }
};
