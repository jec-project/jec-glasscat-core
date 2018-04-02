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

import {Kernel} from "../../core/Kernel";
import {GlassCatConfig} from "../../core/GlassCatConfig";

/**
 * The <code>KernelBuilder</code> class creates new instances of the
 * <code>Kernel</code> class. 
 */
export class KernelBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatBuilder</code> instance.
   */
  constructor(){ }
    
  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Builds and returns a new <code>Kernel</code> instance.
   * 
   * @param {GlassCatConfig} config the config object used to build the new 
   *                                <code>Kernel</code> instance.
   * @return {Kernel} a new <code>Kernel</code> instance.
   */
  public build(config:GlassCatConfig):Kernel{
    const kernel:Kernel = new Kernel();
    kernel.initContext(config);
    return kernel;
  }
}