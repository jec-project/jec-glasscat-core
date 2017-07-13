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

import {HttpListenerFactory} from '../listeners/HttpListenerFactory';
import {HttpListener} from '../listeners/HttpListener';
import {HttpService} from '../HttpService';
import {DefaultHttpService} from '../DefaultHttpService';
import {HttpListenerConfig} from "../../../context/core/HttpListenerConfig";

/**
 * The <code>HttpServiceFactory</code> class creates HTTP services based upon  
 * the specified config.
 */
export class HttpServiceFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpServiceFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>HttpService</code> instance.
   *
   * @param {HttpListenerConfig} config the config object for the service to
   *                                    to build.
   * @return {HttpService} a new <code>HttpService</code> instance, depending on 
   *                       the specified config.
   */
  build(config:HttpListenerConfig):HttpService {
    let factory:HttpListenerFactory = new HttpListenerFactory();
    let listener:HttpListener = factory.build(config);
    let service:HttpService = new DefaultHttpService(listener);
    return service;
  }
}
