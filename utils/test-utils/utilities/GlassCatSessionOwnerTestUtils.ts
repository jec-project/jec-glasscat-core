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

import { SecurityRole, SecurityConstraint } from "jec-exchange";
import { BasicSecurityRole } from "../../../src/com/onsoft/glasscat/security/roles/BasicSecurityRole";
import { BasicSecurityConstraint } from "../../../src/com/onsoft/glasscat/security/core/BasicSecurityConstraint";
import { EjpConstraintConfigImpl } from "../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfigImpl";
import { EjpConstraintConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the GlassCatSessionOwnerTest test
 * suite.
 */

// Utilities:
export const USER_ROLE_NAME:string = "USER";
export const ADMIN_ROLE_NAME:string = "ADMIN";
const buildRoles:Function = function():SecurityRole[] {
  const roles:SecurityRole[] = new Array<SecurityRole>();
  roles.push(new BasicSecurityRole(ADMIN_ROLE_NAME));
  return roles;
};
export const ID: string = "5375a08a-7cb4-421b-b782-8a562cea3d36";
export const ALIAS:string = "alias";
export const ROLES:SecurityRole[] = buildRoles();
const buildEjpConstraintConfig:Function = function(role:string):EjpConstraintConfig {
  const cfg:EjpConstraintConfig = new EjpConstraintConfigImpl();
  cfg.roles = [role];
  cfg.errorUrl = "error/url";
  cfg.name = role;
  cfg.urlPattern = "test/url";
  return cfg;
};
export const buildGrantedConstraint:Function = function():SecurityConstraint {
  const constraint:SecurityConstraint =
         new BasicSecurityConstraint(buildEjpConstraintConfig(ADMIN_ROLE_NAME));
  return constraint;
};
export const buildNotGrantedConstraint:Function = function():SecurityConstraint {
  const constraint:SecurityConstraint =
          new BasicSecurityConstraint(buildEjpConstraintConfig(USER_ROLE_NAME));
  return constraint;
};