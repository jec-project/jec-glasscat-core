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

import {Jslet, JsletContext, HttpJslet} from "jec-exchange";
import {JsletContextTestImpl} from "../classes/JsletContextTestImpl";

/*!
 * This module constains utilities used by the JsletManagerTest test suite.
 */

// Utilities:
export const UNDEFINED_CONTEXT_REF:string = "anything";
export const CONTEXT_REF:string = "my-context-root";
export const JSLET_URL:string = "foo";
export const buildContext:Function = function():JsletContext {
  const ctx:JsletContext = new JsletContextTestImpl();
  return ctx;
};
export const buildJslet:Function = function():Jslet {
  const jslet:HttpJslet = new HttpJslet();
  (jslet as any).__webJsletMetadata = { urlPatterns: [JSLET_URL] };
  return jslet;
};

