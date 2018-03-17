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

import {DomainConfig} from "../DomainConfig";
import {DomainConfigSerializer} from "./DomainConfigSerializer";
import {MappedPathUtil} from "../../../util/paths/MappedPathUtil";
import * as fs from "fs";

/**
 * A utility class for updating GlassCat domain context configuration files.
 */
export class DomainConfigUpdater {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConfigUpdater</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the domains configuration file.
   */
  private static readonly DOMAIN_FILE_PATH:string =
                                         "${root}/public/domains/manifest.json";
  
  /**
   * The serializer object for this <code>DomainConfigUpdater</code> instance.
   */
  private _serializer:DomainConfigSerializer = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._serializer = new DomainConfigSerializer();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Updates the domains configuration file for a GlassCat container.
   *
   * @param {DomainConfig} config the <code>DomainConfig</code> instance to
   *                              update.
   * @param {Function} result the callback method called to handle the result of
   *                         this operation. This method takes the error object
   *                         reference as parameter.
   */
  public update(config:DomainConfig, result:(err:any)=>void):void {
    const path:string =
     MappedPathUtil.getInstance().resolve(DomainConfigUpdater.DOMAIN_FILE_PATH);
    this._serializer.serialize(
      config,
      (data:string)=> {
        //console.log(data);
        fs.writeFile(path, data, result);
      },
      (err:any)=> {
        result(err);
      }
    );
  }
};
