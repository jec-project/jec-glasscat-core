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

import {EjpBootstrapConfig} from "../../../src/com/onsoft/glasscat/context/ejp/EjpBootstrapConfig";

/*!
 * This module constains utilities used by the BootstrapScriptSorterTest test
 * suite.
 */

// Utilities:
const PATH:string = "path";
export const buildBootstrapScriptColl:Function = function():EjpBootstrapConfig[]{
  let coll:EjpBootstrapConfig[] = new Array<EjpBootstrapConfig>();
  let cussor:number = 6;
  let cfg:EjpBootstrapConfig = null;
  while(cussor--) {
    cfg = new EjpBootstrapConfig();
    cfg.path = PATH;
    cfg.priority = Math.round(Math.random() * 10);
    coll.push(cfg);
  }
  return coll;
}