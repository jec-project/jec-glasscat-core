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

import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";
import * as path from "path";

/**
 * A helper class that is used to resolve configuration paths based upon
 * GlassCat mapped shortcuts.
 */
export class MappedPathUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>MappedPathUtil</code> instance.
   */
  constructor() {
    if(MappedPathUtil._locked || MappedPathUtil.INSTANCE) {
      const msg:string = GlassCatLocaleManager.getInstance().get(
        "errors.singleton", "MappedPathUtil"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    MappedPathUtil._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>MappedPathUtil</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>MappedPathUtil</code> singleton instance reference.
   */
  private static INSTANCE:MappedPathUtil = null;

  /**
   * Returns a reference to the <code>MappedPathUtil</code> singleton.
   *
   * @return {MappedPathUtil} a reference to the <code>MappedPathUtil</code>
   *                          singleton.
   */
  public static getInstance():MappedPathUtil {
    if(MappedPathUtil.INSTANCE === null) {
      MappedPathUtil._locked = false;
      MappedPathUtil.INSTANCE = new MappedPathUtil();
    }
    return MappedPathUtil.INSTANCE;
  }

  /**
   * Initializes the <code>MappedPathUtil</code> singleton. This method is 
   * called by the <code>GlassCatContext</code> instance.
   *
   * @param {string} rootPath the reference to the path of the GlassCat root
   *                          directory.
   */
  public init(rootPath:string):void {
    this._rootPath = rootPath;
    this._glasscatPath = rootPath + MappedPathUtil.GLASSCAT_PATH;
    this._modulesPath = rootPath + MappedPathUtil.MODULES_PATH;
    this._initialized = rootPath ? true : false;
  }

  /**
   * Returns a boolean value that indicates whether the singleton is initialized 
   * (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether the singleton is initialized;
   *                   <code>false</code> otherwise.
   */
  public isInitialized():boolean {
    return this._initialized;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A boolean that indicates whether the singleton is initialized 
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _initialized:boolean = false;

  /**
   * The reference to the path of the GlassCat root directory.
   */
  private _rootPath:string = null;

  /**
   * The reference to the path of the GlassCat <code>src</code> directory.
   */
  private _glasscatPath:string = null;

  /**
   * The reference to the path of the GlassCat <code>modules</code> directory.
   */
  private _modulesPath:string = null;

  /**
   * The pattern used by developers to refer to the JEC <code>server</code>
   * directory in configuration files.
   */
  private static readonly SERVER_PATTERN:string = "${server}";

  /**
   * The pattern used by developers to refer to the GlassCat <code>root</code>
   * directory in configuration files.
   */
  private static readonly ROOT_PATTERN:string = "${root}";

  /**
   * The pattern used by developers to refer to the GlassCat
   * <code>modules</code> directory in configuration files.
   */
  private static readonly MODULES_PATTERN:string = "${modules}";

  /**
   * A sting used to define the path to the GlassCat <code>src</code> directory,
   * computed from the server root path.
   */
  private static readonly GLASSCAT_PATH:string = "/server/com/onsoft/glasscat";

  /**
   * A sting used to define the path to the GlassCat <code>modules</code>
   * directory, computed from the server root path.
   */
  private static readonly MODULES_PATH:string = "/public/modules";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves the specified <code>path</code> into an absolute path built from
   * the GlassCat root directory.
   * 
   * @param {string} rawPath the path to resolve.
   * @return {string} the resolved path.
   */
  public resolve(rawPath:string):string {
    let resolved:string = rawPath;
    if(resolved.indexOf(MappedPathUtil.ROOT_PATTERN) === 0) {
      resolved = resolved.replace(MappedPathUtil.ROOT_PATTERN, this._rootPath);
    } else if(resolved.indexOf(MappedPathUtil.SERVER_PATTERN) === 0) {
      resolved = resolved.replace(
        MappedPathUtil.SERVER_PATTERN, this._glasscatPath
      );
    } else if(resolved.indexOf(MappedPathUtil.MODULES_PATTERN) === 0) {
      resolved = resolved.replace(
        MappedPathUtil.MODULES_PATTERN, this._modulesPath
      );
    }
    return path.normalize(resolved);
  }
};
