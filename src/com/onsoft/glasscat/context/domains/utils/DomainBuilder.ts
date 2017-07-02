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

import {Domain} from "../Domain";
import {DomainConnectorConfig} from "../DomainConnectorConfig";

/**
 * A Builder utility for creating GlassCat <code>Domain</code> instances.
 */
export class DomainBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the domain connector configuration from the specified
   * config.
   *
   * @param {Object} connector the configuration properties from which to build 
   *                           the domain connector configuration.
   * @return {DomainConnectorConfig} a new <code>DomainConnectorConfig</code> 
   *                                 instance built from the the specified
   *                                 config.
   */
  private buildDomainConnector(connector:any):DomainConnectorConfig {
    let cfg:DomainConnectorConfig = new DomainConnectorConfig();
    cfg.type = connector.type;
    cfg.server = connector.server;
    return cfg;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a domain from the specified config.
   *
   * @param {any} config the configuration properties from which to build the
   *                     domain.
   * @return {Domain} a new <code>Domain</code> instance built from the the  
   *                  specified config.
   */
  public buildDomain(config:any):Domain {
    let domain:Domain = new Domain();
    domain.name = config.name;
    domain.host = config.host;
    domain.target = config.target;
    domain.connector = this.buildDomainConnector(config.connector);
    return domain;
  }
};
