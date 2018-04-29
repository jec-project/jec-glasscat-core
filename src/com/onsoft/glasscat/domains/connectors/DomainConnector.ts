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

import {DomainContainer} from "../containers/DomainContainer";
import {JsletManager} from "../../core/JsletManager";
import {EjpConfig} from "../../context/ejp/EjpConfig";
import {JcadContext} from "jec-commons";

/**
 * The <code>DomainConnector</code> interface provides the API for enabling 
 * connections between 'Enterprise JavaScript Projects' (EJP) and GlassCat
 * containers.
 */
export interface DomainConnector {

  /**
   * Returns the name for this <code>DomainConnector</code> object.
   *
   * @return {string} the name for this <code>DomainConnector</code> object.
   */
  getName():string;

  /**
   * Returns the target directory for this <code>DomainConnector</code> object.
   *
   * @return {string} the target directory for this <code>DomainConnector</code>
   *                  object.
   */
  getTarget():string;

  /**
   * Initializes the <code>DomainConnector</code> object.
   *
   * @param {string} version the version of the current GlassCat container.
   * @param {any} data the connector information loaded from the config file.
   * @param {JsletManager} jsletManager the reference to the
   *                                    <code>JsletManager</code> of the
   *                                    GlassCat container.
   * @param {JcadContext} jcadContext the reference to the
   *                                  <code>JcadContext</code> of the GlassCat
   *                                  container. 
   */
  init(version:string, data:any, jsletManager:JsletManager,
                                                  jcadContext:JcadContext):void;

  /**
   * Returns the context root for this <code>DomainConnector</code> object.
   *
   * @return {string} the context root for this <code>DomainConnector</code>
   *                  object.
   */
  getContextRoot():string;

  /**
   * Returns the host name for this <code>DomainConnector</code> object.
   *
   * @return {string} the host name for this <code>DomainConnector</code>
   *                  object.
   */
  getHost():string;
  
  /**
   * Returns the server for this <code>DomainConnector</code> object.
   *
   * @return {string} the server for this <code>DomainConnector</code> object.
   */
  getServer():string;
  
  /**
   * Returns the status information for this <code>DomainConnector</code> object.
   * 
   * @return {any} the status information for this <code>DomainConnector</code>
   *               object.
   */
  getStatusInfo():any;

  /**
   * Returns the <code>DomainContainer</code> associated with this
   * <code>DomainConnector</code> object.
   *
   * @return {DomainContainer} the <code>DomainContainer</code> associated with 
   *                           this <code>DomainConnector</code> object.
   */
  getContainer():DomainContainer;

  /**
   * Returns the <code>EjpConfig</code> object associated with this 
   * <code>DomainConnector</code> object. The configuration file is the
   * <code>web.json</code> file located in the <code>JEC-INF</code> directory.
   *
   * @return {EjpConfig} the <code>EjpConfig</code> object associated with this
   *                     <code>DomainConnector</code> object.
   */
  getConfig():EjpConfig;

  /**
   * Returns the <code>JcadContext</code> object of the GlassCat container.
   *
   * @return {JcadContext} the <code>JcadContext</code> object of the GlassCat
   *                       container.
   */
  getJcadContext():JcadContext;
}
