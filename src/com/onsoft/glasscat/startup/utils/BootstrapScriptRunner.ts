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

import {BootstrapScript, BootstrapContext, Logger} from "jec-commons";
import {BootstrapScriptSorter} from "./BootstrapScriptSorter";
import {DomainContainer} from "../../domains/containers/DomainContainer";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {LocaleManager} from "jec-commons-node";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";

/**
 * The helper class that runs all <code>BootstrapScript</code> classes
 * registered in the bootstrap context.
 */
export class BootstrapScriptRunner {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapScriptRunner</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////


  /**
   * Runs all <code>BootstrapScript</code> classes registered in the bootstrap
   * context.
   *
   */
  public runAll(container:DomainContainer):void {
    let sorter:BootstrapScriptSorter = null;
    let context:BootstrapContext = container.getBootstrapContext();
    let scripts:BootstrapScript[] = context.getScriptList();
    let script:BootstrapScript = null;
    let len:number = scripts.length;
    let logManager:Logger = LoggerManager.getInstance();
    let i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    if(len > 0) {
      sorter = new BootstrapScriptSorter();
      sorter.sortCollection(scripts);
      while (len--) {
        script = scripts[len];
        logManager.info(i18n.get("bootstrap.run", script.constructor.name));
        script.run(container);
      }
    }
  }
}
