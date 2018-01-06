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

import { BootstrapParams } from "jec-commons";
import { BootstrapImpl } from "../classes/BootstrapImpl";

/*!
 * This module constains utilities used by the BootstrapDecoratorTest test
 * suite.
 */

// Utilities:
export const PRIORITY:number = 10;
export const buildBootstrapScript:Function = function():any {
  let bootstrap:BootstrapImpl = new BootstrapImpl();
  return bootstrap.constructor;
};
export const buildParams:Function = function():BootstrapParams {
  let params:BootstrapParams = ({
    priority: PRIORITY
  } as BootstrapParams);
  return params;
};
