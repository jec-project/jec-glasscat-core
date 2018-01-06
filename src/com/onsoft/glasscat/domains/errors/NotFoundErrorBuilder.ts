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

import {HttpStatusCode} from "jec-commons";
import {DomainRequestError} from "./DomainRequestError";

/**
 * An utility used to create <code>DomainRequestError</code> instances that
 * specify HTTP <code>404</code> status errors.
 */
export class NotFoundErrorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>NotFoundErrorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and return a new <code>DomainRequestError</code> instance to specify an HTTP
   * <code>404</code> status errors.
   * 
   * @param {string} message an optional message that describes the error.
   * @return {DomainRequestError} a new <code>DomainRequestError</code>
   *                              instance.
   */
  public build(message?:string):DomainRequestError {
    let error:DomainRequestError = new DomainRequestError();
    error.statusCode = HttpStatusCode.NOT_FOUND;
    error.detailsCode = "httpErrors.notFound";
    error.message = message;
    return error;
  }
}