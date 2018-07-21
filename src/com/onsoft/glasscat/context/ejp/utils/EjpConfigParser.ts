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

import {EjpConfig, EjpWebAppConfig, EjpJsletsConfig, EjpBootstrapConfig,
        EjpSessionConfig, EjpResourceMapperConfig, EjpLoginConfig, EjpFormConfig,
        EjpRealmConfig, EjpSecurityConfig, EjpConstraintConfig, EjpRoleConfig,
        EjpStaticResourcesConfig} from "jec-glasscat-config";
import {EjpWebAppConfigImpl} from "../EjpWebAppConfigImpl";
import {EjpSecurityConfigImpl} from "../EjpSecurityConfigImpl";
import {EjpStaticResourcesConfigImpl} from "../EjpStaticResourcesConfigImpl";
import {EjpRoleConfigImpl} from "../EjpRoleConfigImpl";
import {EjpConstraintConfigImpl} from "../EjpConstraintConfigImpl";
import {EjpLoginConfigImpl} from "../EjpLoginConfigImpl";
import {EjpFormConfigImpl} from "../EjpFormConfigImpl";
import {EjpRealmConfigImpl} from "../EjpRealmConfigImpl";
import {EjpJsletsConfigImpl} from "../EjpJsletsConfigImpl";
import {EjpBootstrapConfigImpl} from "../EjpBootstrapConfigImpl";
import {EjpResourceMapperConfigImpl} from "../EjpResourceMapperConfigImpl";
import {EjpSessionConfigImpl} from "../EjpSessionConfigImpl";
import {EjpConfigImpl} from "../EjpConfigImpl";

/**
 * A parser utility for creating GlassCat <code>EjpConfig</code> instances from 
 * a loaded manifest file.
 */
