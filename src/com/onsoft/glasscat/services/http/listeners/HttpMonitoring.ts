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

import {TransactionMonitor} from "../../../net/http/monitoring/TransactionMonitor";
import {TransactionMonitorDerivation} from "../../../net/http/monitoring/TransactionMonitorDerivation";
import {TransactionMonitorFactory} from "../../../net/http/monitoring/TransactionMonitorFactory";
import {MappedPathUtil} from "../../../util/paths/MappedPathUtil";
import {ClassLoader, DefaultClassLoader} from "jec-commons";
import {HttpMonitoringConfig} from "../../../context/core/HttpMonitoringConfig";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * A data object which contains HTTP monitoring information for a GlassCat HTTP
 * listener.
 */
export class HttpMonitoring {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpMonitoring</code> instance.
   * 
   * @param {HttpMonitoringConfig} config the <code>HttpMonitoringConfig</code> 
   *                                      object for configuring an HTTP
   *                                      listener instance.
   */
  constructor(config:HttpMonitoringConfig) {
    this.init(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The context associated with this <code>HttpMonitoring</code> instance.
   */
  private _config:HttpMonitoringConfig = null;

  /**
   * A boolean value that indicates whether an HTTP listener enables HTTP
   * transactions monitoring (<code>true</code>), or not (<code>false</code>).
   */
  private _enableMonitoring:boolean = false;
  
  /**
   * The <code>TransactionMonitor</code> implementation for this HTTP 
   * transactions monitoring configuration.
   */
  private _transactionMonitor:TransactionMonitor = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initialize this object.
   * 
   * @param {HttpMonitoringConfig} config the <code>HttpMonitoringConfig</code> 
   *                                      object for configuring an HTTP
   *                                      listener instance.
   */
  public init(config:HttpMonitoringConfig):void {
    if(!config) {
      throw new GlassCatError(
        GlassCatErrorCode.INVALID_CONTEXT,
        "Config must not be null."
      )
    }
    let loader:ClassLoader = null;
    let Contructor:any = null;
    let classPath:string = null;
    let builder:TransactionMonitorFactory = null;
    let factory:string = config.factory;
    this._config = config;
    this._enableMonitoring = config.enabled;
    if(this._enableMonitoring) {
      if(factory) {
        loader = new DefaultClassLoader();
        classPath = MappedPathUtil.getInstance().resolve(factory);
        Contructor = loader.loadClass(classPath);
        builder = new Contructor();
        this._transactionMonitor = builder.build();
      }
      else {
        this._transactionMonitor = new TransactionMonitorDerivation();
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Returns a boolean value that indicates whether an HTTP listener enables
   * HTTP transactions monitoring (<code>true</code>), or not
   * (<code>false</code>).
   *
   * @return {boolean} <code>true</code> whether the HTTP listener enables HTTP 
   *                   transactions monitoring; <code>false</code> otherwise.
   */
  public enableMonitoring():boolean {
    return this._enableMonitoring;
  }
  
  /**
   * Returns the <code>TransactionMonitor</code> implementation associated with   
   * this HTTP transactions monitoring configuration.
   *
   * @return {TransactionMonitor} the <code>TransactionMonitor</code> 
   *                              implementation associated with this HTTP  
   *                              transactions monitoring configuration.
   */
  public getTransactionMonitor():TransactionMonitor {
    return this._transactionMonitor;
  }
}
