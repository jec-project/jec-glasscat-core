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
 * This module constains utilities used by the EjpConfigSerializerTest test
 * suite.
 */

// Utilities:

export const buildMinimalConfig:Function = function():EjpConfig {
  let config:EjpConfig = new EjpConfig();
  let webapp:EjpWebAppConfig = new EjpWebAppConfig();
  webapp.name = configUtils.WEBAPP_NAME;
  webapp.contextRoot = configUtils.WEBAPP_CONTEXTROOT;
  webapp.welcomeFile = configUtils.WEBAPP_WELCOMEFILE;
  config.webapp = webapp;
  return config;
}
export const buildFullConfig:Function = function():EjpConfig {
  let config:EjpConfig = buildMinimalConfig();
  let bootstrap:EjpBootstrapConfig = new EjpBootstrapConfig();
  let jslets:EjpJsletsConfig = new EjpJsletsConfig();
  let session:EjpSessionConfig = new EjpSessionConfig();
  let resourceMap:EjpResourceMapperConfig = new EjpResourceMapperConfig();
  let login:EjpLoginConfig = new EjpLoginConfig();
  let formConfig:EjpFormConfig = new EjpFormConfig();
  let realm:EjpRealmConfig = new EjpRealmConfig();
  let security:EjpSecurityConfig = new EjpSecurityConfig();
  let staticResource:EjpStaticResourcesConfig = new EjpStaticResourcesConfig();
  let role:EjpRoleConfig = new EjpRoleConfig();
  let constraint:EjpConstraintConfig = new EjpConstraintConfig();
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
