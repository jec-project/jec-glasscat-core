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

import {GlassCatContext} from "../GlassCatContext";
import {Kernel} from "../../core/Kernel";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {KernelValidator} from "./KernelValidator";
import {LocaleManager} from "../../i18n/LocaleManager";

/**
 * A utility class for validating GlassCat container contexts.
 */
export class ContextValidator implements KernelValidator {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ContextValidator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public validate(kernel:Kernel):void {
    let i18n:LocaleManager = LocaleManager.getInstance();
    LoggerManager.getInstance().info(i18n.get("context.start"));
    let isValid:boolean = true;
    let context:GlassCatContext = kernel.getContext();
    let ctxVer:string = context.getVersion();
    let kerVer:string = kernel.getVersion();
    if(ctxVer !== kerVer) {
      LoggerManager.getInstance().warn(
        i18n.get("warnings.invalidContext", ctxVer, kerVer)
      );
      isValid = false;
    }
    if(!isValid) {
      LoggerManager.getInstance().warn(i18n.get("context.invalid"));
    } else LoggerManager.getInstance().info(i18n.get("context.valid"));
  }
};
