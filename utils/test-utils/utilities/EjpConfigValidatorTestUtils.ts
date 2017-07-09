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

import { AuthMethod } from "../../../src/com/onsoft/glasscat/security/login/AuthMethod";
import { RealmType } from "../../../src/com/onsoft/glasscat/security/realms/RealmType";
import { EjpConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpConfig";
import { EjpWebAppConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpWebAppConfig";
import { EjpBootstrapConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpBootstrapConfig";
import { EjpJsletsConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpJsletsConfig";
import { EjpSessionConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpSessionConfig";
import { EjpResourceMapperConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpResourceMapperConfig";
import { EjpLoginConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfig";
import { EjpFormConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpFormConfig";
import { EjpRealmConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRealmConfig";
import { EjpSecurityConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpSecurityConfig";
import { EjpStaticResourcesConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpStaticResourcesConfig";
import { EjpRoleConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRoleConfig";
import { EjpConstraintConfig } from "../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfig";
import * as configUtils from "../../../utils/test-utils/utilities/EjpConfigUtils";

/*!
 * This module constains utilities used by the EjpConfigValidatorTest test
 * suite.
 */

// Utilities:
const INVALID:string = "invalid";
export const buildNoWebappConfig:Function = function():EjpConfig {
  return new EjpConfig();
};
export const buildNoNameConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoWebappConfig();
  config.webapp = new EjpWebAppConfig();
  return config;
};
export const buildNoWelcomeFileConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoNameConfig();
  config.webapp.name = configUtils.WEBAPP_NAME;
  return config;
};
export const buildNoContextRootConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoWelcomeFileConfig();
  config.webapp.welcomeFile = configUtils.WEBAPP_WELCOMEFILE;
  return config;
};
export const buildEmptyContextRootConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = "";
  return config;
};
export const buildInvalidStateConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  config.webapp.state = INVALID;
  return config;
};
export const buildLoginConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  config.webapp.login = new EjpLoginConfig();
  config.webapp.login.realm = new EjpRealmConfig();
  return config;
};
export const buildInvalidAuthMethodConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildLoginConfig();
  config.webapp.login.authMethod = INVALID;
  return config;
};
export const buildInvalidFormConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildLoginConfig();
  config.webapp.login.authMethod = AuthMethod.EJP_FORM;
  return config;
};
export const buildValidLoginConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildLoginConfig();
  let formConfig:EjpFormConfig = new EjpFormConfig();
  config.webapp.login.authMethod = configUtils.LOGIN_AUTH_METHOD;
  formConfig.errorUrl = configUtils.FORM_CONFIG_ERROR_URL;
  formConfig.loginUrl = configUtils.FORM_CONFIG_LOGIN_URL;
  config.webapp.login.formConfig = formConfig;
  return config;
};
export const buildInValidRealmType:Function = function():EjpConfig {
  let config:EjpConfig = buildValidLoginConfig();
  config.webapp.login.realm.type = INVALID;
  return config;
};
export const buildInValidRealmFactory:Function = function():EjpConfig {
  let config:EjpConfig = buildValidLoginConfig();
  config.webapp.login.realm.type = RealmType.CUSTOM;
  return config;
};
export const buildValidRealm:Function = function():EjpConfig {
  let config:EjpConfig = buildValidLoginConfig();
  let realm:EjpRealmConfig = config.webapp.login.realm;
  realm.connectorFactory = configUtils.REALM_CONNECTOR_FACTORY;
  realm.securedArea = configUtils.REALM_SECURED_AREA;
  realm.type = configUtils.REALM_TYPE;
  return config;
};
export const buildInValidSession:Function = function():EjpConfig {
  let config:EjpConfig = buildValidRealm();
  let session:EjpSessionConfig = new EjpSessionConfig();
  session.errorUrl = configUtils.SESSION_ERROR_URL;
  session.maxAge = configUtils.SESSION_MAX_AGE;
  session.storage = INVALID;
  config.webapp.session = session;
  return config;
};
export const buildFullConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildInValidSession();
  let webapp:EjpWebAppConfig = config.webapp;
  let bootstrap:EjpBootstrapConfig = new EjpBootstrapConfig();
  let jslets:EjpJsletsConfig = new EjpJsletsConfig();
  let resourceMap:EjpResourceMapperConfig = new EjpResourceMapperConfig();
  let security:EjpSecurityConfig = new EjpSecurityConfig();
  let staticResource:EjpStaticResourcesConfig = new EjpStaticResourcesConfig();
  let role:EjpRoleConfig = new EjpRoleConfig();
  let constraint:EjpConstraintConfig = new EjpConstraintConfig()
  webapp.author = configUtils.WEBAPP_AUTHOR;
  webapp.state = configUtils.WEBAPP_STATE;
  webapp.description = configUtils.WEBAPP_DESCRIPTION;
  webapp.version = configUtils.WEBAPP_VERSION;
  bootstrap.path = configUtils.BOOTSTRAP_PATH;
  bootstrap.priority = configUtils.BOOTSTRAP_PRIORITY;
  webapp.bootstrap = [bootstrap];
  jslets.config = [configUtils.JSLET_CONFIG] 
  jslets.enableAutowire = configUtils.JSLET_ENABLE_AUTOWIRE;
  webapp.jslets = jslets;
  webapp.session.storage = configUtils.SESSION_STORAGE;
  resourceMap.name = configUtils.RESOURCEMAP_NAME;
  resourceMap.value = configUtils.RESOURCEMAP_VALUE;
  webapp.resourceMap = [resourceMap];
  staticResource.urlPattern = configUtils.RESOURCES_URL_PATTERNS;
  security.staticResources = [staticResource];
  role.name = configUtils.ROLE_NAME;
  role.path = configUtils.ROLE_PATH;
  security.roles = [role];
  constraint.errorUrl = configUtils.CONSTRAINT_ERROR_URL;
  constraint.name = configUtils.CONSTRAINT_NAME;
  constraint.roles = [configUtils.CONSTRAINT_ROLE];
  constraint.urlPattern = configUtils.CONSTRAINT_URL_PATTERN;
  security.constraints = [constraint];
  webapp.security = security;
  return config;
};
