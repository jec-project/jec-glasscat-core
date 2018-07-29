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

import { HttpJslet, WebJsletParams } from "jec-exchange";
import { HttpJsletImpl } from "../classes/HttpJsletImpl";
//import { WebJsletDecorator } from "../../../src/com/onsoft/glasscat/jslets/jcad/decorators/WebJsletDecorator";

/*!
 * This module constains utilities used by the  WebJsletTest test suite.
 */

// Utilities:
export const JSLET_NAME:string = "JsletName;";
export const JSLET_URL_PATTERNS:string[] = ["/my/pattern"];
export const JSLET_TEMPLATE:string = "my/template.ejs";
export const buildJslet:Function = function():any {
  const jslet:HttpJslet = new HttpJsletImpl();
  return jslet.constructor;
};
export const buildInvalidParams:Function = function():WebJsletParams {
  const params:WebJsletParams = {} as WebJsletParams;
  return params;
};
export const buildEmptyPatternsParams:Function = function():WebJsletParams {
  const params:WebJsletParams = buildInvalidParams();
  params.urlPatterns = [];
  return params;
};
export const buildParams:Function = function():WebJsletParams {
  const params:WebJsletParams = buildInvalidParams();
  params.urlPatterns = JSLET_URL_PATTERNS;
  params.name = JSLET_NAME;
  return params;
};
export const buildParamsWithTemplate:Function = function():WebJsletParams {
  const params:WebJsletParams = buildParams();
  params.template = JSLET_TEMPLATE;
  return params;
};
export const PATTERNS_MISSING_ERROR:string = "errors.jslet.patternsMissing";
export const PATTERNS_EMPTY_ERROR:string = "errors.jslet.patternsEmpty";
