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

import {TemplateProcessor} from "../TemplateProcessor";
import * as ejs from "ejs";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {HttpRequest, HttpResponse} from "jec-exchange";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The <code>ErrorTemplateProcessor</code> singleton is used to render error 
 * pages in a GlassCat container.
 */
export class ErrorTemplateProcessor implements TemplateProcessor {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ErrorTemplateProcessor</code> instance.
   */
  constructor() {
    if(ErrorTemplateProcessor._locked || ErrorTemplateProcessor.INSTANCE) {
      let msg:string = GlassCatLocaleManager.getInstance().get(
        "errors.singleton", "ErrorTemplateProcessor"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    ErrorTemplateProcessor._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ErrorTemplateProcessor</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ErrorTemplateProcessor</code> singleton instance reference.
   */
  private static INSTANCE:TemplateProcessor = null;

  /**
   * Returns a reference to the <code>ErrorTemplateProcessor</code> singleton.
   *
   * @return {ErrorTemplateProcessor} a reference to the
   *                                  <code>ErrorTemplateProcessor</code>
   *                                  singleton.
   */
  public static getInstance():ErrorTemplateProcessor {
    if(ErrorTemplateProcessor.INSTANCE === null) {
      ErrorTemplateProcessor._locked = false;
      ErrorTemplateProcessor.INSTANCE = new ErrorTemplateProcessor();
    }
    return ErrorTemplateProcessor.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public renderFile(templatePath:string, data:any, req:HttpRequest,
                                                   res:HttpResponse):void{
    res.status(data.status);
    ejs.renderFile(
        templatePath,
        data,
        null,
        function(error:any, result:any):void {
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