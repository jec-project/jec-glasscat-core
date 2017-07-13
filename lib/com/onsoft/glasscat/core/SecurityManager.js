"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const ContextRootUtil_1 = require("../util/contextroot/ContextRootUtil");
const UrlUtils_1 = require("../util/url/UrlUtils");
const ResourceProxy_1 = require("../services/http/proxy/ResourceProxy");
const DomainState_1 = require("../domains/containers/DomainState");
const SessionUtil_1 = require("../security/session/utils/SessionUtil");
const SessionIdUtil_1 = require("../security/session/utils/SessionIdUtil");
const jec_commons_1 = require("jec-commons");
const BasicAuthenticationError_1 = require("../security/session/errors/BasicAuthenticationError");
class SecurityManager {
    constructor() {
        this._contextRootUtil = null;
        this._connectorManager = null;
        this.init();
    }
    init() {
        this._contextRootUtil = new ContextRootUtil_1.ContextRootUtil();
    }
    validateSession(session, constraint) {
        let isValid = session ? session.sessionOwner.isGranted(constraint) : false;
        return isValid;
    }
    isStaticResource(crd, context, properties) {
        let result = false;
        let staticResources = context.getStaticResources(properties.trimmedUrl);
        if (staticResources) {
            properties.isStatic = result = true;
        }
        return result;
    }
    setDomainConnectorManager(manager) {
        this._connectorManager = manager;
    }
    validateTransaction(req, res, service, result) {
        let isSecuredTransaction = true;
        let properties = res.locals.properties;
        let crd = properties.contextRootData;
        let listener = service.getHttpListener();
        let connector = properties.connector;
        let redirectUrl = null;
        let jsletContext = null;
        let securityConstraint = null;
        let session = null;
        let err = null;
        let sessionId = null;
        let errorStatusCode = 0;
        if (crd.containsNestedResource) {
            crd.newPath = ResourceProxy_1.ResourceProxy.getInstance().getProxyPath(req.url, listener, this._connectorManager);
        }
        else if (properties.containerState === DomainState_1.DomainState.STATEFUL) {
            if (!crd.needsRedirection) {
                if (!connector || connector.getServer() !== listener.getServer()) {
                    isSecuredTransaction = false;
                    errorStatusCode = jec_commons_1.HttpStatusCode.NOT_FOUND;
                }
                else {
                    jsletContext = connector.getContainer().getJsletContext();
                    securityConstraint = jsletContext.getSecurityContext()
                        .getSecurityConstraint(properties.trimmedUrl);
                    if (securityConstraint) {
                        session = jsletContext.getSessionContext()
                            .getSession(properties.sessionId);
                        isSecuredTransaction = this.validateSession(session, securityConstraint);
                        if (!isSecuredTransaction) {
                            errorStatusCode = jec_commons_1.HttpStatusCode.UNAUTHORIZED;
                        }
                    }
                }
            }
        }
        if (!isSecuredTransaction) {
            sessionId = properties.sessionId;
            if (!sessionId.authurl) {
                sessionId.authurl = req.url;
                SessionUtil_1.SessionUtil.setSessionCookie(res, sessionId, service);
            }
            err = new BasicAuthenticationError_1.BasicAuthenticationError(errorStatusCode);
        }
        result(err);
    }
    getHeaderSecurityParams(service) {
        let secParams = new Array();
        return secParams;
    }
    processSession(service, req, res, result) {
        let sessionId = null;
        let connector = null;
        let container = null;
        let jsletContext = null;
        let sessionContext = null;
        let isStaticUrl = false;
        let ctxRootRef = null;
        let crd = this._contextRootUtil.extractContextRoot(req);
        let properties = res.locals.properties;
        let cookies = null;
        properties.contextRootData = crd;
        connector = this._connectorManager.getDomainConnector(crd.contextRoot);
        properties.connector = connector;
        properties.sessionId = null;
        if (connector) {
            container = connector.getContainer();
            ctxRootRef = jec_commons_1.UrlStringsEnum.SLASH + connector.getContextRoot();
            properties.trimmedUrl = UrlUtils_1.UrlUtils.getInstance()
                .trimContextRoot(req.url, ctxRootRef);
            if (container.getState() === DomainState_1.DomainState.STATEFUL) {
                properties.containerState = DomainState_1.DomainState.STATEFUL;
                properties.contextRootRef = ctxRootRef;
                jsletContext = container.getJsletContext();
                sessionContext = jsletContext.getSessionContext();
                isStaticUrl = this.isStaticResource(crd, jsletContext.getSecurityContext(), properties);
                if (isStaticUrl)
                    result();
                else {
                    cookies = req[SessionIdUtil_1.SessionIdUtil.COOKIES];
                    sessionId = SessionIdUtil_1.SessionIdUtil.parseSessionIdCookie(cookies);
                    if (!sessionId) {
                        sessionId = sessionContext.initSessionId();
                        SessionUtil_1.SessionUtil.setSessionCookie(res, sessionId, service);
                        properties.sessionId = sessionId;
                        result();
                    }
                    else {
                        properties.sessionId = sessionId;
                        sessionContext.loadSession(sessionId, (err) => {
                            if (err) {
                                let errorType = err.getErrorType();
                                if (errorType === jec_exchange_1.SessionErrorType.INVALID_SESSION_ID) {
                                    result();
                                }
                                else {
                                    properties.redirectUrl = sessionContext.getErrorUrl();
                                    result(err);
                                }
                            }
                            else
                                result();
                        });
                    }
                }
            }
            else
                result();
        }
        else
            result();
    }
}
exports.SecurityManager = SecurityManager;
;
