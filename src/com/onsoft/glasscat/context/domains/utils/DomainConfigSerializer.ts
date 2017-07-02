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

import {DomainConfig} from "../DomainConfig";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * A utility class for serializing <code>DomainConfig</code> instances.
 */
export class DomainConfigSerializer {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConfigSerializer</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Serializes the domains configuration object for a GlassCat container.
   *
   * @param {DomainConfig} config the <code>DomainConfig</code> instance to
   *                              serialize.
   * @param {Function} success the callback method called to handle the result 
   *                           of this operation. This method takes the data 
   *                           object reference as parameter.
   * @param {Function} error the callback method called to handle the failure of
   *                         this operation. This method takes the error object
   *                         reference as parameter.
   */
  public serialize(config:DomainConfig, success:(data:string)=>void,
                                        error:(err:GlassCatError)=>void):void {
    try {
      let data:string = JSON.stringify(config);
      success(data);
    } catch(e) {
      let err:GlassCatError =
             new GlassCatError(GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR, e);
      error(err);
    }
  }
};
