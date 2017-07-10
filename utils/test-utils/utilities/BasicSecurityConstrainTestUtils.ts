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
import {EjpConstraintConfig} from "../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfig";

/*!
 * This module constains utilities used by the BasicSecurityConstrainTest test
 * suite.
 */

// Utilities:
export const buildConfig:Function = function():EjpConstraintConfig {
  let config:EjpConstraintConfig = new EjpConstraintConfig();
  config.name = CONFIG_NANE;
  config.errorUrl = CONFIG_ERROR_URL;
  config.roles = [CONFIG_ROLE];
  config.urlPattern = CONFIG_URL_PATTERN;
  return config;
};
export const CONFIG_NANE:string = "config-name";
export const CONFIG_ERROR_URL:string = "path/to/error/url";
export const CONFIG_ROLE:string = "role-name";
export const CONFIG_URL_PATTERN:string = "url/pattern";
