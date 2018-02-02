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

import { AuthMethod, SessionStorageType, RealmType } from "jec-exchange";

/*!
 * This module constains utilities used to test EJP configuration files.
 */

// Utilities:
const CWD:string = process.cwd();
export const MANIFEST_PATH:string = "/webapp/WEB-INF/web.json";
export const INVALID_PATH:string = CWD + "/utils";
export const VALID_PATH:string = CWD + "/utils/test-utils/files";
export const INVALID_FILE:string = CWD + "/utils/test-utils/files/invalid-webapp";

export const WEBAPP_NAME:string = "test-ejp";
export const WEBAPP_CONTEXTROOT:string = "test";
export const WEBAPP_WELCOMEFILE:string = "index.html";
export const WEBAPP_DESCRIPTION:string = "Test configuration file";
export const WEBAPP_VERSION:string = "1.0.0";
export const WEBAPP_AUTHOR:string = "ONSOFT SYSTEMS";
export const WEBAPP_STATE:string = "stateful";
export const BOOTSTRAP_PATH:string = "bootstrap/InitApp";
export const BOOTSTRAP_PRIORITY:number = 1;
export const SESSION_ERROR_URL:string = "/login";
export const SESSION_STORAGE:SessionStorageType = SessionStorageType.LOCAL;
export const SESSION_MAX_AGE:number = 3600;
export const RESOURCEMAP_NAME:string = "font-awesome";
export const RESOURCEMAP_VALUE:string = "/styles/font-awesome/fonts";
export const LOGIN_AUTH_METHOD:AuthMethod = ("ejp-form" as AuthMethod);
export const FORM_CONFIG_ERROR_URL:string = "/error/login";
export const FORM_CONFIG_LOGIN_URL:string = "/login";
export const REALM_TYPE:RealmType = RealmType.FILE;
export const REALM_SECURED_AREA:string = "GlassCat Test Project";
export const REALM_CONNECTOR_FACTORY:string = "path/to/Factory";
export const ROLE_NAME:string = "ADMIN";
export const ROLE_PATH:string = "security/AdminRole";
export const RESOURCES_URL_PATTERNS:string = "/vendor/*/styles/*/node_modules/*";
export const CONSTRAINT_NAME:string = "ConsoleConstraint";
export const CONSTRAINT_ROLE:string = "ADMIN";
export const CONSTRAINT_URL_PATTERN:string = "/console/*";
export const CONSTRAINT_ERROR_URL:string = "/login";
export const JSLET_CONFIG:string = "jslets/Status";
export const JSLET_ENABLE_AUTOWIRE:boolean = true;
