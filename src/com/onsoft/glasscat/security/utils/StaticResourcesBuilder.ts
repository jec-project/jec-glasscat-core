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

import {StaticResources} from "jec-exchange";
import {BasicStaticResources} from "../core/BasicStaticResources";
import {EjpStaticResourcesConfig} from "jec-glasscat-config";

/**
 * A helper class that builds and returns object that implements the
 * <code>StaticResources</code> interface.
 * 
 */
export class StaticResourcesBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>StaticResourcesBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methpds
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>StaticResources</code> instance, for the 
   * specified context.
   * 
   * @param {StaticResourcesConfig} login the context for the new 
   *                                      <code>StaticResources</code> instance.
   * @return {StaticResources} a new <code>StaticResources</code> instance.
   */
  public build(context:EjpStaticResourcesConfig):StaticResources {
    const resources:StaticResources = new BasicStaticResources(context);
    return resources;
  }
}