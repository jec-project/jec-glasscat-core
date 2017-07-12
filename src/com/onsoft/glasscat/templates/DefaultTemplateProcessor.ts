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

import {TemplateProcessor} from "./TemplateProcessor";
import * as ejs from "ejs";
import {LoggerManager} from "../util/logging/LoggerManager";
import {HttpRequest, HttpResponse} from "jec-exchange";

/**
 * The <code>DefaultTemplateProcessor<code> class provides the basic proccess to 
 * render EJS pages in a GlassCat container.
 */
export class DefaultTemplateProcessor implements TemplateProcessor {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultTemplateProcessor</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public renderFile(templatePath:string, data:any, req:HttpRequest,
                                                   res:HttpResponse):void {
    ejs.renderFile(
        templatePath,
        data,
        null,
        (error:any, result:any)=> {
          if (!error) {
            res.end(result);
          } else {
            let logger:LoggerManager =
                                 (LoggerManager.getInstance() as LoggerManager);
            if(logger.isInitialized()) {
              LoggerManager.getInstance().error(error);
            }
            res.end(null);
          }
        }
    );
  }
}