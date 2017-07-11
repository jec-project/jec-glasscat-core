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

import {LoggerFactory} from "../util/logging/LoggerFactory";
import {LogLevel} from "jec-commons";

/**
 * A simple DTO for storing contexts of <code>Logger</code> instances.
 */
export class LoggerContext {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LoggerContext</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the logger factory for this context.
   */
  public factory:LoggerFactory = null;

  /**
   * The name of the logger for this context.
   */
  public name:string = null;

  /**
   * The specific log level for this context. Valid values are constants of the
   * <code>LogLevel</code> enum.
   */
  public logLevel:number = LogLevel.TRACE;
}
