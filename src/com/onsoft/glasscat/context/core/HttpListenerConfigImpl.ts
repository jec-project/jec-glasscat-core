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

import {HttpListenerConfig, HttpMonitoringConfig} from "jec-glasscat-config";

/**
 * The <code>HttpListenerConfigImpl</code> class is the default implementation 
 * of the <code>HttpListenerConfig</code> interface.
 */
export class HttpListenerConfigImpl implements HttpListenerConfig{

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpListenerConfigImpl</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public monitoring:HttpMonitoringConfig = null;
  
  /**
   * @inheritDoc
   */
  public id:string = null;

  /**
   * @inheritDoc
   */
   public port:number = null; 

  /**
   * @inheritDoc
   */
   public address:string = null;

  /**
   * @inheritDoc
   */
   public secured:boolean = false;

  /**
   * @inheritDoc
   */
   public server:string = null;

  /**
   * @inheritDoc
   */
   public sslPath:string = null;

  /**
   * @inheritDoc
   */
  public domain:string = null;

  /**
   * @inheritDoc
   */
  public securityConfig:string[] = null;
}
