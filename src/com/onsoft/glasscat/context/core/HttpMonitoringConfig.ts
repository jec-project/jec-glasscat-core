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

/**
 * A data object which contains HTTP monitoring information for a GlassCat HTTP
 * listener.
 */
export class HttpMonitoringConfig {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpMonitoringConfig</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A boolean value that indicates whether an HTTP listener enables HTTP
   * transactions monitoring (<code>true</code>), or not (<code>false</code>).
   */
  public enabled:boolean = false;
  
  /**
   * The factory class reference to the <code>TransactionMonitor</code>  
   * implementation for this HTTP transactions monitoring configuration.
   */
  public factory:string = null;
}
