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

import {EjpBootstrapContext} from "../EjpBootstrapContext";
import {BootstrapContext} from "jec-commons";
import {LocaleManager} from "../../i18n/LocaleManager";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The singleton helper for creating <code>BootstrapContext</code> objects, from 
 * data specified in a configuration file.
 */
export class BootstrapContextBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapContextBuilder</code> instance.
   */
  constructor() {
    if(BootstrapContextBuilder._locked || BootstrapContextBuilder.INSTANCE) {
      let msg:string = LocaleManager.getInstance().get(
        "errors.singleton", "BootstrapContextBuilder"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    BootstrapContextBuilder._locked = true;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>BootstrapContextBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>BootstrapContextBuilder</code> singleton instance reference.
   */
  private static INSTANCE:BootstrapContextBuilder = null;

  /**
   * Returns a reference to the <code>BootstrapContextBuilder</code> singleton.
   *
   * @return {HttpStatusReportBuilder} a reference to the
   *                                   <code>BootstrapContextBuilder</code>
   *                                   singleton.
   */
  public static getInstance():BootstrapContextBuilder{
    if(BootstrapContextBuilder.INSTANCE === null) {
      BootstrapContextBuilder._locked = false;
      BootstrapContextBuilder.INSTANCE = new BootstrapContextBuilder();
    }
    return BootstrapContextBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the <code>BootstrapContext</code>, from the specified
   * configuration file, for an <code>EjpContainer</code> instance.
   *
   * @param {DomainConnector} connector domain connector on which will be
   *                                    deployed the new context.
   * @return {BootstrapContext} a new <code>BootstrapContext</code> instance.
   */
  public buildContext(connector:DomainConnector):BootstrapContext {
    let context:BootstrapContext = new EjpBootstrapContext(connector);
    let i18n:LocaleManager = LocaleManager.getInstance();
    var msg:string = 
                   i18n.get("bootstrap.newContext", connector.getContextRoot());
    LoggerManager.getInstance().info(msg);
    return context;
  }
}
