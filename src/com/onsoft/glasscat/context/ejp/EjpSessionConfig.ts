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

import {SessionStorageType} from "jec-exchange";

/**
 * Represents the <code>webapp.session</code> configuration property for an EJP  
 * deployed in a GlassCat container.
 */
export class EjpSessionConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSessionConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The type of storage for this session configuration.
   */
  public storage:SessionStorageType = null;
  
  /**
   * The error URL for this session configuration.
   */
  public errorUrl:string = null;
  
  /**
   * Indicates how long the client browser will keep the session cookie. 
   */
  public maxAge:number = 3600;
}
