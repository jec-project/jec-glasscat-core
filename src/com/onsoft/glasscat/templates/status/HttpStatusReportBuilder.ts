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

import {HttpStatusReport} from"./HttpStatusReport";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A helper singleton for building <code>HttpStatusReport</code> objects.
 */
export class HttpStatusReportBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpStatusReportBuilder</code> instance.
   */
  constructor() {
    if(HttpStatusReportBuilder._locked || HttpStatusReportBuilder.INSTANCE) {
      let msg:string = GlassCatLocaleManager.getInstance().get(
        "errors.singleton", "HttpStatusReportBuilder"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    HttpStatusReportBuilder._locked = true;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>HttpStatusReportBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>HttpStatusReportBuilder</code> singleton instance reference.
   */
  private static INSTANCE:HttpStatusReportBuilder = null;

  /**
   * Returns a reference to the <code>HttpStatusReportBuilder</code> singleton.
   *
   * @return {HttpStatusReportBuilder} a reference to the
   *                                   <code>HttpStatusReportBuilder</code>
   *                                   singleton.
   */
  public static getInstance():HttpStatusReportBuilder{
    if(HttpStatusReportBuilder.INSTANCE === null) {
      HttpStatusReportBuilder._locked = false;
      HttpStatusReportBuilder.INSTANCE = new HttpStatusReportBuilder();
    }
    return HttpStatusReportBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The current version of the GlassCat container.
   */
  private _version:string = null;

  /**
   * The code name for the current version of the GlassCat container.
   */
  private _codeName:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the <code>HttpStatusReportBuilder</code> singleton. This method 
   * is called by the kernel object.
   *
   * @param {string} version The current version of the GlassCat container.
   * @param {string} codeName The code name for the current version of the
   *                          GlassCat container.
   */
  public init(version:string, codeName:string) {
    this._version = version;
    this._codeName = codeName;
  }

  /**
   * Builds an returns a new <code>HttpStatusReport</code> object, initialized 
   * with the specified parameters.
   * 
   * @param {number} status the status of the HTTP report.
   * @param {string} title the title of the HTTP status report.
   * @param {string} message the message of the HTTP status report.
   * @param {string} description the description of the HTTP status report.
   * @return {HttpStatusReport} a new <code>HttpStatusReport</code> object.
   */
  public build(status:number, title:string, message:string,
                                          description:string):HttpStatusReport {
      let report:HttpStatusReport = new HttpStatusReport();
      report.status = status;
      report.title = title;
      report.message = message;
      report.description = description;
      report.version = this._version;
      report.codeName = this._codeName;
      return report;   
  }
}