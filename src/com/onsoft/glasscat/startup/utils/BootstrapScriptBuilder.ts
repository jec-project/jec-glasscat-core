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

import {ClassLoader, DefaultClassLoader, BootstrapScript} from "jec-commons";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The helper class for loading and creating instances of 
 * <code>BootstrapScript</code> classes.
 */
export class BootstrapScriptBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapScriptBuilder</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////


  /**
   * Loads and returns a new <code>BootstrapScript</code> object.
   *
   * @param {string} path the path to the script class file.
   * @param {number} priority the priority of the new 
   *                          <code>BootstrapScript</code> instance.
   * @return {BootstrapScript} a new <code>BootstrapScript</code> instance.
   */
  public build(path:string, priority:number = null):BootstrapScript {
    let loader:ClassLoader = new DefaultClassLoader();
    let script:BootstrapScript = null;
    let Contructor:any = null;
    try {
      Contructor = loader.loadClass(path);
      script = new Contructor();
    } catch(e){
      // TODO: log error message
      throw new GlassCatError(GlassCatErrorCode.INVALID_BOOTSTRAP_CONFIG);
    }
    if(priority !== null) script.setPriority(priority);
    return script;
  }
}
