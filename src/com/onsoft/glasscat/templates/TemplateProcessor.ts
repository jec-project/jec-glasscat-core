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

import {HttpRequest, HttpResponse} from "jec-exchange";

/**
 * Provides the methods to implement for rendering template files.
 */
export interface TemplateProcessor {

  /**
   * Loads and renders the specified template file related to a HTTP request.
   *
   * @param {string} templatePath the path to the template file to render.
   * @param {any} data the data to be displayed into the template file to
   *                      render. 
   * @param {HttpRequest} req the HTTP request for which to render the file.
   * @param {HttpResponse} res the HTTP response for which to render the file.
   */
  renderFile(templatePath:string, data:any, req:HttpRequest,
                                                         res:HttpResponse):void;
}