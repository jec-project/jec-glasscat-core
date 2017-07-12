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

import {HttpService} from "./HttpService";
import {AbstractHttpService} from "./AbstractHttpService";
import {HttpListener} from "./listeners/HttpListener";

/**
 * The __DefaultHttpService__ class represents the GlassCat default 
 * implementation for HTTP services.
 *
 * @class DefaultHttpService
 * @constructor
 * @param {HttpListener} listener the HTTP listener for this HTTP service.
 */
export class DefaultHttpService extends AbstractHttpService
                                 implements HttpService {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  constructor(listener:HttpListener) {
    super(listener);
  }
};