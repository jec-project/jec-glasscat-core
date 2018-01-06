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

import {AbstractDomainConnector} from "./AbstractDomainConnector";
import {EjpContainer} from "../containers/EjpContainer";
import {JsletManager} from "../../core/JsletManager";
import {JcadContext} from "jec-commons";

/**
 * The <code>EjpConnector</code> class represents connectors for standard EJP
 * containers.
 */
export class EjpConnector extends AbstractDomainConnector {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConnector</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public init(version:string, data:any, jsletManager:JsletManager,
                                                 jcadContext:JcadContext):void {
    super.init(version, data, jsletManager, jcadContext);
    this.__container = new EjpContainer();
    this.__container.init(this, jsletManager);
  }

  /**
   * @inheritDoc
   */
  public toString():string {
    return "[DomainConnector::EjpConnector]";
  }
}
