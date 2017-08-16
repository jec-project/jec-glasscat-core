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

import {ContextRootUtil} from "../contextroot/ContextRootUtil";
import {UrlStringsEnum, UrlPattern} from "jec-commons";
import {BasicUrlPattern} from "./BasicUrlPattern";

/**
 * A helper class for working with <code>UrlPattern</code> objects.
 */
export class UrlPatternUtils {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>UrlPatternUtils</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a boolean that indicates whether the specified URL matches with
   * the <code>UrlPattern</code> instance (<code>true</code>), or not
   * (<code>false</code>).
   * 
   * @param {string} url the URL to check.
   * @param {UrlPattern} pattern the <code>UrlPattern</code> instance to compare
   *                             with the  specified URL.
   * @return {boolean} <code>true</code> whether the specified URL matches with 
   *                   the <code>UrlPattern</code> instance; <code>false</code>
   *                   otherwise.
   */
  public match(url:string, pattern:UrlPattern):boolean {
    let result:boolean = false;
    let notStrict:boolean = !pattern.strict;
    let baseUrl:string = pattern.baseUrl;
    let testUrl:string = url;
    // Check for short path in URL pattern mode: my/url === my/url/ 
    if(notStrict) {
      testUrl += UrlStringsEnum.SLASH;
      if(testUrl.indexOf(baseUrl) === 0) return true;
    }
    testUrl = url;
    if(testUrl === baseUrl) result = true;
    else if(testUrl.indexOf(baseUrl) === 0) {
      // TODO: implement URL anchors support (e.g. admin/#anchor)
      if(testUrl.charAt(pattern.baseUrlLength) === UrlStringsEnum.MARK){
        result = true;
      } else result = notStrict;
    }
    return result;
  }
}