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

import * as os from "os";
import {Kernel} from "../../core/Kernel";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {KernelValidator} from "./KernelValidator";
import {LocaleManager} from "jec-commons-node";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";

/**
 * A utility class for validating GlassCat container deployement environments.
 */
export class EnvironmentValidator implements KernelValidator {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EnvironmentValidator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public validate(kernel:Kernel):void {
    const i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    let env:string = i18n.get("environment.start");
    env += "\n   * "
        + i18n.get("environment.host", os.type(), os.platform(), os.release());
    env += "\n   * " + i18n.get("environment.hostName", os.hostname());
    env += "\n   * " + i18n.get("environment.directory", os.homedir());
    env += "\n   * " + i18n.get("environment.totalMemory", String(os.totalmem()));
    env += "\n   * " + i18n.get("environment.freeMemory", String(os.freemem()));
    LoggerManager.getInstance().debug(env);
    env = i18n.get("cpus.start");
    const cpuList:os.CpuInfo[] = os.cpus();
    let len:number = cpuList.length;
    let cpuNum:number = 1;
    let cpuInf:os.CpuInfo = null;
    while(len--) {
      cpuInf = cpuList[len];
      env += "\n   => " + i18n.get("cpus.num", String(cpuNum));
      env += "\n   * " + i18n.get("cpus.model", cpuInf.model);
      env += "\n   * " + i18n.get("cpus.speed", String(cpuInf.speed));
      cpuNum++;
    }
    LoggerManager.getInstance().debug(env);
  }
};
