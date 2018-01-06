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

import {HttpLocalProperties} from "../../../services/http/utils/HttpLocalProperties";
import {HttpRequest, HttpResponse, Credentials} from "jec-exchange";
import {HttpStatusCode, EncodingFormat} from "jec-commons";
import {AbstractLoginModule} from "./AbstractLoginModule";
import {SessionIdUtil} from "../../session/utils/SessionIdUtil";
import {CredentialsBuilder} from "../../session/utils/CredentialsBuilder";
import {GlassCatHttpResponse} from "../../../net/http/GlassCatHttpResponse";

/**
 * The <code>LoginModule</code> implementation for the
 * <code>AuthMethod.BASIC</code> login strategy.
 */
export class BasicModule extends AbstractLoginModule {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BasicModule</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the HTTP header used to store crendentials.
   */
  private static readonly AUTHORIZATION:string = "authorization";

  /**
   * The reference to the <code>Basic</code> string.
   */
  private static readonly BASIC:string = "Basic ";

  /**
   * The reference to the credentials separator (<code>:</code>).
   */
  private static readonly SEPARATOR:string = ":";

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the HTTP response value for the
   * <code>WWW-Authenticate</code> header.
   * 
   * @return {string} the HTTP response value for the
   *                  <code>WWW-Authenticate</code> header.
   */
  private buildRealm():string {
    let response:string = "Basic realm=\""
                          + this.__loginStrategyConfig.getSecuredArea() + "\"";
    return response;
  }

  /**
   * Builds HTTP response if the user is not authorized to access the resource.
   */
  private buildUnauthorizedResponse(res:HttpResponse):void {
    res.setHeader("WWW-Authenticate", this.buildRealm());
    res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public applyLoginStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    let auth:string = req.getHeader(BasicModule.AUTHORIZATION);
    let properties:HttpLocalProperties =
                             (res as GlassCatHttpResponse).getLocalProperties();
    if(auth) {
      this.__strategy.authenticate(req, res, result);
    } else {
      this.buildUnauthorizedResponse(res);
      result();
    }
  }

  /**
   * @inheritDoc
   */
  public applyLogoutStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    res.clearCookie(SessionIdUtil.SESSION_ID_NAME);
    res.setHeader("WWW-Authenticate", this.buildRealm());
    res.status(HttpStatusCode.UNAUTHORIZED);
    result();
  }

  /**
   * @inheritDoc
   */
  public applyAuthenticationStrategy(req:HttpRequest, res:HttpResponse,
                                    error:any, result:(error?:any)=>void):void {
    let properties:HttpLocalProperties = 
                             (res as GlassCatHttpResponse).getLocalProperties();
    if(error) {
      this.buildUnauthorizedResponse(res);
    } else {
      //res.status(HttpStatusCode);
      res.redirect(properties.sessionId.authurl);
    }
    result(error);
  }

  /**
   * @inheritDoc
   */
  public getCredentials(req:HttpRequest):Credentials {
    let credentials:Credentials = null;
    let auth:string = req.getHeader(BasicModule.AUTHORIZATION);
    let encoded:string = null;
    let decoded:string = null;
    let user:string = null;
    let password:string = null;
    let sepId:number = -1;
    let builder:CredentialsBuilder = null;
    if(auth) {
      builder = new CredentialsBuilder();
      encoded = auth.substr(BasicModule.BASIC.length);
      decoded = Buffer.from(encoded, EncodingFormat.BASE64).toString();
      sepId = decoded.indexOf(BasicModule.SEPARATOR);
      user = decoded.substr(0, sepId);
      password = decoded.substr(sepId + 1);
      credentials = builder.build(user, password);
    }
    return credentials;
  }
}