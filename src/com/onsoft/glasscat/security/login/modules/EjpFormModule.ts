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

import {HttpLocalProperties} from "../../../services/http/utils/HttpLocalProperties";
import {HttpRequest, HttpResponse, Credentials} from "jec-exchange";
import {HttpStatusCode} from "jec-commons";
import {AbstractLoginModule} from "./AbstractLoginModule";
import {GlassCatHttpResponse} from "../../../net/http/GlassCatHttpResponse";
import {CredentialsBuilder} from "../../session/utils/CredentialsBuilder";

/**
 * The code>LoginModule</code> implementation for the
 * code>AuthMethod.EJP_FORM</code> login strategy.
 */
export class EjpFormModule extends AbstractLoginModule {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpFormModule</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public applyLoginStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    let properties:HttpLocalProperties = 
                             (res as GlassCatHttpResponse).getLocalProperties();
    let url:string = properties.contextRootRef +
                   this.__loginStrategyConfig.getFormProperties().getLoginUrl();
    res.redirect(url);
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
        res.status(HttpStatusCode.OK);
    } else {
      res.redirect(properties.sessionId.authurl);
    }
    result(error);
  }

  /**
   * @inheritDoc
   */
  public applyLogoutStrategy(req:HttpRequest, res:HttpResponse,
                                               result:(error?:any)=>void):void {
    super.applyLogoutStrategy(req, res, result);
  }

  /**
   * @inheritDoc
   */
  public getCredentials(req:HttpRequest):Credentials {
    let body:any = req.getBody();
    let builder:CredentialsBuilder = new CredentialsBuilder();
    let credentials:Credentials =
                              builder.build(body.js_username, body.js_password);
    return credentials;
  }
}