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

import {JsonLoader, LogLevelUtil} from "jec-commons";
import {EjpStaticResourcesConfig} from "../../../src/com/onsoft/glasscat/context/ejp/EjpStaticResourcesConfig";

/*!
 * This module constains utilities used by the BasicStaticResourcesTest test
 * suite.
 */

// Utilities:
export const buildConfig:Function = function():EjpStaticResourcesConfig {
  let config:EjpStaticResourcesConfig = new EjpStaticResourcesConfig();
  config.urlPattern = CONFIG_URL_PATTERN;
  return config;
};
export const CONFIG_URL_PATTERN:string = "url/pattern";
