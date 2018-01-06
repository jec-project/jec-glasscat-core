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

import {Logger} from "jec-commons";
import {LoggerFactory} from "./LoggerFactory";
import {LoggerManager} from "./LoggerManager";
import {LoggerContext} from "../../context/LoggerContext";
import {GlassCatContext} from "../../context/GlassCatContext";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The builder class for LoggerManager instances.
 */
export class LoggerManagerBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LoggerManagerBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The GlassCat container context.
   */
  private _ctx:GlassCatContext = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////


  /**
   * @inheritDoc
   */
  public context(value:GlassCatContext):LoggerManagerBuilder {
    this._ctx = value;
    return this;
  }

  /**
   * @inheritDoc
   */
  public build():Logger {
    if(!this._ctx) {
      throw new GlassCatError(
        GlassCatErrorCode.INVALID_CONTEXT,
        "GlassCatContext must not be null"
      );
    }
    let loggerContexts:LoggerContext[] = this._ctx.getLoggerContexts();
    let loggers:Logger[] = new Array<Logger>();
    let len:number = loggerContexts.length;
    let loggerContext:LoggerContext = null;
    while(len--) {
      loggerContext = loggerContexts[len];
      loggers.push(loggerContext.factory.build(loggerContext));
    }
    let logLevel:number = this._ctx.getLogLevel();
    let manager:Logger = LoggerManager.getInstance();
    (manager as LoggerManager).init(loggers, logLevel);
    return manager;
  }
};
