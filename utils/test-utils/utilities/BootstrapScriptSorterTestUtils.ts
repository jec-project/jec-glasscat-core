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

import {BootstrapScript} from "jec-commons";

/*!
 * This module constains utilities used by the BootstrapScriptSorterTest test
 * suite.
 */

// Utilities:
export const buildBootstrapScriptColl:Function = function():BootstrapScript[]{
  const coll:BootstrapScript[] = new Array<BootstrapScript>();
  let cussor:number = 6;
  let script:any = null;
  while(cussor--) {
    script = {
      __priority: Math.round(Math.random() * 10),
      getPriority: function() {
        return this.__priority;
      }
    };
    coll.push(script as BootstrapScript);
  }
  return coll;
}