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

import {HttpListener} from "./HttpListener";
import {TransactionMonitor} from "../../../net/http/monitoring/TransactionMonitor";
import {HttpConnectionType} from "jec-commons";
import {HttpMonitoring} from "./HttpMonitoring";
import {HttpListenerConfig} from "../../../context/core/HttpListenerConfig";

/**
 * The DefaultHttpListener class represents the GlassCat default implementation
 * for HTTP listeners.
 */
export class DefaultHttpListener implements HttpListener {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpListenerFactory</code> instance.
   * 
   * @param {HttpListenerConfig} config the <code>HttpListenerConfig</code>  
   *                                    object associated with this 
   *                                    <code>HttpListener</code> instance.
   */
  constructor(config:HttpListenerConfig) {
    this.init(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The ID for this HTTP listener.
   */
  private _id:string = null;

  /**
   * The TCP port number for this HTTP listener.
   */
  private _port:number = 0;

  /**
   * The IP address for this HTTP listener.
   */
  private _address:string = null;

  /**
   * Indicates whether the connection is secured (<code>true</code>), or not
   * (<code>false</code>).
   */
  private _isSecured:boolean = false;

  /**
   * The name of the server associated with this HTTP listener.
   */
  private _server:string = null;

  /**
   * The protocol of the server associated with this HTTP listener.
   */
  private _protocol:string = null;

  /**
   * The domain associated with this HTTP listener.
   */
  private _domain:string = null;
  
  /**
   * The list of security config options associated with this HTTP listener.
   */
  private _securityConfig:string[] = null;

  /**
   * Indicates whether the HTTP listener enables HTTP transactions monitoring 
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _enableMonitoring:boolean = false;

  /**
   * The <code>TransactionMonitor</code> instance for this  HTTP listener.
   */
  private _transactionMonitor:TransactionMonitor = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the immutable properties for this HTTP listener.
   *
   * @param {HttpListenerConfig} config the <code>HttpListenerConfig</code>  
   *                                    object associated with this 
   *                                    <code>HttpListener</code> instance.
   */
  private init(config:HttpListenerConfig):void {
    let monitoring:HttpMonitoring = new HttpMonitoring(config.monitoring);
    this._id = config.id;
    this._port = config.port;
    this._address = config.address;
    this._isSecured = config.secured;
    this._server = config.server;
    this._protocol =
           this._isSecured ? HttpConnectionType.HTTPS : HttpConnectionType.HTTP;
    this._securityConfig =  config.securityConfig;
    this._domain = config.domain;
    this._enableMonitoring = monitoring.enableMonitoring();
    this._transactionMonitor = monitoring.getTransactionMonitor();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getId():string {
    return this._id;
  }

   /**
    * @inheritDoc
    */
   public getPort():number {
     return this._port;
   }

   /**
    * @inheritDoc
    */
   public getAdress():string {
     return this._address;
   }

   /**
    * @inheritDoc
    */
   public getSecured():boolean {
     return this._isSecured;
   }

  /**
   * @inheritDoc
   */
  public getServer():string {
    return this._server;
  }

  /**
   * @inheritDoc
   */
  public getProtocol():string {
    return this._protocol;
  }

  /**
   * @inheritDoc
   */
  public getDomain():string {
    return this._domain;
  }

  /**
   * @inheritDoc
   */
  public getSecurityConfig():string[] {
    return this._securityConfig;
  }

  /**
   * @inheritDoc
   */
  public enableMonitoring():boolean {
    return this._enableMonitoring;
  }
  
  /**
   * @inheritDoc
   */
  public getTransactionMonitor():TransactionMonitor {
    return this._transactionMonitor;
  }
};
