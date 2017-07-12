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

import {HttpListener} from "./HttpListener";
import {DefaultHttpListener} from "./DefaultHttpListener";
import {HttpMonitoring} from "./HttpMonitoring";
import {HttpListenerConfig} from "../../../context/core/HttpListenerConfig";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * The <code>HttpListenerFactory</code> class represents the factory class for 
 * creating GlassCat HTTP listener objects.
*/
export class HttpListenerFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpListenerFactory</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>HttpListener</code> instance based on the 
   * specified config.
   *
   * @param {HttpListenerConfig} config the config class for the 
   *                                    <code>HttpListener</code> instance to
   *                                    build.
   * @return {HttpListener} a new <code>HttpListener</code> instance.
   */
  public build(config:HttpListenerConfig):HttpListener {
     if(!config) {
      throw new GlassCatError(
        GlassCatErrorCode.INVALID_CONTEXT,
        "Config must not be null."
      )
    }
    let listener:HttpListener = new DefaultHttpListener(config);
    return listener;
  }
};
