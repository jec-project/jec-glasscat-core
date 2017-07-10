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

import { EjpFormConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpFormConfig";
import * as configUtils from "../../../utils/test-utils/utilities/EjpConfigUtils";

/*!
 * This module constains utilities used by the EjpFormConfigTest test uite.
 */

// Utilities:
export const buildConfig:Function = function():EjpFormConfig {
  let formConfig:EjpFormConfig = new EjpFormConfig();
  formConfig.errorUrl = configUtils.FORM_CONFIG_ERROR_URL;
  formConfig.loginUrl = configUtils.FORM_CONFIG_LOGIN_URL;
  return formConfig;
};