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

import {Domain, DomainConnectorConfig} from "jec-glasscat-config";

/**
 * The <code>DomainImpl</code> class is the default implementation of
 * the <code>Domain</code> interface.
 */
export class DomainImpl implements Domain {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainImpl</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public name:string = null;

  /**
   * @inheritDoc
   */
  public host:string = null;

  /**
   * @inheritDoc
   */
  public target:string = null;

  /**
   * @inheritDoc
   */
  public connector:DomainConnectorConfig = null;
}
