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

import {ContextRootUtil} from "../contextroot/ContextRootUtil";
import {UrlStringsEnum, UrlPattern} from "jec-commons";
import {BasicUrlPattern} from "./BasicUrlPattern";

/**
 * A helper class for creating <code>UrlPattern</code> objects.
 */
export class UrlPatternBuilder {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>UrlPatternBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a <code>UrlPattern</code> object that defines the specified
   * pattern.
   * 
   * @param {string} pattern the pattern for which to create the
   *                         <code>UrlPattern</code> object.
   * @return {UrlPattern} a <code>UrlPattern</code> object that defines the 
   *                      specified pattern.
   */
  public build(pattern:string):UrlPattern {
    const urlMapper:UrlPattern = new BasicUrlPattern();
    const len:number = pattern.length - 2;
    const permMarkId:number = pattern.lastIndexOf(UrlStringsEnum.PERM_MARK);
    let baseUrl:string = pattern.indexOf(UrlStringsEnum.SLASH) === 0 ?
                         pattern.substr(1) : pattern;
    if(permMarkId === len) {
      urlMapper.strict = false;
      baseUrl = baseUrl.substr(0, len);
    }
    if(baseUrl.length === 0) baseUrl = ContextRootUtil.INDEX;
    urlMapper.baseUrl = baseUrl;
    urlMapper.baseUrlLength = baseUrl.length;
    urlMapper.pattern = pattern;
    return urlMapper;
  }
}