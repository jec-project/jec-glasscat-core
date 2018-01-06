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

import {UrlPattern} from "jec-commons";

/**
 * A helper class which is used to manage URL patterns information for mapping
 * jslet to specific URLs.
 */
export class BasicUrlPattern implements UrlPattern {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicUrlPattern</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The original URL pattern for this <code>UrlPattern</code> object.
   */
  public pattern:string = null;

  /**
   * Indicates whether the mapped URL accepts sub-routes (<code>true</code>), or 
   * not (<code>false</code>).
   */
  public strict:boolean = true;

  /**
   * The base URL, derived from the original pattern, for this
   * <code>UrlPattern</code> object.
   */
  public baseUrl:string = null;
  
  /**
   * The length of the base URL.
   */
  public baseUrlLength:number = 0;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a string representation of this <code>BasicUrlPattern</code>
   * instance.
   * 
   * @return {string} a string representation of this
   *                  <code>BasicUrlPattern</code> instance.
   */
  public toString():string {
    return "[Object::BasicUrlPattern: pattern=" + this.pattern +
           ", baseUrl=" + this.baseUrl + ", strict=" + this.strict +
           ", baseUrlLength=" + this.baseUrlLength + "]";
  }
}