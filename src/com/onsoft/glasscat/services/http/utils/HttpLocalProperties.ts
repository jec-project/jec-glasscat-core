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

import {ContextRootData} from "../../../util/contextroot/ContextRootData";
import {DomainConnector} from "../../../domains/connectors/DomainConnector";
import {DomainState} from "../../../domains/containers/DomainState";
import {SessionId} from "jec-exchange";

/**
 * A Data Transfer Object for sharing all HTTP local properties between
 * middleware modules of <code>HttpService</code> implementations.
 */
export class HttpLocalProperties {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpLocalProperties</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A reference to the <code>DomainConnector</code> instance for the current
   * transaction.
   */
  public connector:DomainConnector = null;

  /**
   * A reference to the <code>ContextRootData</code> instance for the current
   * transaction.
   */
  public contextRootData:ContextRootData = null;

  /**
   * The state od the domain container for the current transaction. Possible
   * values are constants of the <code>DomainState</code> class.
   */
  public containerState:string = DomainState.STATELESS;

  /**
   * The session identifier for the current transaction.
   */
  public sessionId:SessionId = null;

  /**
   * Indicates whether the current transaction has failed (<code>true</code>),
   *  or not (<code>false</code>).
   */
  public transactionFails:boolean = false;
  
  /**
   * Indicates whether the ressource accessed through the current transaction
   * is static (<code>true</code>), or not (<code>false</code>).
   */
  public isStatic:boolean = false;
  
  /**
   * The URL of the current transaction, from which the context root has been
   * removed.
   */
  public trimmedUrl:string = null;
  
  /**
   * The URL used for redirecting the user whithin the current transaction.
   */
  public redirectUrl:string = null;
  
  /**
   * A reference to the context root for the current transaction, in the format
   * <code>/contextroot</code>.
   */
  public contextRootRef:string = null;
}