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

import {Domain} from "jec-glasscat-config";

/**
 * Stores the GlassCat context for all <code>Domain</code> instances.
 */
export class DomainContext {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainContext</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * A map that contains all domains for this <code>DomainContext</code>
   * instance.
   */
  private _map:Map<string, Domain> = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  public init():void {
    this._map = new Map<string, Domain>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a domain to this <code>DomainContext</code> instance.
   * 
   * @param {Domain} domain the domain to add.
   */
  public addDomain(domain:Domain):void {
    this._map.set(domain.name, domain);
  }

  /**
   * Returns a collection that contains all domains registered whithin this
   * <code>DomainContext</code> instance.
   * 
   * @return {Array<Domain>} all the domains registered in this
   *                         <code>DomainContext</code> instance.
   */
  public getDomainList():Domain[] {
    const list:Domain[] = new Array<Domain>();
    this._map.forEach( (value:Domain)=> { list.push(value); } );
    return list;
  }
}
