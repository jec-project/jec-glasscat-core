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

import { AuthMethod, RealmType, SessionStorageType } from "jec-exchange";
import { EjpConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpConfigImpl";
import { EjpWebAppConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpWebAppConfigImpl";
import { EjpBootstrapConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpBootstrapConfigImpl";
import { EjpJsletsConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpJsletsConfigImpl";
import { EjpSessionConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpSessionConfigImpl";
import { EjpResourceMapperConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpResourceMapperConfigImpl";
import { EjpLoginConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfigImpl";
import { EjpFormConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpFormConfigImpl";
import { EjpRealmConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRealmConfigImpl";
import { EjpSecurityConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpSecurityConfigImpl";
import { EjpStaticResourcesConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpStaticResourcesConfigImpl";
import { EjpRoleConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpRoleConfigImpl";
import { EjpConstraintConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfigImpl";
import * as configUtils from "../../../utils/test-utils/utilities/EjpConfigUtils";
import { EjpConfig, EjpFormConfig, EjpRealmConfig, EjpSessionConfig,
         EjpWebAppConfig, EjpBootstrapConfig, EjpJsletsConfig,
         EjpSecurityConfig, EjpResourceMapperConfig, EjpStaticResourcesConfig,
         EjpRoleConfig, EjpConstraintConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the EjpConfigValidatorTest test
 * suite.
 */

// Utilities:
export const buildNoWebappConfig:Function = function():EjpConfig {
  return new EjpConfigImpl();
};
export const buildNoNameConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoWebappConfig();
  config.webapp = new EjpWebAppConfigImpl();
  return config;
};
export const buildNoWelcomeFileConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoNameConfig();
  config.webapp.name = configUtils.WEBAPP_NAME;
  return config;
};
export const buildNoContextRootConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoWelcomeFileConfig();
  config.webapp.welcomeFile = configUtils.WEBAPP_WELCOMEFILE;
  return config;
};
export const buildEmptyContextRootConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = "";
  return config;
};
export const buildInvalidStateConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  config.webapp.state = "invalid";
  return config;
};
export const buildLoginConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildNoContextRootConfig();
  config.webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  config.webapp.login = new EjpLoginConfigImpl();
  config.webapp.login.realm = new EjpRealmConfigImpl();
  return config;
};
export const buildInvalidAuthMethodConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildLoginConfig();
  config.webapp.login.authMethod = ("invalid" as AuthMethod);
  return config;
};
export const buildInvalidFormConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildLoginConfig();
  config.webapp.login.authMethod = AuthMethod.EJP_FORM;
  return config;
};
export const buildValidLoginConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildLoginConfig();
  const formConfig:EjpFormConfig = new EjpFormConfigImpl();
  config.webapp.login.authMethod = configUtils.LOGIN_AUTH_METHOD;
  formConfig.errorUrl = configUtils.FORM_CONFIG_ERROR_URL;
  formConfig.loginUrl = configUtils.FORM_CONFIG_LOGIN_URL;
  config.webapp.login.formConfig = formConfig;
  return config;
};
export const buildInValidRealmType:Function = function():EjpConfig {
  const config:EjpConfig = buildValidLoginConfig();
  config.webapp.login.realm.type = ("invalid" as RealmType);
  return config;
};
export const buildInValidRealmFactory:Function = function():EjpConfig {
  const config:EjpConfig = buildValidLoginConfig();
  config.webapp.login.realm.type = RealmType.CUSTOM;
  return config;
};
export const buildValidRealm:Function = function():EjpConfig {
  const config:EjpConfig = buildValidLoginConfig();
  const realm:EjpRealmConfig = config.webapp.login.realm;
  realm.connectorFactory = configUtils.REALM_CONNECTOR_FACTORY;
  realm.securedArea = configUtils.REALM_SECURED_AREA;
  realm.type = configUtils.REALM_TYPE;
  return config;
};
export const buildInValidSession:Function = function():EjpConfig {
  const config:EjpConfig = buildValidRealm();
  const session:EjpSessionConfig = new EjpSessionConfigImpl();
  session.errorUrl = configUtils.SESSION_ERROR_URL;
  session.maxAge = configUtils.SESSION_MAX_AGE;
  session.storage = ("invalid" as SessionStorageType);
  config.webapp.session = session;
  return config;
};
export const buildFullConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildInValidSession();
  const webapp:EjpWebAppConfig = config.webapp;
  const bootstrap:EjpBootstrapConfig = new EjpBootstrapConfigImpl();
  const jslets:EjpJsletsConfig = new EjpJsletsConfigImpl();
  const resourceMap:EjpResourceMapperConfig = new EjpResourceMapperConfigImpl();
  const security:EjpSecurityConfig = new EjpSecurityConfigImpl();
  const staticResource:EjpStaticResourcesConfig = new EjpStaticResourcesConfigImpl();
  const role:EjpRoleConfig = new EjpRoleConfigImpl();
  const constraint:EjpConstraintConfig = new EjpConstraintConfigImpl()
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
