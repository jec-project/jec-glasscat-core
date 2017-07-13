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

import {HttpServiceManager} from "../../../core/HttpServiceManager";
import {DomainConnectorManager} from "../../../core/DomainConnectorManager";
import {HttpService} from "../HttpService";
import {HttpServiceFactory} from "./HttpServiceFactory";
import {HttpListenerConfig} from "../../../context/core/HttpListenerConfig";

/**
 * A mediation utility for creating all HTTP services for the current
 * GlassCat container.
 */
export class HttpServiceBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpServiceBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates all <code>HttpService</code> instances for this GlassCat container.
   *
   * @param {HttpServiceManager} httpServiceManager the reference to the
   *                                             <code>HttpServiceManager</code> 
   *                                                of the GlassCat container.
   * @param {Array<HttpListenerConfig>} httpListenerConfigList the list of
   *                                             <code>HttpListenerConfig</code>
   *                                         objects for the GlassCat container.
   */
  public buildServices(httpServiceManager:HttpServiceManager,
                       httpListenerConfigList:Array<HttpListenerConfig>):void {
    let len:number = httpListenerConfigList.length;
    let factory:HttpServiceFactory = new HttpServiceFactory();
    while(len--) {
      let service:HttpService = factory.build(httpListenerConfigList[len]);
      httpServiceManager.addService(service);
    }
  }
};
