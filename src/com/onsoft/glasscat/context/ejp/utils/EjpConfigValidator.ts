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
import {DomainState} from "../../../domains/containers/DomainState";
import {AuthMethod, RealmType, SessionStorageType} from "jec-exchange";
import {GlassCatLocaleManager} from "../../../i18n/GlassCatLocaleManager";
import {UrlStringsEnum, LogLevel} from "jec-commons";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * A utility class for validating EJP configuration files.
 */
export class EjpConfigValidator {

  //TODO: implement i18n for valddation messages.
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpConfigValidator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Sends the specified log to the logger, if it exists.
   *
   * @param {string} message the message to log.
   * @param {LogLevel} logLevel a value of the <code>LogLevel</code> enum.
   */
  private printLog(message:string, logLevel:LogLevel):void {
    const logger:LoggerManager = (LoggerManager.getInstance() as LoggerManager);
    if(logger.isInitialized()) {
      switch(logLevel) {
        case LogLevel.INFO :
          logger.info(message);
          break;
        case LogLevel.WARN :
          logger.warn(message);
          break;
      }
    }
  }

  /**
   * Builds and returns an object that defines an error encountered during the
   * validation process.
   * 
   * @param {number} errorCode the code of the error. Valid values are constants
   *                           of the <code>GlassCatErrorCode</code> class.
   * @param {sring} error the message that gives details about the error.
   * 
   * @return {any} an object that defines an error encountered during the
   *               validation process.
   */
  private buildErrorObj(errorCode:number, message:string):any {
    const errObj:any = {
      message: message,
      errorCode: errorCode
    };
    return errObj;
  }

  /**
   * Validates the EJP configuration object for a GlassCat container. 
   *
   * @param {any} config the configuration object to validate.
   * @return {any} an object that describes an error, or <code>null</code> if
   *               error encountered during the validation process.
   */
  private doValidation(config:EjpConfig):any {
    let prop:any = null;
    let stringVal:string = null;
    if(!config) {
      return this.buildErrorObj(
        GlassCatErrorCode.NULL_EJP_CONFIG, 
        "EJP configuration cannot be null"
      );
    } else if(!config.webapp) {
      return this.buildErrorObj(
        GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY,
        "EJP configuration missing property: 'webapp'"
      );
    } else {
      prop = config.webapp;
      if(!prop.name) {
        return this.buildErrorObj(
          GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY,
          "EJP configuration missing property: 'webapp.name'"
        );
      } else if(!prop.welcomeFile) {
        return this.buildErrorObj(
          GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY,
          "EJP configuration missing property: 'webapp.welcomeFile'"
        );
      } else if(prop.contextRoot === null || prop.contextRoot === undefined) {
        return this.buildErrorObj(
          GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY,
          "EJP configuration missing property: 'webapp.contextRoot'"
        );
      } else if(prop.contextRoot === UrlStringsEnum.EMPTY_STRING) {
        return this.buildErrorObj(
          GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, 
          "EJP configuration invalid property: 'webapp.contextRoot' must not be empty"
        );
      }
      stringVal = prop.state;
      if(stringVal) {
        if(stringVal !== DomainState.STATEFUL &&
           stringVal !== DomainState.STATELESS) {
          return this.buildErrorObj(
            GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY,
            "EJP configuration invalid property: 'webapp.state' must be a constant of the DomainState class"
          );
        }
      }
      prop = config.webapp.login;
      if(prop) {
        stringVal = prop.authMethod;
        if(stringVal) {
          if(stringVal !== AuthMethod.BASIC &&
             stringVal !== AuthMethod.DIGEST &&
             stringVal !== AuthMethod.EJP_FORM &&
             stringVal !== AuthMethod.FORM &&
             stringVal !== AuthMethod.NONE) {
             return this.buildErrorObj(
               GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY,
               "EJP configuration invalid property: 'webapp.login.authMethod' must be a constant of the AuthMethod class"
             );
          } else if((stringVal === AuthMethod.EJP_FORM ||
                     stringVal === AuthMethod.FORM) &&
                     !prop.formConfig) {
            return this.buildErrorObj(
              GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN,
              "EJP invalid login configuration: 'webapp.login.formConfig' must not be null when 'webapp.login.authMethod' is AuthMethod.EJP_FORM or AuthMethod.FORM"
            );
          }
          if(stringVal !== AuthMethod.NONE) {
            prop = prop.realm;
            if(!prop) {
              return this.buildErrorObj(
                GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY,
                "EJP configuration missing property: 'webapp.login.realm'"
              );
            } else {
              stringVal = prop.type;
              if(stringVal !== RealmType.ADMIN_FILE &&
                stringVal !== RealmType.CUSTOM &&
                stringVal !== RealmType.DB &&
                stringVal !== RealmType.FILE &&
                stringVal !== RealmType.LDAP) {
                  return this.buildErrorObj(
                    GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY,
                    "EJP configuration invalid property: 'webapp.login.realm.type' must be a constant of the RealmType class"
                  );
              } else if(stringVal === RealmType.CUSTOM &&
                        !prop.connectorFactory) {
                return this.buildErrorObj(
                  GlassCatErrorCode.EJP_CONFIG_INVALID_REALM,
                  "EJP invalid realm configuration: 'webapp.login.realm.connectorFactory' must not be null when 'webapp.login.realm.type' is RealmType.CUSTOM"
                );
              }
            }
          }
        } else {
          this.printLog(
            "EJP 'webapp.login.authMethod' configuration property is null",
            LogLevel.WARN
          );
        }
        prop = config.webapp.session;
        if(prop) {
          stringVal = prop.storage;
          if(stringVal) {
            if(stringVal !== SessionStorageType.LOCAL &&
               stringVal !== SessionStorageType.DISTANT) {
                 return this.buildErrorObj(
                   GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY,
                   "EJP configuration invalid property: 'webapp.session.storage' must be a constant of the SessionStorageType class"
                 );
            }
          }
        }
      }
    }
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Validates the EJP configuration object for a GlassCat container.
   *
   * @param {any} config the configuration object to validate.
   * @param {Function} result the callback method called to handle the result of
   *                          this operation. This method takes the error object
   *                          reference as parameter.
   */
  public validate(config:EjpConfig, result:(err:GlassCatError)=>void):void {
    this.printLog("EJP configuration validation start", LogLevel.INFO);
    let glassCatErr:GlassCatError = null;
    const err:any = this.doValidation(config);
    if(!err) {
      this.printLog("EJP configuration validation complete", LogLevel.INFO);
    } else {
      glassCatErr = new GlassCatError(err.errorCode, err.message);
    }
    result(glassCatErr);
  }
};
