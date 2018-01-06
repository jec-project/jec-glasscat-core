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

import {LogFormatter} from "jec-commons";
import * as moment from "moment";

/**
 * Creates the default logs formatter for GlassCat <code>Loggers</code>.
 */
export class GlassCatLogFormatter implements LogFormatter {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatLogFormatter</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The string used to add new line charaters when the <code>useAppender</code>
   * parameter of the <code>format()</code> method is <code>true</code>.
   */
  public appender:string = "\n";

  /**
   * The pattern used to format times.
   */
  public timeFormat:string = "MM/DD/YY HH:mm:ss.SSS";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public format(level:string, marker:any, useAppender:boolean = false,
                                          context:string = ""):string {
    let time:string =  moment().format(this.timeFormat);
    let msg:string = `[${time}][GlassCat]${context} ${level}: ${marker}`;
    if(useAppender) msg += this.appender;
    return msg;
  }
};
