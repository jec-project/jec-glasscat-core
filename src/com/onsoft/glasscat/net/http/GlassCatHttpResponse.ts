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

import * as express from "express";
import {HttpLocalProperties} from "../../services/http/utils/HttpLocalProperties";
import {HttpResponse, CookieOptions, SendFileOptions} from "jec-exchange";

/**
 * The default GlassCat implementation of the <code>HttpResponse</code>
 * interface.
 */
export class GlassCatHttpResponse implements HttpResponse {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatHttpResponse</code> instance.
   * 
   * @param {express.Response} req the original HTTP response wrapped by this 
   *                               <code>HttpResponse</code> object.
   */
  constructor(res:express.Response) {
    this.init(res);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Protected properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The original HTTP response wrapped by this <code>HttpResponse</code>
   * object.
   */
  protected __expRsq:express.Response = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {express.Response} req the original HTTP response wrapped by this 
   *                               <code>HttpResponse</code> object.
   */
  private init(res:express.Response):void {
    this.__expRsq = res;
  }
  
  ////////////////////////////////////////////////////////////////////////////
  // Public accessors
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getHeadersSent():boolean {
    return this.__expRsq.headersSent;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public attachment(filename?:string):HttpResponse {
    this.__expRsq.attachment(filename);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public cookie(name:string, value:string, options?:CookieOptions):HttpResponse {
    this.__expRsq.cookie(name, value, options);
    return this;
  }

  /**
   * @inheritDoc
   */
  public clearCookie(name:string, options?:CookieOptions):HttpResponse {
    this.__expRsq.clearCookie(name, options);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public download(path:string, filename?:string,
                                           complete?:(err?:Error) => any):void {
    this.__expRsq.download(path, filename, complete);
  }
  
  /**
   * @inheritDoc
   */
  public end(data?:any, encoding?:string):HttpResponse {
    this.__expRsq.end(data, encoding);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public format(obj:any):HttpResponse {
    this.__expRsq.format(obj);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public getHeader(field:string):string {
    return this.__expRsq.get(field);
  }
  
  /**
   * @inheritDoc
   */
  public links(links:any):HttpResponse {
    this.__expRsq.links(links);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public location(path:string):HttpResponse {
    this.__expRsq.location(path);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public redirect(path:string):HttpResponse {
    this.__expRsq.redirect(path);
    return this;
  }

  /**
   * @inheritDoc
   */
  public send(body:any):HttpResponse {
    this.__expRsq.send(body);
    return this;
  }

  /**
   * @inheritDoc
   */
  public sendFile(path:string, options?:SendFileOptions,
                               complete?:(err?: Error) => any):HttpResponse {
    this.__expRsq.sendFile(path, options, complete);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public sendStatus(statusCode:number):HttpResponse {
    this.__expRsq.sendStatus(statusCode);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public setHeader(field:string, value:string):HttpResponse {
    this.__expRsq.set(field, value);
    return this;
  }

  /**
   * @inheritDoc
   */
  public status(statusCode:number):HttpResponse {
    this.__expRsq.status(statusCode);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public type(type:string):HttpResponse {
    this.__expRsq.type(type);
    return this;
  }
  
  /**
   * @inheritDoc
   */
  public vary(field:string):HttpResponse {
    this.__expRsq.vary(field);
    return this;
  }
  
  /**
   * Returns the local properties for this <code>GlassCatHttpResponse</code>
   * instance.
   * 
   * @return {HttpLocalProperties} the local properties for this
   *                               <code>GlassCatHttpResponse</code> object.
   */
  public getLocalProperties():HttpLocalProperties {
    return this.__expRsq.locals.properties;  
  }
}