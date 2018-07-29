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

import { EjpLoginConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfigImpl";
import { EjpFormConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpFormConfigImpl";
import { EjpRealmConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRealmConfigImpl";
import * as configUtils from "../../../utils/test-utils/utilities/EjpConfigUtils";
import { RealmType } from "jec-exchange";
import { EjpFormConfig, EjpRealmConfig, EjpLoginConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the EjpLoginStrategyConfigTest test
 * suite.
 */

// Utilities:
const buildFormConfig:Function = function():EjpFormConfig {
  const formConfig:EjpFormConfig = new EjpFormConfigImpl();
  formConfig.errorUrl = configUtils.FORM_CONFIG_ERROR_URL;
  formConfig.loginUrl = configUtils.FORM_CONFIG_LOGIN_URL;
  return formConfig;
};
const buildRealmConfig:Function = function():EjpRealmConfig {
  const realmConfig:EjpRealmConfig = new EjpRealmConfigImpl();
  realmConfig.type = RealmType.FILE;
  return realmConfig;
};
export const REALM_CONFIG:EjpRealmConfig = buildRealmConfig();
export const FORM_CONFIG:EjpFormConfig = buildFormConfig();
export const buildConfig:Function = function():EjpLoginConfig {
  const config:EjpLoginConfig = new EjpLoginConfigImpl();
  config.formConfig = FORM_CONFIG;
  config.authMethod = configUtils.LOGIN_AUTH_METHOD;
  config.realm = REALM_CONFIG;
  return config;
};