//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {ConnectionListener} from "../../../net/ConnectionListener";
import {TransactionMonitor} from "../../../net/http/monitoring/TransactionMonitor";

/**
 * The HTTP listener elements represents a listen socket that has an IP address,
 * a port number and a unique ID.
 */
export interface HttpListener extends ConnectionListener {

  /**
   * Returns a boolean that indicates whether the connection is secured
   * (<code>true</code>), or not (<code>false</code>).
   *
   * @return {boolean} a <code>Boolean</code> that indicates whether the
   *                   connection is secured, or not.
   */
  getSecured():boolean;
  
  /**
   * Returns the protocol scheme of the server associated with this HTTP
   * listener.
   *
   * @return {string} the protocol scheme of the server associated with this
   *                  HTTP listener.
   */
  getProtocol():string;

  /**
   * Returns the domain associated with this HTTP listener.
   *
   * @return {string} the domain associated with this HTTP listener.
   */
  getDomain():string;

  /**
   * Returns the list of security config options associated with this HTTP
   * listener.
   *
   * @return {string} the list of security config options associated with this
   *                  HTTP listener.
   */
  getSecurityConfig():string[];

  /**
   * Returns a boolean value that indicates whether this HTTP listener enables
   * HTTP transactions monitoring (<code>true</code>), or not
   * (<code>false</code>).
   *
   * @return {boolean} <code>true</code> whether the HTTP listener enables HTTP
   *                   transactions monitoring; <code>false</code> otherwise.
   */
  enableMonitoring():boolean;
  /**
   * Returns the <code>TransactionMonitor</code> instance for this HTTP
   * listener.
   *
   * @return {TransactionMonitor} the <code>TransactionMonitor</code> instance 
   *                              for this HTTP listener.
   */
  getTransactionMonitor():TransactionMonitor;
}
