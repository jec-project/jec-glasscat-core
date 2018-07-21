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

import {EjpSessionConfig} from "jec-glasscat-config";
import {SessionStorageType} from "jec-exchange";

/**
 * The <code>EjpSessionConfigImpl</code> class is the default implementation of
 * the <code>EjpSessionConfig</code> interface.
 */
export class EjpSessionConfigImpl implements EjpSessionConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSessionConfigImpl</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public storage:SessionStorageType = null;
  
  /**
   * @inheritDoc
   */
  public errorUrl:string = null;
  
  /**
   * @inheritDoc
   */
  public maxAge:number = 3600;
}
