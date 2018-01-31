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

import * as fs from "fs";
import {LoggerContext} from "../LoggerContext";
import {LoggerFactory} from "../../util/logging/LoggerFactory";
import {LogLevel} from "jec-commons";

/**
 * A Builder utility for managing GlassCat container logger contexts.
 */
export class LoggerContextBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LoggerContextBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds the container context from the bootstrap file.
   *
   * @param {string} name the name of the logger for this context.
   * @param {LoggerFactory} factory the reference to the logger factory for 
   *                                this context.
   * @param {LogLevel} logLevel the specific log level for this context.
   * @return {LoggerContext} a context object which represents a logger
   *                         definition.
   */
  public buildContext(name:string, factory:LoggerFactory,
                                            logLevel:LogLevel):LoggerContext {
    let ctx:LoggerContext = new LoggerContext();
    ctx.name = name;
    ctx.factory = factory;
    ctx.logLevel = logLevel;
    return ctx;
  }
};
