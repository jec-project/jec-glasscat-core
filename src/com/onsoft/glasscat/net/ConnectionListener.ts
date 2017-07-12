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

/**
 * The <code>ConnectionListener</code> class represents a listen socket that has
 * an IP address, a port number and a unique ID.
 */
export interface ConnectionListener {

  /**
   * Returns the ID for this listener.
   *
   * @return {string} a string that represents the listener ID.
   */
  getId():string;

  /**
   * Returns the TCP port number on which this listener will create a server
   * socket and await incoming connections.
   *
   * @return {number} the TCP port number for this listener.
   */
  getPort():number;

  /**
   * Returns the IP address for this listener.
   *
   * @return {string} a string that represents the listener IP address.
   */
  getAdress():string;

  /**
   * Returns the name of the server associated with this listener.
   *
   * @return {string} the name of the server associated with this listener.
   */
  getServer():string;
}
