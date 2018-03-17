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

import {DomainConnector} from "../../connectors/DomainConnector";
import {EjpConnector} from "../EjpConnector";
import {JsletManager} from "../../../core/JsletManager";
import {JcadContext} from "jec-commons";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * The <code>DomainConnectorBuilder</code> is the builder for all
 * <code>DomainConnector</code>  instances.
 */

export class DomainConnectorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConnectorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private constants
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>DomainConnector</code> for standard EJPs.
   */
  private static readonly EJP:string = "ejp";

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>DomainConnector</code> instance.
   *
   * @param {string} version the version of the current GlassCat container.
   * @param {any} data the connector information loaded from the config file.
   * @param {JsletManager} jsletManager the reference to the
   *                                    <code>JsletManager</code> of the
   *                                    GlassCat container.
   * @param {JcadContext} jcadContext the reference to the
   *                                  <code>JcadContext</code> of the
   *                                  GlassCat container. 
   * @return {DomainConnector} a new <code>DomainConnector</code> instance.
   */
  public build(version:string,
               data:any,
               jsletManager:JsletManager,
               jcadContext:JcadContext):DomainConnector {
    const connectorRef:any = data.connector;
    const type:string = connectorRef.type;
    let connector:DomainConnector = null;
    if(type === DomainConnectorBuilder.EJP) {
      connector = new EjpConnector();
    } else {
      throw new GlassCatError(
        GlassCatErrorCode.INVALID_CONTEXT,
        "Invalid connector definition"
      )
    }
    connector.init(version, data, jsletManager, jcadContext);
    return connector;
  }
}
