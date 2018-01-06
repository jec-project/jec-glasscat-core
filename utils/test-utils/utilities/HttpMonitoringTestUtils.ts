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

import { HttpMonitoringConfig } from "../../../src/com/onsoft/glasscat/context/core/HttpMonitoringConfig";

/*!
 * This module constains utilities used by the HttpMonitoringTest test suite.
 */

// Utilities:
export const buildConfig:Function = function(enabled:boolean):HttpMonitoringConfig {
  let config:HttpMonitoringConfig = new HttpMonitoringConfig();
  config.enabled = enabled;
  return config;
};
export const FACTORY:string = process.cwd() + "/utils/test-utils/classes/TestMonitorFactory";
