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

import {MappedPathUtil} from "../paths/MappedPathUtil";
import {LoggerManager} from "../logging/LoggerManager";
import {LocaleManager, GlobalJsonLoader} from "jec-commons-node";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The base class for creating GlassCat configuration files loaders.
 */
export abstract class ConfigLoaderBase {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ConfigLoaderBase</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Protected methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Loads and returns the specified configuration file for a GlassCat container.
   *
   * @param {string} filePath the configuration file to load.
   * @return {any} a configuration file for a GlassCat container.
   */
  protected loadConfigSync(filePath:string):any {
    const path:string = MappedPathUtil.getInstance().resolve(filePath);
    let json:any = null;
    let logManager:LoggerManager = null;
    let i18n:LocaleManager = null;
    try {
      json = GlobalJsonLoader.getInstance().loadSync(path);
    } catch(e) {
      logManager = (LoggerManager.getInstance() as LoggerManager);
      i18n = GlassCatLocaleManager.getInstance();
      if(logManager.isInitialized() && i18n.isInitialized()) {
        logManager.error(i18n.get("errors.loadingFile", e));
      }
      throw new GlassCatError(GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
    }
    return json;
  }
  
  /**
   * Loads the specified configuration file for a GlassCat container.
   *
   * @param {string} filePath the configuration file to load.
   * @param {Function} success the callback method called in case of file
   *                           loading success. This method takes the loaded
   *                           file reference as parameter.
   * @param {Function} error the callback method called in case of file loading
   *                         error. This method takes a
   *                         <code>GlassCatError</code> object as parameter.
   */
  protected loadConfig(filePath:string, success:(data:any)=>void,
                                         error:(err:GlassCatError)=>void):void {
    const path:string = MappedPathUtil.getInstance().resolve(filePath);
    let logManager:LoggerManager = null;
    let i18n:LocaleManager = null;
    let gcError:GlassCatError = null;
    GlobalJsonLoader.getInstance().load(path, success, (e:any)=> {
      logManager = (LoggerManager.getInstance() as LoggerManager);
      i18n = GlassCatLocaleManager.getInstance();
      if(logManager.isInitialized() && i18n.isInitialized()) {
        logManager.error(i18n.get("errors.loadingFile", e));
      };
      gcError = new GlassCatError(GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
      error(gcError);
    });
  }
};