export class EjpConfigParser {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConfigParser</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses properties declared at the root of the manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpWebAppConfig} a <code>WebAppConfig</code> instance built from
   *                           the specified data.
   */
  private parseWebApp(manifest:any):EjpWebAppConfig {
    const webapp:any = manifest.webapp;
    const cfg:EjpWebAppConfig = new EjpWebAppConfigImpl();
    cfg.name = webapp.name;
    cfg.description = webapp.description;
    cfg.version = webapp.version;
    cfg.author = webapp.author;
    cfg.contextRoot = webapp.contextRoot;
    cfg.state = webapp.state;
    cfg.welcomeFile = webapp.welcomeFile;
    cfg.jslets = this.parseJslets(manifest);
    cfg.bootstrap = this.parseBootstrapFiles(manifest);
    cfg.session = this.parseSession(manifest);
    cfg.resourceMap = this.parseResourceMap(manifest);
    cfg.login = this.parseLogin(manifest);
    cfg.security = this.parseSecurity(manifest);
    return cfg;
  }

  /**
   * Parses the <code>security</code> property for the specified manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpSecurityConfig} a <code>SecurityConfig</code> instance built 
   *                             from the specified data.
   */
  private parseSecurity(manifest:any):EjpSecurityConfig {
    const security:any = manifest.webapp.security;
    const cfg:EjpSecurityConfig = new EjpSecurityConfigImpl();
    if(security) {
      cfg.constraints = this.parseConstraintsConfig(security.constraints);
      cfg.roles = this.parseRolesConfig(security.roles);
      cfg.staticResources = this.parseStaticConfig(security.staticResources);
    } else {
      cfg.constraints = this.parseConstraintsConfig(null);
      cfg.roles = this.parseRolesConfig(null);
      cfg.staticResources = this.parseStaticConfig(null);
    }
    return cfg;
  }

  /**
   * Parses the <code>security.staticResources</code> property for the specified 
   * manifest file.
   * 
   * @param {any} staticResources the data to parse.
   * @return {Array<EjpStaticResourcesConfig>} an array of 
   *                                          <code>StaticResourcesConfig</code>
   *                                          instance built from the specified
   *                                          data.
   */
  private parseStaticConfig(staticResources:any):EjpStaticResourcesConfig[] {
    const cfg:EjpStaticResourcesConfig[] =
                                          new Array<EjpStaticResourcesConfig>();
    let len:number = -1;
    let resourcesConfig:EjpStaticResourcesConfig = null;
    let rawResourcesConfig:any = null;
    if(staticResources) {
      len = staticResources.length;
      while(len--) {
        rawResourcesConfig = staticResources[len];
        resourcesConfig = new EjpStaticResourcesConfigImpl();
        resourcesConfig.urlPattern = rawResourcesConfig.urlPattern;
        cfg.push(resourcesConfig);
      }
    }
    return cfg;
  }

  /**
   * Parses the <code>security.roles</code> property for the specified manifest
   * file.
   * 
   * @param {any} roles the data to parse.
   * @return {Array<EjpRoleConfig>} an array of <code>RoleConfig</code> instance 
   *                                built from the specified data.
   */
  private parseRolesConfig(roles:any):EjpRoleConfig[] {
    const cfg:EjpRoleConfig[] = new Array<EjpRoleConfig>();
    let len:number = -1;
    let roleConfig:EjpRoleConfig = null;
    let rawRole:any = null;
    if(roles) {
      len = roles.length;
      while(len--) {
        rawRole = roles[len];
        roleConfig = new EjpRoleConfigImpl();
        roleConfig.name = rawRole.name;
        roleConfig.path = rawRole.path;
        cfg.push(roleConfig);
      }
    }
    return cfg;
  }

  /**
   * Parses the <code>security.constraints</code> property for the specified 
   * manifest file.
   * 
   * @param {any} constraints the data to parse.
   * @return {Array<EjpConstraintConfig>} an array of
   *                                      <code>ConstraintConfig</code> instance
   *                                      built from the specified data.
   */
  private parseConstraintsConfig(constraints:any):EjpConstraintConfig[] {
    const cfg:EjpConstraintConfig[] = new Array<EjpConstraintConfig>();
    let len:number = -1;
    let constraintConfig:EjpConstraintConfig = null;
    let rawConstraint:any = null;
    if(constraints) {
      len = constraints.length;
      while(len--) {
        rawConstraint = constraints[len];
        constraintConfig = new EjpConstraintConfigImpl();
        constraintConfig.name = rawConstraint.name;
        constraintConfig.roles = rawConstraint.roles;
        constraintConfig.urlPattern = rawConstraint.urlPattern;
        constraintConfig.errorUrl = rawConstraint.errorUrl;
        cfg.push(constraintConfig);
      }
    }
    return cfg;
  }

  /**
   * Parses the <code>login</code> property for the specified manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpLoginConfig} a <code>LoginConfig</code> instance built from the 
   *                          specified data.
   */
  private parseLogin(manifest:any):EjpLoginConfig {
    const login:any = manifest.webapp.login;
    const cfg:EjpLoginConfig = new EjpLoginConfigImpl();
    if(login) {
      cfg.authMethod = login.authMethod;
      cfg.formConfig = this.parseFormConfig(manifest);
      cfg.realm = this.parseRealm(manifest);
    } else {
      cfg.formConfig = new EjpFormConfigImpl();
      cfg.realm = new EjpRealmConfigImpl();
    }
    return cfg;
  }

  /**
   * Parses the <code>login.formConfig</code> property for the specified
   * manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpFormConfig} a <code>FormConfig</code> instance built from the 
   *                         specified data.
   */
  private parseFormConfig(manifest:any):EjpFormConfig {
    const form:any = manifest.webapp.login.formConfig;
    const cfg:EjpFormConfig = new EjpFormConfigImpl();
    if(form) {
      cfg.loginUrl = form.loginUrl;
      cfg.errorUrl = form.errorUrl;
    }
    return cfg;
  }
  
  /**
   * Parses the <code>login.realm</code> property for the specified manifest
   * file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpRealmConfig} a <code>RealmConfig</code> instance built from the 
   *                          specified data.
   */
  private parseRealm(manifest:any):EjpRealmConfig {
    const realm:any = manifest.webapp.login.realm;
    const cfg:EjpRealmConfig = new EjpRealmConfigImpl();
    if(realm) {
      cfg.type = realm.type;
      cfg.securedArea = realm.securedArea;
      cfg.connectorFactory = realm.connectorFactory;
    }
    return cfg;
  }
  
  /**
   * Parses the <code>jslets</code> property for the specified manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpJsletsConfig} a <code>JsletsConfig</code> instance built from 
   *                           the specified data.
   */
  private parseJslets(manifest:any):EjpJsletsConfig {
    const jslets:any = manifest.webapp.jslets;
    const cfg:EjpJsletsConfig = new EjpJsletsConfigImpl();
    if(jslets) {
      if(jslets.enableAutowire !== undefined) {
        cfg.enableAutowire = jslets.enableAutowire;
      }
      cfg.configFile = jslets.configFile;
      cfg.config = jslets.config;
    }
    if(!cfg.config) {
      cfg.config = new Array<string>();
    }
    return cfg;
  }

  /**
   * Parses the <code>bootstrap</code> property for the specified manifest file.
   * 
   * @method parseBootstrapFiles
   * @param {any} manifest the manifest data to parse.
   * @return {Array<EjpJsletsConfig>} a array of <code>BootstrapConfig</code> 
   *                                  instance built from the specified data.
   */
  private parseBootstrapFiles(manifest:any):EjpBootstrapConfig[] {
    const cfg:EjpBootstrapConfig[] = new Array<EjpBootstrapConfig>();
    const bootstrapFiles:any = manifest.webapp.bootstrap;
    let len:number = -1;
    let file:any = null;
    let configFile:EjpBootstrapConfig = null;
    if(bootstrapFiles) {
      len = bootstrapFiles.length;
      while(len--) {
        file = bootstrapFiles[len];
        configFile = new EjpBootstrapConfigImpl();
        configFile.path = file.path;
        configFile.priority = file.priority;
        cfg.push(configFile);
      }
    }
    return cfg;
  }

  /**
   * Parses the <code>resourceMap</code> property for the specified manifest
   * file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {Array<ResourceMapper>} the array of <code>ResourceMapper</code> 
   *                                 instances used for resource mapping.
   */
  private parseResourceMap(manifest:any):Array<EjpResourceMapperConfig> {
    const cfg:Array<EjpResourceMapperConfig> =
                                           new Array<EjpResourceMapperConfig>();
    const resourceMapCfg:any = manifest.webapp.resourceMap;
    let len:number = -1;
    let mapObj:any = null;
    let mapper:EjpResourceMapperConfig = null;
    let name:string = null;
    if(resourceMapCfg) {
      len = resourceMapCfg.length;
      while(len--) {
        mapObj = resourceMapCfg[len];
        mapper = new EjpResourceMapperConfigImpl();
        mapper.name = mapObj.name;
        mapper.value = mapObj.value;
        cfg.push(mapper);
      }
    }
    return cfg;
  }
  
  /**
   * Parses the <code>session</code> property for the specified manifest file.
   * 
   * @param {any} manifest the manifest data to parse.
   * @return {EjpSessionConfig} a new <code>SessionConfig</code> instance built 
   *                            from the specified data.
   */
  private parseSession(manifest:any):EjpSessionConfig {
    const cfg:EjpSessionConfig = new EjpSessionConfigImpl();
    const session:any = manifest.webapp.session;
    if(session) {
      cfg.storage = session.storage;
      cfg.errorUrl = session.errorUrl;
      if(session.maxAge) cfg.maxAge = session.maxAge;
    }
    return cfg;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses data loaded from a manifest file and returns the 
   * <code>EjpConfig</code> instance built from the specified data.
   * 
   * @param {any} manifest the data loaded from a manifest file.
   * @return {EjpConfig} a <code>EjpConfig</code> instance built from the
   *                     specified data.
   */
  public parse(manifest:any):EjpConfig {
    const cfg:EjpConfig = new EjpConfigImpl();
    cfg.webapp = this.parseWebApp(manifest);
    return cfg;
  }
}
