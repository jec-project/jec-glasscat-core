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

import {HttpMonitoringConfig} from "./HttpMonitoringConfig";

/**
 * A data object that contains information for a GlassCat HTTP listener.
 */
export class HttpListenerConfig {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpListenerConfig</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The HTTP monitoring configuration for this <code>HttpListenerConfig</code>
   * instance.
   */
  public monitoring:HttpMonitoringConfig = null;
  
  /**
   * The ID for the HTTP listener.
   */
  public id:string = null;

  /**
   * The TCP port number on which the HTTP listener will create a server socket
   * and await incoming connections.
   */
   public port:number = null; 

   /**
    * The IP address for the HTTP listener.
    */
   public address:string = null;

   /**
    * A boolean that indicates whether the connection is secured
    * (<code>true</code>), or not (<code>false</code>).
    */
   public secured:boolean = false;

   /**
    * The name of the server associated with this HTTP listener.
    */
   public server:string = null;

   /**
    * The path to the SSL certificate for the secured server associated with
    * this HTTP listener.
    */
   public sslPath:string = null;

  /**
   * The domain associated with this HTTP listener.
   */
  public domain:string = null;

  /**
   * The list of security config options associated with this HTTP listener.
   */
  public securityConfig:string[] = null;
}
