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

import {HttpLocalProperties} from "./HttpLocalProperties";
import {HttpRequest, HttpResponse, SessionError, SessionErrorType,
        AuthenticationError} from "jec-exchange";
import {HttpStatusCode} from "jec-commons";
import {LoggerManager} from "../../../util/logging/LoggerManager";
import {GlassCatLocaleManager} from "../../../i18n/GlassCatLocaleManager";
import {ErrorStatusBuilder} from "../../../templates/status/ErrorStatusBuilder";
import {ForbiddenStatusBuilder} from "../../../templates/status/ForbiddenStatusBuilder";
import {DomainRequestError} from "../../../domains/errors/DomainRequestError";

/**
 * The<code>HttpServiceErrorManager</code> class is used by GlassCat HTTP 
 * services for delegating HTTP errors treatment.
 */
export class HttpServiceErrorManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpServiceErrorManager</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Processes the error due to nested resources access failures.
   * 
   * @param {HttpLocalProperties} properties the local properties for the
   *                                         current HTTP transaction.
   * @param {NodeJS.ErrnoException} error the error to treat.
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP 
   *                           transaction.
   * @param {string} errorTemplatePath the path to the error rendering jslet.
   */
  public processNestedResourceError(properties:HttpLocalProperties,
                                    error:NodeJS.ErrnoException,
                                    httpRequest:HttpRequest,
                                    httpResponse:HttpResponse,
                                    errorTemplatePath:string):void {
    properties.transactionFails = true;
    LoggerManager.getInstance().error(
      GlassCatLocaleManager.getInstance().get(
        "errors.nestedResource",
        error.message
      )
    );
    ErrorStatusBuilder.getInstance().build(
        httpRequest,
        httpResponse,
        errorTemplatePath,
        HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
  /**
   * Processes the error due to session authentication failures.
   * 
   * @param {HttpLocalProperties} properties the local properties for the
   *                                         current HTTP transaction.
   * @param {DomainRequestError} error the error to treat.
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP 
   *                           transaction.
   * @param {string} errorTemplatePath the path to the error rendering jslet.
   */
  public processDomainRequestError(properties:HttpLocalProperties,
                                   error:DomainRequestError,
                                   httpRequest:HttpRequest,
                                   httpResponse:HttpResponse,
                                   errorTemplatePath:string):void {
    properties.transactionFails = true;
    const statusCode:HttpStatusCode = error.statusCode;
    if(statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      LoggerManager.getInstance().error(
        GlassCatLocaleManager.getInstance().get(
            "errors.session.storageAccessError",
             error.message
        )
      );
    }
    ErrorStatusBuilder.getInstance().build(
      httpRequest,
      httpResponse,
      errorTemplatePath,
      statusCode,
      error.detailsCode
    );
  }
  
  /**
   * Processes the error due to session access failures.
   * 
   * @param {HttpLocalProperties} properties the local properties for the
   *                                         current HTTP transaction.
   * @param {SessionError} error the error to treat.
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP 
   *                           transaction.
   * @param {string} errorTemplatePath the path to the error rendering jslet.
   */
  public processSessionError(properties:HttpLocalProperties,
                             error:SessionError,
                             httpRequest:HttpRequest,
                             httpResponse:HttpResponse,
                             errorTemplatePath:string):void {
    properties.transactionFails = true;
    const errorType:SessionErrorType = error.getErrorType();
    switch(errorType) {
      // Session expired => we have to redirect the user:
      case SessionErrorType.SESSION_EXPIRED:
        httpResponse.status(HttpStatusCode.UNAUTHORIZED);
        if(properties.redirectUrl) {
          httpResponse.redirect(properties.redirectUrl);
        } else {
          ForbiddenStatusBuilder.getInstance().build(
            httpRequest,
            httpResponse,
            errorTemplatePath,
            errorType
          );
        }
        break;
      // Session storage access fails => we have to redirect the
      // user and log the error:
      case SessionErrorType.SESSION_PERSISTENCE_FAILED:
        LoggerManager.getInstance().error(
          GlassCatLocaleManager.getInstance().get(
            errorType,
            error.toString()
          )
        );
        ErrorStatusBuilder.getInstance().build(
            httpRequest,
            httpResponse,
          errorTemplatePath,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          errorType
        );
    }
  }

  /**
   * Processes the error due to authentication failures.
   * 
   * @param {HttpLocalProperties} properties the local properties for the
   *                                         current HTTP transaction.
   * @param {AuthenticationError} error the error to treat.
   * @param {HttpRequest} req the HTTP request for the current HTTP transaction.
   * @param {HttpResponse} res the HTTP response for the current HTTP 
   *                           transaction.
   * @param {string} errorTemplatePath the path to the error rendering jslet.
   */
  public processAuthenticationError(properties:HttpLocalProperties,
                                    error:AuthenticationError,
                                    httpRequest:HttpRequest,
                                    httpResponse:HttpResponse,
                                    errorTemplatePath:string):void {
    properties.transactionFails = true;
    if(error.getStatusCode() === HttpStatusCode.NOT_FOUND) {
      ErrorStatusBuilder.getInstance().build(
        httpRequest,
        httpResponse,
        errorTemplatePath
      );
    } else {
      ForbiddenStatusBuilder.getInstance().build(
        httpRequest,
        httpResponse,
        errorTemplatePath
      );
    }
  }
}