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

import {HttpService} from "./HttpService";
import {HttpListener} from "./listeners/HttpListener";
import {LoggerManager} from "../../util/logging/LoggerManager";
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import * as express from "express";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import {LocaleManager} from "../../i18n/LocaleManager";
import {DomainConnectorManager} from "../../core/DomainConnectorManager";
import {DomainContainer} from "../../domains/containers/DomainContainer";
import {ContextRootData} from "../../util/contextroot/ContextRootData";
import {HttpRequest, HttpResponse, SessionError} from "jec-exchange";
import {GlassCatHttpRequest} from "../../net/http/GlassCatHttpRequest";
import {HttpStatusCode, EncodingFormat} from "jec-commons";
import {ResourceProxy} from "./proxy/ResourceProxy";
import {SecurityManager} from "../../core/SecurityManager";
import {TransactionManager} from "../../net/http/monitoring/TransactionManager";
import {DomainRequestError} from "../../domains/errors/DomainRequestError";
import {HttpLocalProperties} from "./utils/HttpLocalProperties";
import {HttpServiceErrorManager} from "./utils/HttpServiceErrorManager";
import {AuthenticationError} from "jec-exchange";
import {MappedPathUtil} from "../../util/paths/MappedPathUtil";
import {GlassCatHttpResponse} from "../../net/http/GlassCatHttpResponse";
import {NotFoundErrorBuilder} from "../../domains/errors/NotFoundErrorBuilder";

/**
 * The __AbstractHttpService__ class represents the abstract class for all 
 * GlassCat HTTP services.
 *
 * @class AbstractHttpService
 * @constructor
 * @param {HttpListener} listener the HTTP listener for this HTTP service.
 */
export class AbstractHttpService implements HttpService {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  constructor(listener:HttpListener) {
    this.init(listener);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The HTTP listener associated with this __HttpService__ instance.
   *
   * @attribute __listener
   * @protected
   * @type HttpListener
   * @default null
   */
  protected __listener:HttpListener = null;

  /**
   * The reference to the __Application__ object for this __HttpService__
   * instance.
   *
   * @attribute __app
   * @protected
   * @type express.Application
   * @default null
   */
  protected __app:express.Application = null;

  /**
   * The virtual server for this __HttpService__ instance.
   *
   * @attribute __server
   * @protected
   * @type http.Server
   * @default null
   */
  protected __server:http.Server = null;

  /**
   * The reference to the __DomainConnectorManager__ object for this
   * __HttpService__ instance.
   *
   * @attribute __server
   * @protected
   * @type DomainConnectorManager
   * @default null
   */
  protected __connectorManager:DomainConnectorManager = null;

  /**
   * The reference to the __SecurityManager__ object for this __HttpService__
   * instance.
   *
   * @attribute __securityManager
   * @protected
   * @type SecurityManager
   * @default null
   */
  protected __securityManager:SecurityManager = null;

  /**
   * The reference to the __TransactionManager__ object for this __HttpService__
   * instance.
   *
   * @attribute __transactionManager
   * @protected
   * @type TransactionManager
   * @default null
   */
  protected __transactionManager:TransactionManager = null;

  /**
   * Indicates whether to enable requests interception by the transcation
   * manager (__true__), or not (__false__).
   *
   * @attribute __enableMonitoring
   * @protected
   * @type boolean
   * @default false
   */
  protected __enableMonitoring:boolean = false;

  /**
   * The error manager for this HTTP service.
   *
   * @attribute __errorManager
   * @protected
   * @type HttpServiceErrorManager
   * @default null
   */
  protected __errorManager:HttpServiceErrorManager = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Indicates wether this __HttpService__ instance is active (__true__), or not
   * (__false__).
   *
   * @attribute _isActive
   * @private
   * @type boolean
   * @default false
   */
  private _isActive:boolean = false;

  /**
   * The name of the server for this component.
   *
   * @attribute _server
   * @private
   * @type string
   * @default null
   */
  private _server:string = null;

  private _notFoundErrorBuilder:NotFoundErrorBuilder = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the immutable properties for this HTTP service.
   *
   * @method init
   * @private
   * @param {HttpListener} listener the HTTP listener for this HTTP service.
   */
  private init(listener:HttpListener):void {
    this.__listener = listener;
    this._server = listener.getServer();
    this.__app = express();
    this.initSecuredServer();
    this.__errorManager = new HttpServiceErrorManager();
    this.__enableMonitoring = listener.enableMonitoring();
    if(this.__enableMonitoring) {
      this.__transactionManager = new TransactionManager();
      this.__transactionManager.setTransactionMonitor(
        listener.getTransactionMonitor()
      );
    }
    this._notFoundErrorBuilder = new NotFoundErrorBuilder();
  }

