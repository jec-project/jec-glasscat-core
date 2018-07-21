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

import {DomainConfig, Domain} from "jec-glasscat-config";
import {DomainBuilder} from "./DomainBuilder";
import {DomainConfigImpl} from "../DomainConfigImpl";

/**
 * A parser utility for creating GlassCat <code>DomainConfig</code> instances 
 * from a loaded manifest file.
 */
export class DomainConfigParser {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConfigParser</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses the <code>domains</code> property and returns a collection of
   * <code>Domain</code> instances.
   * 
   * @param {any} domains the data loaded from a manifest file.
   * @return {Array<Domain>} a collection of <code>Domain</code> instances built 
   *                         from the specified data.
   */
  private parseDomains(domains:any):Domain[] {
    const builder:DomainBuilder = new DomainBuilder();
    const cfg:Domain[] = new Array<Domain>();
    let domain:Domain = null;
    let len:number = -1;
    if(domains) {
      len = domains.length;
      while(len--) {
        domain = builder.buildDomain(domains[len]);
        cfg.push(domain);
      }
    }
    return cfg;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses data loaded from a boostrap configuration file and returns the
   * <code>DomainConfig</code> instance built from the specified data.
   * 
   * @param {any} manifest the data loaded from a manifest file.
   * @return {DomainConfig} a <code>DomainConfig</code> instance built from the
   *                        specified data.
   */
  public parse(manifest:any):DomainConfig {
    //TODO: Log errors and create GlasscatErrorCode for this method
    const cfg:DomainConfig = new DomainConfigImpl();
    cfg.domains = this.parseDomains(manifest.domains);
    return cfg;
  }
}
