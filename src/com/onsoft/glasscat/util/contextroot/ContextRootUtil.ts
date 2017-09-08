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

import * as express from 'express';
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import {HttpListener} from "../../services/http/listeners/HttpListener";
import {ContextRootData} from "./ContextRootData";
import {ResourceProxy} from "../../services/http/proxy/ResourceProxy";
import {UrlStringsEnum} from "jec-commons";

/**
 * A utility class for working with context root elements in URL paths.
  */
export class ContextRootUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ContextRootUtil</code> instance.
   */
  constructor() {
    this.init();
   }
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * A static reference to the <code>referer</code> string.
   */
  private static readonly REFERER:string = "referer";

  /**
   * A static reference to the <code>host</code> string.
   */
  private static readonly HOST:string = "host";

  /**
   * The <code>ContextRootData</code> instance used to pass context root 
   * information to the service that intercepts a HTTP transaction.
   */
  private _contextRootData:ContextRootData = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._contextRootData = new ContextRootData();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A static reference to the path used to map context root URLs.
   */
  public static readonly INDEX:string = "__INDEX__";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a string that represents a context root to register into
   * the jslet connectors engine.
   *
   * @param {DomainConnector} connector the domain connector from which to build
   *                                    the context root string.
   * @return {string} a string that represents a context root to register.
   */
  public buildContextRoot(connector:DomainConnector,
                                                listener:HttpListener):string {
    let ctx:string =
      listener.getProtocol() + connector.getHost() + UrlStringsEnum.COLON + 
      listener.getPort() + connector.getContextRoot();
    return ctx;
  }
  
  /**
   * Builds and returns a string that represents a possible value to match a
   * registered context root.
   *
   * @param {express.Request} reqest the HTTP request for the current HTTP
   *                                 transaction.
   * @return {ContextRootData} a string that represents a possible value to 
   *                                    match a registered context root.
   */
  public extractContextRoot(reqest:express.Request):ContextRootData {
    let path:string = reqest.path;
    let ctx:string = UrlStringsEnum.EMPTY_STRING;
    let referer:string = UrlStringsEnum.EMPTY_STRING;
    let index:number = -1;
    let buffer:string[] = null;
    let host:string = reqest.header(ContextRootUtil.HOST);
    this._contextRootData.reset();
    if(ResourceProxy.getInstance().testUrl(path)) {
      this._contextRootData.containsNestedResource = true;
    } else {
      path = reqest.path.substr(1);
      index = path.indexOf(UrlStringsEnum.SLASH);
      if(index !== -1) {
        path = path.substr(0, index);
        referer = reqest.header(ContextRootUtil.REFERER);
        if(referer && referer.indexOf(host) !== -1) {
          referer = referer.replace(
              UrlStringsEnum.SCHEME_DELIMITER, 
              UrlStringsEnum.EMPTY_STRING
            );
          buffer = referer.split(UrlStringsEnum.SLASH);
          this._contextRootData.contextRoot = buffer[0] + buffer[1];
        } else {
          //console.log("no referer:", path);
          this._contextRootData.contextRoot = reqest.protocol + host + path;
        }
      } else {
        //console.log("no slash:", path);
        this._contextRootData.needsRedirection = true;
        this._contextRootData.newPath = path + UrlStringsEnum.SLASH
        this._contextRootData.contextRoot = reqest.protocol + host + path;
      }
    }
    return this._contextRootData;
  }
}