  /**
   * Initialises the HTTPS service when the__listener.getSecured()__ method
   * returns true.
   *
   * @method initSecuredServer
   * @private
   */
  private initSecuredServer():void {
    let pathUtil:MappedPathUtil = null;
    let key:string = null;
    let cert:string = null;
    let keyBuffer:Buffer = null;
    let certBuffer:Buffer = null;
    if(this.__listener.getSecured()) {
      pathUtil = MappedPathUtil.getInstance();
      key = pathUtil.resolve("${root}/public/cfg/ssl/admin/key.pem");
      cert = pathUtil.resolve("${root}/public/cfg/ssl/admin/server.crt");
      keyBuffer = fs.readFileSync(key);
      certBuffer = fs.readFileSync(cert);
      key = keyBuffer.toString(EncodingFormat.UTF8);
      cert = certBuffer.toString(EncodingFormat.UTF8);
      https.createServer(
        { key: key, cert: cert },
        this.__app
      );
    }
  }

  /**
   * The HTTP transaction interceptor for this HTTP service.
   *
   * @method holdTransaction
   * @private
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   */
  private holdTransaction(req:express.Request, res:express.Response,
                                               next:Function):void {
    this.__transactionManager.openTransaction(req, res);
    next();
  }
  
  /**
   * The HTTP transaction filter for this HTTP service.
   *
   * @method releaseTransaction
   * @private
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   */
  private releaseTransaction(req:express.Request, res:express.Response,
                                                  next:Function):void {
    if(this.__enableMonitoring) {
      this.__transactionManager.closeTransaction(req, res);
    };
  }

  /**
   * The HTTP session interceptor for this HTTP service.
   *
   * @method checkSession
   * @private
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation and go to the next middleware.
   */
  private checkSession(req:express.Request, res:express.Response,
                                            next:Function):void {
    let properties:HttpLocalProperties = new HttpLocalProperties();
    res.locals.properties = properties;
    this.__securityManager.processSession(
      this, req, res,
      (err:SessionError) => {
        if(err) {
          this.__errorManager.processSessionError(
            properties,
            err,
            new GlassCatHttpRequest(req),
            new GlassCatHttpResponse(res),
            this.__connectorManager.getErrorPage()
          );
          this.releaseTransaction(req, res, next);
        } else next();
      }
    );
  }

  /**
   * The HTTP security layer for this HTTP service.
   *
   * @method validateRequest
   * @private
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   */
  private validateRequest(req:express.Request, res:express.Response,
                                                           next:Function):void {
    let properties:HttpLocalProperties = res.locals.properties;
    let httpRequest:HttpRequest = null;
    let httpResponse:HttpResponse = null;
    if(properties.isStatic) next();
    else {
      this.__securityManager.validateTransaction(
        req,
        res,
        this,
        (err:AuthenticationError) => {
          if(err) {
            httpRequest = new GlassCatHttpRequest(req);
            httpResponse = new GlassCatHttpResponse(res);
            if(err.getStatusCode() === HttpStatusCode.UNAUTHORIZED) {
              properties.connector
                        .getContainer()
                        .getLoginStrategy()
                        .applyLoginStrategy(
                          httpRequest,
                          httpResponse,
                          (err:any)=> {
                            this.releaseTransaction(req, res, next);
                          }
                        );
            } else {
              this.__errorManager.processAuthenticationError(
                properties,
                err,
                httpRequest,
                httpResponse,
                this.__connectorManager.getErrorPage()
              );
              this.releaseTransaction(req, res, next);
            }
          } else next();
        }
      );
    }
  }

