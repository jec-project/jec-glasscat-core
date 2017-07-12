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

import * as express from "express";
import {HttpRequest} from "jec-exchange";

/**
 * The default GlassCat implementation of the <code>HttpRequest</code>
 * interface.
 */
export class GlassCatHttpRequest implements HttpRequest {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatHttpRequest</code> instance.
   * 
   * @param {express.Request} req the original HTTP request wrapped by this 
   *                              <code>HttpRequest</code> object.
   */
  constructor(req:express.Request) {
    this.init(req);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Protected properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The original HTTP request wrapped by this <code>HttpRequest</code>
   * object.
   */
  protected __expReq:express.Request = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {express.Request} req the original HTTP request wrapped by this 
   *                              <code>HttpRequest</code> object.
   */
  private init(req:express.Request):void {
    this.__expReq = req;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public accessors
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getBaseUrl():string {
    return this.__expReq.baseUrl;
  }

  /**
   * @inheritDoc
   */
  public getBody():any {
    return this.__expReq["body"];
  }

  /**
   * @inheritDoc
   */
  public getCookies():any {
    return this.__expReq["cookies"];
  }

  /**
   * @inheritDoc
   */
  public getHostname():string {
    return this.__expReq.hostname;
  }

  /**
   * @inheritDoc
   */
  public getIp():string {
    return this.__expReq.ip;
  }

  /**
   * @inheritDoc
   */
  public getMethod():string {
    return this.__expReq.method;
  }

  /**
   * @inheritDoc
   */
  public getOriginalUrl():string {
    return this.__expReq.originalUrl;
  }

  /**
   * @inheritDoc
   */
  public getPath():string {
    return this.__expReq.path;
  }

  /**
   * @inheritDoc
   */
  public getProtocol():string {
    return this.__expReq.protocol;
  }

  /**
   * @inheritDoc
   */
  public getQuery():any {
    return this.__expReq.query;
  }

  /**
   * @inheritDoc
   */
  public isSecured():boolean {
    return this.__expReq.secure;
  }
  
  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public accepts(types:string | string[]):string | void {
    return this.__expReq.accepts(types);
  }
  
  /**
   * @inheritDoc
   */
  public acceptsCharsets(charset:string | string[]):string | boolean {
    return this.__expReq.acceptsCharsets(charset);
  }
  
  /**
   * @inheritDoc
   */
  public acceptsEncodings(encoding:string | string[]):string | boolean {
    return this.__expReq.acceptsEncodings(encoding);
  }
  
  /**
   * @inheritDoc
   */
  public acceptsLanguages(lang:string | string[]):string | boolean {
    return this.__expReq.acceptsEncodings(lang);
  }
  
  /**
   * @inheritDoc
   */
  public getHeader(field:string):string {
    return this.__expReq.get(field);
  }

  /**
   * @inheritDoc
   */
  public isTypeOfContent(type:string | string[]):boolean {
    return this.__expReq.is(type);
  }
}