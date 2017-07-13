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

import {JecStringsEnum, UrlStringsEnum} from "jec-commons";
import {DomainConnectorManager} from "../../../core/DomainConnectorManager";
import {DomainConnector} from "../../../domains/connectors/DomainConnector";
import {HttpListener} from "../listeners/HttpListener";
import {LocaleManager} from "../../../i18n/LocaleManager";
import * as fs from "fs";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";

/**
 * The <code>ResourceProxy</code> singleton is used to load resources for which 
 * developers need to redefine path (e.g. nested CSS URLs).
  */
export class ResourceProxy {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ResourceProxy</code> instance.
   */
  constructor() {
    if(ResourceProxy._locked || ResourceProxy.INSTANCE) {
      let msg:string =
           LocaleManager.getInstance().get("errors.singleton", "ResourceProxy");
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    ResourceProxy._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ResourceProxy</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ResourceProxy</code> singleton instance reference.
   */
  private static INSTANCE:ResourceProxy = null;

  /**
   * Returns a reference to the <code>ResourceProxy</code> singleton.
   *
   * @return {ResourceProxy} a reference to the <code>ResourceProxy</code>
   *                         singleton.
   */
  public static getInstance():ResourceProxy {
    if(ResourceProxy.INSTANCE === null) {
      ResourceProxy._locked = false;
      ResourceProxy.INSTANCE = new ResourceProxy();
    }
    return ResourceProxy.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The length of the resource proxy pattern string.
   */
  private static readonly RESOURCE_PROXY_SIZE:number = 10;

  /**
   * A static reference to the index object return as a result of the
   * <code>String.match()</code> method .
   */
  private static readonly INDEX:string = "index";

  /**
   * A static reference to the pattern used to proxyfy resources.
   */
  private static readonly RESOURCE_PROXY_PATTERN:RegExp = /\[resource:.*\]/;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves and returns the reference used to find the domain connector from
   * the domain connector manager. 
   * 
   * @param {HttpListener} listener the HTTP listener on which a nested resource
   *                                is registered.
   * @param {string} contextRoot the context root on which the nested resource
   *                             is mapped.
   * @return {string} the domain connector reference.
   */
  public getConectorRef(listener:HttpListener, contextRoot:string):string {
    let connectorRef:string = listener.getProtocol() + listener.getDomain() + 
                              UrlStringsEnum.COLON + listener.getPort() +
                              contextRoot;
    return connectorRef;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Test the specified URL to detect whether it uses a nested resource
   * reference. 
   * 
   * @param {string} url the URL to test.
   * @return {boolean} <code>true</code> whether the specified URL uses a nested
   *                   resource reference; <code>false</code> otherwise.
   */
  public testUrl(url:string):boolean {
    return ResourceProxy.RESOURCE_PROXY_PATTERN.test(url);
  }

  /**
   * Resolves and returns the real path to the nested resource specified by the
   * <code>baseUrl</code> parameter. 
   * 
   * @param {string} baseUrl the decorated URL for whiche to return the real
   *                         resource path.
   * @param {HttpListener} listener the HTTP listener on which the nested
   *                                resource is registered.
   * @param {DomainConnectorManager} domainConnectorManager the reference to the
   *                                                        GlassCat domain
   *                                                        connector manager.
   * @return {string} the real path for the specified decorated resource.
   */
  public getProxyPath(baseUrl:string, listener:HttpListener,
                         domainConnectorManager:DomainConnectorManager):string {
    let found:any[] = baseUrl.match(ResourceProxy.RESOURCE_PROXY_PATTERN);
    let pathMap:string = found[0];
    let pathLength:number = pathMap.length;
    let lastColonId:number = pathMap.lastIndexOf(UrlStringsEnum.COLON);
    let contextRoot:string =
         pathMap.substring(pathMap.indexOf(UrlStringsEnum.COLON) + 1, lastColonId);
    let connector:DomainConnector = domainConnectorManager.getDomainConnector(
      this.getConectorRef(listener, contextRoot)
    );
    let resourceRef:string = pathMap.substring(lastColonId + 1, pathLength - 1);
    let resourceValue:string =
                        connector.getContainer().getMappedResource(resourceRef);
    let path:string = connector.getTarget() + JecStringsEnum.WEB_APP +
                      resourceValue + UrlStringsEnum.SLASH + 
                      baseUrl.substr(found[ResourceProxy.INDEX] + pathLength);
    return path;
  }

  /**
   * Loads the file located at the specified path. 
   * 
   * @param {string} path the path to the file to load.
   * @param {Function} callback the callback function used to handle the result
   *                            of this operation. This function takes a
   *                            <code>ErrnoException</code> object as its first 
   *                            parameter and a <code>Buffer</code> as second
   *                            parameter.
   */
  public loadFile(path:string,
               callback:(err:NodeJS.ErrnoException, data:Buffer) => void):void {
    fs.readFile(path, callback);
  }
}