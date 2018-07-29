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
import { EjpConfig, EjpWebAppConfig, EjpBootstrapConfig, EjpJsletsConfig,
         EjpSessionConfig, EjpResourceMapperConfig, EjpLoginConfig,
         EjpFormConfig, EjpRealmConfig, EjpSecurityConfig, EjpRoleConfig,
         EjpStaticResourcesConfig, EjpConstraintConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the EjpConfigSerializerTest test
 * suite.
 */

// Utilities:

export const buildMinimalConfig:Function = function():EjpConfig {
  const config:EjpConfig = new EjpConfigImpl();
  const webapp:EjpWebAppConfig = new EjpWebAppConfigImpl();
  webapp.name = configUtils.WEBAPP_NAME;
  webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  webapp.welcomeFile = configUtils.WEBAPP_WELCOMEFILE;
  config.webapp = webapp;
  return config;
}
export const buildFullConfig:Function = function():EjpConfig {
  const config:EjpConfig = buildMinimalConfig();
  const bootstrap:EjpBootstrapConfig = new EjpBootstrapConfigImpl();
  const jslets:EjpJsletsConfig = new EjpJsletsConfigImpl();
  const session:EjpSessionConfig = new EjpSessionConfigImpl();
  const resourceMap:EjpResourceMapperConfig = new EjpResourceMapperConfigImpl();
  const login:EjpLoginConfig = new EjpLoginConfigImpl();
  const formConfig:EjpFormConfig = new EjpFormConfigImpl();
  const realm:EjpRealmConfig = new EjpRealmConfigImpl();
  const security:EjpSecurityConfig = new EjpSecurityConfigImpl();
  const staticResource:EjpStaticResourcesConfig = new EjpStaticResourcesConfigImpl();
  const role:EjpRoleConfig = new EjpRoleConfigImpl();
  const constraint:EjpConstraintConfig = new EjpConstraintConfigImpl();
  config.webapp.author = configUtils.WEBAPP_AUTHOR;
  config.webapp.state = configUtils.WEBAPP_STATE;
  config.webapp.description = configUtils.WEBAPP_DESCRIPTION;
  config.webapp.version = configUtils.WEBAPP_VERSION;
  bootstrap.path = configUtils.BOOTSTRAP_PATH;
  bootstrap.priority = configUtils.BOOTSTRAP_PRIORITY;
  config.webapp.bootstrap = [bootstrap];
  jslets.config = [configUtils.JSLET_CONFIG] 
  jslets.enableAutowire = configUtils.JSLET_ENABLE_AUTOWIRE;
  config.webapp.jslets = jslets;
  session.errorUrl = configUtils.SESSION_ERROR_URL;
  session.maxAge = configUtils.SESSION_MAX_AGE;
  session.storage = configUtils.SESSION_STORAGE;
  config.webapp.session = session;
  resourceMap.name = configUtils.RESOURCEMAP_NAME;
  resourceMap.value = configUtils.RESOURCEMAP_VALUE;
  config.webapp.resourceMap = [resourceMap];
  login.authMethod = configUtils.LOGIN_AUTH_METHOD;
  formConfig.errorUrl = configUtils.FORM_CONFIG_ERROR_URL;
  formConfig.loginUrl = configUtils.FORM_CONFIG_LOGIN_URL;
  login.formConfig = formConfig;
  realm.connectorFactory = configUtils.REALM_CONNECTOR_FACTORY;
  realm.securedArea = configUtils.REALM_SECURED_AREA;
  realm.type = configUtils.REALM_TYPE;
  login.realm = realm;
  config.webapp.login = login;
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
  config.webapp.security = security;
  return config;
}
export const NOT_OPTIMIZED:string = '{"webapp":{"name":"test-ejp","description":null,"version":null,"author":null,"contextRoot":"test","state":null,"welcomeFile":"index.html","jslets":null,"bootstrap":null,"session":null,"resourceMap":null,"login":null,"security":null}}';
export const OPTIMIZED:string = '{"webapp":{"name":"test-ejp","contextRoot":"test","welcomeFile":"index.html"}}';
export const COMPLETE_NOT_OPTIMIZED:string = '{"webapp":{"name":"test-ejp","description":"Test configuration file","version":"1.0.0","author":"ONSOFT SYSTEMS","contextRoot":"test","state":"stateful","welcomeFile":"index.html","jslets":{"configFile":null,"config":["jslets/Status"],"enableAutowire":true},"bootstrap":[{"path":"bootstrap/InitApp","priority":1}],"session":{"storage":"local","errorUrl":"/login","maxAge":3600},"resourceMap":[{"name":"font-awesome","value":"/styles/font-awesome/fonts"}],"login":{"authMethod":"ejp-form","formConfig":{"loginUrl":"/login","errorUrl":"/error/login"},"realm":{"type":"file","securedArea":"GlassCat Test Project","connectorFactory":"path/to/Factory"}},"security":{"constraints":[{"name":"ConsoleConstraint","roles":["ADMIN"],"urlPattern":"/console/*","errorUrl":"/login"}],"roles":[{"name":"ADMIN","path":"security/AdminRole"}],"staticResources":[{"urlPattern":"/vendor/*/styles/*/node_modules/*","cacheControlPolicy":null}]}}}';
