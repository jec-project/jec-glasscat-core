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

import {HttpStatusReport} from"./HttpStatusReport";
import {LocaleManager} from "jec-commons-node";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {HttpRequest, HttpResponse} from "jec-exchange";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {HttpStatusReportBuilder} from "../../templates/status/HttpStatusReportBuilder";
import {ErrorTemplateProcessor} from "../../templates/error/ErrorTemplateProcessor";
import {HttpStatusCode} from "jec-commons";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A helper singleton for building HTTP forbidden status report pages.
 */
export class ForbiddenStatusBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ErrorStatusBuilder</code> instance.
   */
  constructor() {
    if(ForbiddenStatusBuilder._locked || ForbiddenStatusBuilder.INSTANCE) {
      const msg:string = GlassCatLocaleManager.getInstance().get(
        "errors.singleton", "ForbiddenStatusBuilder"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    ForbiddenStatusBuilder._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ErrorStatusBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ErrorStatusBuilder</code> singleton instance reference.
   */
  private static INSTANCE:ForbiddenStatusBuilder = null;

  /**
   * Returns a reference to the <code>ErrorStatusBuilder</code> singleton.
   * 
   * @return {ForbiddenStatusBuilder} a reference to the
   *                                  <code>ErrorStatusBuilder</code> singleton.
   */
  public static getInstance():ForbiddenStatusBuilder{
    if(ForbiddenStatusBuilder.INSTANCE === null) {
      ForbiddenStatusBuilder._locked = false;
      ForbiddenStatusBuilder.INSTANCE = new ForbiddenStatusBuilder();
    }
    return ForbiddenStatusBuilder.INSTANCE;
  }
  
  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and render a new forbidden status page, initialized with the 
   * specified parameters.
   * 
   * @param {HttpRequest} req the HTTP request for which to create the forbidden
   *                          status page.
   * @param {HttpResponse} res the HTTP response for which to create the 
   *                           forbidden status page.
   * @param {string} templatePath the path to the tempate to use for creating  
   *                              the forbidden status page.
   * @param {string} detailsCode the reference to the locale details for this
   *                             forbidden access message.
   * @return {HttpStatusReport} a new <code>HttpStatusReport</code> object.
   */
  public build(req:HttpRequest, res:HttpResponse, templatePath:string,
               detailsCode:string = "httpErrors.forbidden.description"):void {
    const url:string = req.getOriginalUrl();
    const i18n:LocaleManager = GlassCatLocaleManager.getInstance();
    const statusReport:HttpStatusReport = 
      HttpStatusReportBuilder.getInstance().build(
        HttpStatusCode.FORBIDEN,
        i18n.get("httpErrors.forbidden.title"),
        i18n.get("httpErrors.forbidden.message"),
        i18n.get(detailsCode, url)
      );
    ErrorTemplateProcessor.getInstance().renderFile(
      templatePath,
      statusReport,
      req,
      res
    );
  }
}