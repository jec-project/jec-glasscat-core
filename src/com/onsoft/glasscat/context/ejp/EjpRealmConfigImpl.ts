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

import {EjpRealmConfig} from "jec-glasscat-config";
import {RealmType} from "jec-exchange";

/**
 * The <code>EjpRealmConfigImpl</code> class is the default implementation of
 * the <code>EjpRealmConfig</code> interface.
 */
export class EjpRealmConfigImpl implements EjpRealmConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpRealmConfigImpl</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public type:RealmType = null;
  
  /**
   * @inheritDoc
   */
  public securedArea:string = null;
  
  /**
   * @inheritDoc
   */
  public connectorFactory:string = null;
}
