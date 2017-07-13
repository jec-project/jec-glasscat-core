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

import {LoggerManager} from "../../util/logging/LoggerManager";
import {LocaleManager} from "../../i18n/LocaleManager";
import {SecurityRole, Jslet, SecurityConstraint, StaticResources,
        SecurityContext, Session, SessionError, SessionErrorType} from "jec-exchange";
import {SecurityManager} from "../../core/SecurityManager";
import {UrlPatternUtils} from "../../util/url/UrlPatternUtils";
import {ContextRootUtil} from "../../util/contextroot/ContextRootUtil";
import {UrlStringsEnum, UrlPattern} from "jec-commons";
import {SessionManager} from "../session/managers/SessionManager";
import {EjpSessionManager} from "../session/managers/EjpSessionManager";
import {SessionBuilder} from "../session/utils/SessionBuilder";

/**
 * The <code>EjpSecurityContext</code> class represents the concrete 
 * implementation of the <code>SecurityContext</code> interface for EJP domain
 * containers.
 */
export class EjpSecurityContext implements SecurityContext {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSecurityContext</code> instance.
   * 
   * @param {string} contextRoot the context root of the 
   *                             <code>DomainContainer</code> associated with
   *                             this <code>SecurityContext</code>.
   */
  constructor(contextRoot:string) {
    this.init(contextRoot);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The context root of the <code>DomainContainer</code> associated with this
   * <code>SecurityContext</code>.
   */
  private _contextRoot:string = null;

  /**
   * The reference to security roles for the current security context.
   */
  private _securityRoleMap:Map<string, SecurityRole> = null;

  /**
   * The reference to security constraints for the current security context.
   */
  private _constraintsMap:Map<string, SecurityConstraint> = null;

  /**
   * The reference to static resources for the current security context.
   */
  private _staticResourcesMap:Map<string, StaticResources> = null;

  /**
   * The reference to the <code>UrlPatternUtils</code> class for this context.
   */
  private _urlPatternUtils:UrlPatternUtils = null;

  /**
   * A collection that contains all <code>UrlPattern</code> objects for this
   * context.
   */
  private _urlPatternColl:UrlPattern[] = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this security context.
   *
   * @param {string} contextRoot the context root of the 
   *                             <code>DomainContainer</code> associated with
   *                             this <code>SecurityContext</code>.
   */
  private init(contextRoot:string):void {
    this._contextRoot = contextRoot;
    this._securityRoleMap = new Map<string, SecurityRole>();
    this._constraintsMap = new Map<string, SecurityConstraint>();
    this._staticResourcesMap = new Map<string, StaticResources>();
    this._urlPatternUtils = new UrlPatternUtils();
    this._urlPatternColl = new Array<UrlPattern>();
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addSecurityRole(role:SecurityRole):void {
    let name:string = role.getName();
    this._securityRoleMap.set(name, role);
    let msg:string =
                  LocaleManager.getInstance().get("security.roles.added", name);
    LoggerManager.getInstance().info(msg);
  }

  /**
   * @inheritDoc
   */
  public getSecurityRole(name:string):SecurityRole {
    return this._securityRoleMap.get(name);
  }
  
  /**
   * @inheritDoc
   */
  public addSecurityConstraint(constraint:SecurityConstraint):void {
    let name:string = constraint.getName();
    let urlPattern:UrlPattern = constraint.getUrlPattern();
    let url:string = urlPattern.baseUrl;
    this._constraintsMap.set(url, constraint);
    this._urlPatternColl.push(urlPattern);
    let msg:string =
        LocaleManager.getInstance()
                     .get("security.constraint.added", this._contextRoot, name);
    LoggerManager.getInstance().info(msg);
  }

  /**
   * @inheritDoc
   */
  public getSecurityConstraint(url:string):SecurityConstraint {
    let constraint:SecurityConstraint = undefined;
    let len:number = this._urlPatternColl.length;
    let urlPattern:UrlPattern = null;
    let baseUrl:string =
                 url === UrlStringsEnum.EMPTY_STRING ? ContextRootUtil.INDEX : url;
    while(len--) {
      urlPattern = this._urlPatternColl[len];
      if(this._urlPatternUtils.match(baseUrl, urlPattern)) {
        constraint = this._constraintsMap.get(urlPattern.baseUrl);
        break;
      }
    }
    return constraint;
  }
  
  /**
   * @inheritDoc
   */
  public addStaticResources(resources:StaticResources):void {
    let urlPattern:UrlPattern = resources.getUrlPattern();
    let url:string = urlPattern.baseUrl;
    this._staticResourcesMap.set(url, resources);
    this._urlPatternColl.push(urlPattern);
    /*let msg:string =
        LocaleManager.getInstance()
                     .get("security.constraint.added", this._contextRoot, name);
    LoggerManager.getInstance().info(msg);*/
  }

  /**
   * @inheritDoc
   */
  public getStaticResources(url:string):StaticResources {
    let resources:StaticResources = undefined;
    let len:number = this._urlPatternColl.length;
    let urlPattern:UrlPattern = null;
    let baseUrl:string =
                 url === UrlStringsEnum.EMPTY_STRING ? ContextRootUtil.INDEX : url;
    while(len--) {
      urlPattern = this._urlPatternColl[len];
      if(this._urlPatternUtils.match(baseUrl, urlPattern)) {
        resources = this._staticResourcesMap.get(urlPattern.baseUrl);
        break;
      }
    }
    return resources;
  }

  /**
   * @inheritDoc
   */
  public getContextRoot():string {
    return this._contextRoot;
  }
};