  /**
   * The HTTP message broker for this HTTP service.
   *
   * @method processRequest
   * @private
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   */
  private processRequest(req:express.Request, res:express.Response,
                                                           next:Function):void {
    let httpRequest:HttpRequest = new GlassCatHttpRequest(req);
    let httpResponse:HttpResponse = new GlassCatHttpResponse(res);
    let properties:HttpLocalProperties = res.locals.properties;
    let crd:ContextRootData = properties.contextRootData;
    let connector:DomainConnector = properties.connector;
    if(crd.containsNestedResource) {
      ResourceProxy.getInstance().loadFile(
        crd.newPath,
        function(err:NodeJS.ErrnoException, content:Buffer) {
          if(err) {
            this.__errorManager.processNestedResourceError(
              properties, err, httpRequest, httpResponse,
              this.__connectorManager.getErrorPage()
            );
          } else res.send(content);
          next();
        }
      );
    } else if(!crd.needsRedirection) {
      if(connector) {
        connector.getContainer()
                 .process(
                   properties, httpRequest, httpResponse,
                     (err:DomainRequestError) => {
                       if(err) {
                         this.__errorManager.processDomainRequestError(
                           properties, err, httpRequest, httpResponse,
                           this.__connectorManager.getErrorPage()
                         );
                       }
                       next();
                     }
                  );
      } else {
        this.__errorManager.processDomainRequestError(
          properties,
          this._notFoundErrorBuilder.build(),
          httpRequest, httpResponse,
          this.__connectorManager.getErrorPage()
        );
      }
    } else {
      res.redirect(crd.newPath);
      next();
    }
  }

  /**
   * Initializes the HTTP headers security.
   *
   * @method initHeadersSecurity
   * @private
   */
  private initHeadersSecurity():void {
    let headerParams:string[] =
                  this.__securityManager.getHeaderSecurityParams(this);
  }

  /**
   * Initializes the HTTP transaction interceptor.
   *
   * @method initTransactionInterceptor
   * @private
   */
  private initTransactionInterceptor():void {
    if(this.__enableMonitoring) {
      this.__app.use(this.holdTransaction.bind(this));
    }
  }
  
  /**
   * Initializes the HTTP transaction filter.
   *
   * @method initTransactionInterceptor
   * @private
   */
  private initTransactionFilter():void {
    this.__app.use(this.releaseTransaction.bind(this));
  }

  /**
   * Initializes the HTTP sessions security.
   *
   * @method initSessionsSecurity
   * @private
   */
  private initSessionsSecurity():void {
    this.__app.use(cookieParser());
    this.__app.use(this.checkSession.bind(this));
  }

  /**
   * Creates the built-in interceptors for all HTTP requests.
   *
   * @method createTransactionInterceptors
   * @private
   */
  private createTransactionInterceptors():void {
    this.__app.use(this.validateRequest.bind(this));
    this.__app.use(bodyParser.json());
    this.__app.use(bodyParser.urlencoded({ extended: true }));
    this.__app.use(this.processRequest.bind(this));
  }

  /**
   * Initializes the error filter for this service.
   *
   * @method initErrorFilter
   * @private
   */
  private initErrorFilter():void {
    this.__app.use((err:any, req:express.Request, res:express.Response,
                                                              next:Function)=> {
      let status:number = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
      //console.error("------------->", err);
      //TODO: implement custom 404 error processor
      res.sendStatus(status);
    });
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getHttpListener():HttpListener {
    return this.__listener;
  }

  /**
   * @inheritDoc
   */
  public initConnectors(connectorManager:DomainConnectorManager):void {
    if(this.__connectorManager) {
      throw new Error();
    }
    this.__connectorManager = connectorManager;
  }
  
  /**
   * @inheritDoc
   */
  public initSecurity(securityManager:SecurityManager):void {
    if(this.__securityManager) {
      throw new Error();
    }
    this.__securityManager = securityManager;
    this.initHeadersSecurity();
    this.initTransactionInterceptor();
    this.initSessionsSecurity();
    this.createTransactionInterceptors();
    this.initTransactionFilter();
    this.initErrorFilter();
  }

  /**
  * @inheritDoc
  */
  public start():void {
    let port:number = this.__listener.getPort();
    this.__server = this.__app.listen(port);
    this._isActive = true;
    LoggerManager.getInstance().info(
      LocaleManager.getInstance().get(
        "http.servers.start",
        this._server,
        String(port)
      )
    );
  }

  /**
  * @inheritDoc
  */
  public stop():void {
    this.__server.close();
    this._isActive = false;
    LoggerManager.getInstance().info(
      LocaleManager.getInstance().get("http.servers.stop", this._server)
    );
  }

  /**
  * @inheritDoc
  */
  public isActive():boolean {
    return this._isActive;
  }
};
