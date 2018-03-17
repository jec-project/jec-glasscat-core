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

import {LoggerManager} from "../../../util/logging/LoggerManager";
import {EjpConfig} from "../EjpConfig";
import {EjpWebAppConfig} from "../EjpWebAppConfig";
import {EjpBootstrapConfig} from "../EjpBootstrapConfig";
import {EjpJsletsConfig} from "../EjpJsletsConfig";
import {EjpConfigValidator} from "./EjpConfigValidator";
import {EjpLoginConfig} from "../EjpLoginConfig";
import {EjpFormConfig} from "../EjpFormConfig";
import {EjpRealmConfig} from "../EjpRealmConfig";
import {AuthMethod} from "jec-exchange";
import {EjpSessionConfig} from "../EjpSessionConfig";
import {EjpResourceMapperConfig} from "../EjpResourceMapperConfig";
import {EjpSecurityConfig} from "../EjpSecurityConfig";
import {EjpRoleConfig} from "../EjpRoleConfig";
import {EjpConstraintConfig} from "../EjpConstraintConfig";
import {EjpStaticResourcesConfig} from "../EjpStaticResourcesConfig";
import {UrlStringsEnum} from "jec-commons";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * A utility class for serializing <code>EjpConfig</code> instances.
 */
export class EjpConfigSerializer {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConfigSerializer</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The validator object for this <code>EjpConfigSerializer</code> instance.
   * @type EjpConfigValidator
   */
  private _validator:EjpConfigValidator = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._validator = new EjpConfigValidator();
  }

  /**
   * Returns an optimized string version the specified EJP configuration object.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance to serialize.
   * @param {boolean} optimize indicates whether the JSON configuration file
   *                           must be optimized (<code> true</code> ), or not
   *                           (<code> false</code> ).
   * @return {string} an optimized string version the specified EJP
   *                  configuration object.
   */
  private stringify(config:EjpConfig, optimize:boolean):string {
    const webapp:EjpWebAppConfig = config.webapp;
    let optimized:any = null;
    let result:string = null;
    if(optimize) {
      optimized = { };
      this.optimizeWebbAppConfig(optimized, webapp);
      this.optimizeBootstrapConfig(optimized, webapp.bootstrap);
      this.optimizeJsletConfig(optimized, webapp.jslets);
      this.optimizeLoginConfig(optimized, webapp.login);
      this.optimizeSessionConfig(optimized, webapp.session);
      this.optimizeResourceMapConfig(optimized, webapp.resourceMap);
      this.optimizeSecurityConfig(optimized, webapp.security);
      result = JSON.stringify(optimized);
    } else {
      result = JSON.stringify(config);
    }
    return result;
  }

  /**
   * Creates an optimized string version the specified <code>WebAppConfig</code>
   * object.
   *
   * @param {any} result the reference to the optimized version of an
   *                        <code>EjpConfig</code> instance.
   * @param {EjpWebAppConfig} webapp the <code>WebAppConfig</code> instance to
   *                                 optimize.
   */
  private optimizeWebbAppConfig(result:any, webapp:EjpWebAppConfig):void {
    let val:string = null;
    let optimizedWebapp:any = {
      name: webapp.name,
      contextRoot: webapp.contextRoot,
      welcomeFile: webapp.welcomeFile
    };
    val = webapp.description;
    if(val && val !== UrlStringsEnum.EMPTY_STRING) {
      optimizedWebapp.description = val;
    }
    val = webapp.version;
    if(val && val !== UrlStringsEnum.EMPTY_STRING) {
      optimizedWebapp.version = val;
    }
    val = webapp.author;
    if(val && val !== UrlStringsEnum.EMPTY_STRING) {
      optimizedWebapp.author = val;
    }
    val = webapp.state;
    if(val) {
      optimizedWebapp.state = val;
    }
    result.webapp = optimizedWebapp;
  }

  /**
   * Creates an optimized string version the specified
   * <code>BootstrapConfig</code> object.
   *
   * @param {any} result the reference to the optimized version of an
   *                        <code>EjpConfig</code> instance.
   * @param {Array<EjpBootstrapConfig>} config the array of
   *                                           <code>BootstrapConfig</code> 
   *                                           instances to optimize.
   */
  private optimizeBootstrapConfig(result:any,
                                             config:EjpBootstrapConfig[]):void {
    let len:number = -1;
    let bootstrapArr:any[] = null;
    let bootstrapCfg:EjpBootstrapConfig = null;
    let obj:any = null;
    let priority:number = null;
    if(config) {
      len = config.length;
      if(len > 0) {
        bootstrapArr = new Array<any>();
        while(len--){
          bootstrapCfg = config[len];
          obj = {
            path: bootstrapCfg.path
          };
          priority = bootstrapCfg.priority;
          if(priority) obj.priority = priority;
          bootstrapArr.push(obj);
        }
        result.webapp.bootstrap = bootstrapArr;
      }
    }
  }

  /**
   * Creates an optimized string version the specified <code>JsletsConfig</code>
   * object.
   * @param {any} result the reference to the optimized version of an
   *                     <code>EjpConfig</code> instance.
   * @param {EjpJsletsConfig} jsletConfig the <code>JsletsConfig</code> instance
   *                                      to optimize.
   */
  private optimizeJsletConfig(result:any, jsletConfig:EjpJsletsConfig):void {
    let len:number = -1;
    let jsletsArr:any[] = null;
    let jslets:any[] = null;
    let resultConfig:any = null;
    let configFile:string = null;
    let enableAutowire:boolean = false;
    if(jsletConfig) {
      jsletsArr = jsletConfig.config;
      enableAutowire = jsletConfig.enableAutowire;
      if(enableAutowire || jsletsArr) {
        resultConfig = {};
        if(enableAutowire) resultConfig.enableAutowire = enableAutowire;
        len = jsletsArr.length;
        if(len > 0) {
          jslets = new Array<string>();
          while(len--){
            jslets.push(jsletsArr[len]);
          }
          resultConfig.config = jslets;
        }
      }
      configFile = jsletConfig.configFile;
      if(configFile) {
        if(!resultConfig) resultConfig = {};
        resultConfig.configFile = configFile;
      }
      if(resultConfig) result.webapp.jslets = resultConfig;
    }
  }

  /**
   * Creates an optimized string version the specified <code>loginConfig</code>
   * object.
   * 
   * @param {any} result the reference to the optimized version of an
   *                     <code>EjpConfig</code> instance.
   * @param {EjpLoginConfig} loginConfig the <code>LoginConfig</code> instance
   *                                     to optimize.
   */
  private optimizeLoginConfig(result:any, loginConfig:EjpLoginConfig):void {
    let login:any = null;
    let formConfig:EjpFormConfig = null;
    let realmConfig:EjpRealmConfig = null;
    let optConfig:any = null;
    let value:string = null;
    let authMethod:AuthMethod = null;
    if(loginConfig) {
      authMethod = loginConfig.authMethod;
      if(authMethod && authMethod !== AuthMethod.NONE) {
        login = { authMethod: authMethod };
        formConfig = loginConfig.formConfig;
        if(formConfig) {
          optConfig = {};
          value = formConfig.errorUrl;
          if(value) optConfig.errorUrl = value;
          value = formConfig.loginUrl;
          if(value) optConfig.loginUrl = value;
          login.formConfig = optConfig;
        }
        realmConfig = loginConfig.realm;
        if(realmConfig) {
          optConfig = {};
          value = (realmConfig.type as string);
          if(value) optConfig.type = value;
          value = realmConfig.securedArea;
          if(value) optConfig.securedArea = value;
          value = realmConfig.connectorFactory;
          if(value) optConfig.connectorFactory = value;
          login.realm = optConfig;
        }
        result.webapp.login = login;
      }
    }
  }
  
  /**
   * Creates an optimized string version the specified
   * <code>sessionConfig</code> object.
   *
   * @param {any} result the reference to the optimized version of an
   *                     <code>EjpConfig</code> instance.
   * @param {EjpSessionConfig} sessionConfig the <code>SessionConfig</code>
   *                                         instance to optimize.
   */
  private optimizeSessionConfig(result:any,
                                          sessionConfig:EjpSessionConfig):void {
    let session:any = null;
    let value:string = null;
    let maxAge:number = null;
    if(sessionConfig) {
      value = sessionConfig.storage;
      if(value) {
        session = { storage: value };
        value = sessionConfig.errorUrl;
        if(value) session.errorUrl = value;
        maxAge = sessionConfig.maxAge;
        if(maxAge) session.maxAge = maxAge;
        result.webapp.session = session;
      }
    }
  }

  /**
   * Creates an optimized string version the specified <code>resourceMap</code>
   * array.
   * 
   * @param {any} result the reference to the optimized version of an
   *                        <code>EjpConfig</code> instance.
   * @param {Array<EjpResourceMapperConfig>} resourceMap 
   *                                          the <code>ResourceMapConfig</code>
   *                                          instance to optimize.
   */
  private optimizeResourceMapConfig(result:any,
                                resourceMapper:EjpResourceMapperConfig[]):void {
    if(resourceMapper && resourceMapper.length > 0) {
      result.webapp.resourceMap = resourceMapper.slice(0);
    }
  }

  /**
   * Creates an optimized string version the specified
   * <code>securityConfig</code> object.
   * 
   * @param {any} result the reference to the optimized version of an
   *                        <code>EjpConfig</code> instance.
   * @param {EjpSecurityConfig} securityConfig the <code>SecurityConfig</code>
   *                                           instance to  optimize.
   */
  private optimizeSecurityConfig(result:any,
                                        securityConfig:EjpSecurityConfig):void {
    let rolesConfig:EjpRoleConfig[] = null;
    let hasRoles:boolean = false;
    let constraintsConfig:EjpConstraintConfig[] = null;
    let hasConstraints:boolean = false;
    let staticResourcesConfig:EjpStaticResourcesConfig[] = null;
    let hasStaticResources:boolean = false;
    let security:any = null;
    if(securityConfig) {
      rolesConfig = securityConfig.roles;
      constraintsConfig = securityConfig.constraints;
      staticResourcesConfig = securityConfig.staticResources;
      hasRoles = rolesConfig && rolesConfig.length > 0;
      hasConstraints = constraintsConfig && constraintsConfig.length > 0;
      hasStaticResources =
                      staticResourcesConfig && staticResourcesConfig.length > 0;
      if(hasRoles || hasConstraints || hasStaticResources) {
        security = {};
        if(hasRoles) security.roles = this.optimizeRoles(rolesConfig);
        if(hasConstraints) {
          security.constraints = this.optimizeConstraints(constraintsConfig);
        }
        if(hasStaticResources) {
          security.staticResources =
                            this.optimizeStaticResources(staticResourcesConfig);
        }
        result.webapp.security = security;
      }
    }
  }

  /**
   * Creates an optimized string version the specified <code>rolesConfig</code>
   * array.
   *
   * @param {Array<EjpRoleConfig>} rolesConfig the array of
   *                                           <code>RoleConfig</code> instances 
   *                                           to optimize.
   */
  private optimizeRoles(rolesConfig:EjpRoleConfig[]):any[] {
    let roles:any[] = new Array<any>();
    let len:number = rolesConfig.length;
    while(len--) {
      roles.push(rolesConfig[len]);
    }
    return roles;
  }

  /**
   * Creates an optimized string version the specified 
   * <code>constraintsConfig</code>  array.
   *
   * @param {Array<EjpConstraintConfig>} rolesConfig the array of
   *                                               <code>ConstraintConfig</code> 
   *                                               instances to optimize.
   */
  private optimizeConstraints(constraintsConfig:EjpConstraintConfig[]):any[] {
    let constraints:any[] = new Array<any>();
    let len:number = constraintsConfig.length;
    while(len--) {
      constraints.push(constraintsConfig[len]);
    }
    return constraints;
  }
  
  /**
   * Creates an optimized string version the specified
   * <code>staticResourcesConfig</code> array.
   *
   * @param {Array<EjpStaticResourcesConfig>} staticResourcesConfig the array of
   *                                          <code>StaticResourcesConfig</code> 
   *                                          instances to optimize.
   */
  private optimizeStaticResources(
                       staticResourcesConfig:EjpStaticResourcesConfig[]):any[] {
    let resources:any[] = new Array<any>();
    let len:number = staticResourcesConfig.length;
    while(len--) {
      resources.push(staticResourcesConfig[len]);
    }
    return resources;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Serializes the EJP configuration object for a GlassCat container.
   *
   * @param {EjpConfig} config the <code>EjpConfig</code> instance to serialize.
   * @param {Function} success the callback method called to handle the result 
   *                           of this operation. This method takes the data 
   *                           object reference as parameter.
   * @param {Function} error the callback method called to handle the failure of
   *                         this operation. This method takes the error object
   *                         reference as parameter.
   * @param {boolean} optimize indicates whether the JSON configuration file
   *                           must be optimized (<code>true</code>), or not
   *                           (<code>false</code>).
   */
  public serialize(config:EjpConfig, success:(data:string)=>void,
                                     error:(err:GlassCatError)=>void,
                                     optimize:boolean = false):void {
    let data:string = null;
    this._validator.validate(config, (err:GlassCatError)=> {
      if(err) {
        error(err);
      } else {
        try {
          data = this.stringify(config, optimize);
          success(data);
        } catch(e) {
          const logManager:LoggerManager =
                                 (LoggerManager.getInstance() as LoggerManager);
          if(logManager.isInitialized()) logManager.error(e);
          const glassCatErr:GlassCatError = new GlassCatError(
            GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR, e
          );
          error(glassCatErr);
        }
      }
    });
  }
};
