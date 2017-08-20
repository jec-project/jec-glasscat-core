"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const GlassCatHttpRequest_1 = require("../../net/http/GlassCatHttpRequest");
const jec_commons_1 = require("jec-commons");
const ResourceProxy_1 = require("./proxy/ResourceProxy");
const TransactionManager_1 = require("../../net/http/monitoring/TransactionManager");
const HttpLocalProperties_1 = require("./utils/HttpLocalProperties");
const HttpServiceErrorManager_1 = require("./utils/HttpServiceErrorManager");
const MappedPathUtil_1 = require("../../util/paths/MappedPathUtil");
const GlassCatHttpResponse_1 = require("../../net/http/GlassCatHttpResponse");
const NotFoundErrorBuilder_1 = require("../../domains/errors/NotFoundErrorBuilder");
class AbstractHttpService {
    constructor(listener) {
        this.__listener = null;
        this.__app = null;
        this.__server = null;
        this.__connectorManager = null;
        this.__securityManager = null;
        this.__transactionManager = null;
        this.__enableMonitoring = false;
        this.__errorManager = null;
        this._isActive = false;
        this._server = null;
        this._notFoundErrorBuilder = null;
        this.init(listener);
    }
    init(listener) {
        this.__listener = listener;
        this._server = listener.getServer();
        this.__app = express();
        this.initSecuredServer();
        this.__errorManager = new HttpServiceErrorManager_1.HttpServiceErrorManager();
        this.__enableMonitoring = listener.enableMonitoring();
        if (this.__enableMonitoring) {
            this.__transactionManager = new TransactionManager_1.TransactionManager();
            this.__transactionManager.setTransactionMonitor(listener.getTransactionMonitor());
        }
        this._notFoundErrorBuilder = new NotFoundErrorBuilder_1.NotFoundErrorBuilder();
    }
    initSecuredServer() {
        let pathUtil = null;
        let key = null;
        let cert = null;
        let keyBuffer = null;
        let certBuffer = null;
        if (this.__listener.getSecured()) {
            pathUtil = MappedPathUtil_1.MappedPathUtil.getInstance();
            key = pathUtil.resolve("${root}/public/cfg/ssl/admin/key.pem");
            cert = pathUtil.resolve("${root}/public/cfg/ssl/admin/server.crt");
            keyBuffer = fs.readFileSync(key);
            certBuffer = fs.readFileSync(cert);
            key = keyBuffer.toString(jec_commons_1.EncodingFormat.UTF8);
            cert = certBuffer.toString(jec_commons_1.EncodingFormat.UTF8);
            https.createServer({ key: key, cert: cert }, this.__app);
        }
    }
    holdTransaction(req, res, next) {
        this.__transactionManager.openTransaction(req, res);
        next();
    }
    releaseTransaction(req, res, next) {
        if (this.__enableMonitoring) {
            this.__transactionManager.closeTransaction(req, res);
        }
        ;
    }
    checkSession(req, res, next) {
        let properties = new HttpLocalProperties_1.HttpLocalProperties();
        res.locals.properties = properties;
        this.__securityManager.processSession(this, req, res, (err) => {
            if (err) {
                this.__errorManager.processSessionError(properties, err, new GlassCatHttpRequest_1.GlassCatHttpRequest(req), new GlassCatHttpResponse_1.GlassCatHttpResponse(res), this.__connectorManager.getErrorPage());
                this.releaseTransaction(req, res, next);
            }
            else
                next();
        });
    }
    validateRequest(req, res, next) {
        let properties = res.locals.properties;
        let httpRequest = null;
        let httpResponse = null;
        if (properties.isStatic)
            next();
        else {
            this.__securityManager.validateTransaction(req, res, this, (err) => {
                if (err) {
                    httpRequest = new GlassCatHttpRequest_1.GlassCatHttpRequest(req);
                    httpResponse = new GlassCatHttpResponse_1.GlassCatHttpResponse(res);
                    if (err.getStatusCode() === jec_commons_1.HttpStatusCode.UNAUTHORIZED) {
                        properties.connector
                            .getContainer()
                            .getLoginStrategy()
                            .applyLoginStrategy(httpRequest, httpResponse, (err) => {
                            this.releaseTransaction(req, res, next);
                        });
                    }
                    else {
                        this.__errorManager.processAuthenticationError(properties, err, httpRequest, httpResponse, this.__connectorManager.getErrorPage());
                        this.releaseTransaction(req, res, next);
                    }
                }
                else
                    next();
            });
        }
    }
    processRequest(req, res, next) {
        let httpRequest = new GlassCatHttpRequest_1.GlassCatHttpRequest(req);
        let httpResponse = new GlassCatHttpResponse_1.GlassCatHttpResponse(res);
        let properties = res.locals.properties;
        let crd = properties.contextRootData;
        let connector = properties.connector;
        if (crd.containsNestedResource) {
            ResourceProxy_1.ResourceProxy.getInstance().loadFile(crd.newPath, function (err, content) {
                if (err) {
                    this.__errorManager.processNestedResourceError(properties, err, httpRequest, httpResponse, this.__connectorManager.getErrorPage());
                }
                else
                    res.send(content);
                next();
            });
        }
        else if (!crd.needsRedirection) {
            if (connector) {
                connector.getContainer()
                    .process(properties, httpRequest, httpResponse, (err) => {
                    if (err) {
                        this.__errorManager.processDomainRequestError(properties, err, httpRequest, httpResponse, this.__connectorManager.getErrorPage());
                    }
                    next();
                });
            }
            else {
                this.__errorManager.processDomainRequestError(properties, this._notFoundErrorBuilder.build(), httpRequest, httpResponse, this.__connectorManager.getErrorPage());
            }
        }
        else {
            res.redirect(crd.newPath);
            next();
        }
    }
    initHeadersSecurity() {
        let headerParams = this.__securityManager.getHeaderSecurityParams(this);
    }
    initTransactionInterceptor() {
        if (this.__enableMonitoring) {
            this.__app.use(this.holdTransaction.bind(this));
        }
    }
    initTransactionFilter() {
        this.__app.use(this.releaseTransaction.bind(this));
    }
    initSessionsSecurity() {
        this.__app.use(cookieParser());
        this.__app.use(this.checkSession.bind(this));
    }
    createTransactionInterceptors() {
        this.__app.use(this.validateRequest.bind(this));
        this.__app.use(bodyParser.json());
        this.__app.use(bodyParser.urlencoded({ extended: true }));
        this.__app.use(this.processRequest.bind(this));
    }
    initErrorFilter() {
        this.__app.use((err, req, res, next) => {
            let status = err.status || jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
            res.sendStatus(status);
        });
    }
    getHttpListener() {
        return this.__listener;
    }
    initConnectors(connectorManager) {
        if (this.__connectorManager) {
            throw new Error();
        }
        this.__connectorManager = connectorManager;
    }
    initSecurity(securityManager) {
        if (this.__securityManager) {
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
    start() {
        let port = this.__listener.getPort();
        this.__server = this.__app.listen(port);
        this._isActive = true;
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("http.servers.start", this._server, String(port)));
    }
    stop() {
        this.__server.close();
        this._isActive = false;
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("http.servers.stop", this._server));
    }
    isActive() {
        return this._isActive;
    }
}
exports.AbstractHttpService = AbstractHttpService;
;
