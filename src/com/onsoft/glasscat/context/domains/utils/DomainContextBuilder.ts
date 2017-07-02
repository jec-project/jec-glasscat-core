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

import {DomainContext} from "../../DomainContext";
import {Domain} from "../Domain";
import {DomainBuilder} from "./DomainBuilder";

/**
 * A builder utility for managing GlassCat domain contexts.
 */
export class DomainContextBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainContextBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a domain context from the specified config file.
   *
   * @param {Object} config the configuration file from which to build the
   *                        context.
   * @return {DomainContext} a new <code>DomainContext</code> instance built 
   *                         from the specified config file.
   */
  public buildContext(config:any):DomainContext {
    let ctx:DomainContext = new DomainContext();
    let domains:any[] = config.domains;
    let len:number = -1;
    let rawDomain:any = null;
    let domain:Domain = null;
    let builder:DomainBuilder = null;
    if(domains) {
      builder = new DomainBuilder();
      len = domains.length;
      while(len--) {
        rawDomain = domains[len];
        domain = builder.buildDomain(rawDomain);
        ctx.addDomain(domain);
      }
    }
    return ctx;
  }
};
