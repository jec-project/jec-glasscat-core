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

import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * A singleton that provides utilities and constants for working with URLs.
 */
export class UrlUtils {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>UrlUtils</code> instance.
   */
  constructor() {
    if(UrlUtils._locked || UrlUtils.INSTANCE) {
      const msg:string = GlassCatLocaleManager.getInstance().get(
        "errors.singleton", "UrlUtils"
      );
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    UrlUtils._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>UrlUtils</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>UrlUtils</code> singleton instance reference.
   */
  private static INSTANCE:UrlUtils = null;

  /**
   * Returns a reference to the <code>UrlUtils</code> singleton.
   *
   * @return {UrlUtils} a reference to the <code>UrlUtils</code> singleton.
   */
  public static getInstance():UrlUtils {
    if(UrlUtils.INSTANCE === null) {
      UrlUtils._locked = false;
      UrlUtils.INSTANCE = new UrlUtils();
    }
    return UrlUtils.INSTANCE;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Removes the context root from the specified URL path and returns the result 
   * of this operation as a new string.
   * 
   * @param {string} urlPath the URL path to trim.
   * @param {string} contextRootRef the reference to the context root from the
   *                                specified URL, in the format
   *                                <code>/contextroot</code>.
   * @return {string} a new string that represents the specified URL, without
   *                  its context root reference.
   */
  public trimContextRoot(urlPath:string, contextRootRef:string):string {
    let trimmed:string = urlPath;
    if(trimmed.indexOf(contextRootRef) === 0) {
      trimmed = trimmed.substr(contextRootRef.length + 1);
    }
    return trimmed;
  }
}