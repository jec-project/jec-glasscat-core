"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../util/logging/LoggerManager");
const ContextRootUtil_1 = require("../util/contextroot/ContextRootUtil");
const GlassCatLocaleManager_1 = require("../i18n/GlassCatLocaleManager");
class DomainConnectorManager {
    constructor() {
        this._connectorMap = null;
        this._contextRootUtil = null;
        this._errorPage = null;
        this.init();
    }
    init() {
        this._connectorMap = new Map();
        this._contextRootUtil = new ContextRootUtil_1.ContextRootUtil();
    }
    addConnector(connector, listener) {
        const i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        const contextRootRef = this._contextRootUtil.buildContextRoot(connector, listener);
        this._connectorMap.set(contextRootRef, connector);
        let msg = i18n.get("domains.connectors.added");
        msg += "\n   => " + i18n.get("domains.connectors.name", connector.getName());
        msg += "\n   * " + i18n.get("domains.connectors.type", connector.toString());
        msg += "\n   * " + i18n.get("domains.connectors.target", connector.getTarget());
        msg += "\n   * " + i18n.get("domains.connectors.contextRoot", connector.getContextRoot());
        msg += "\n   * " + i18n.get("domains.connectors.server", connector.getServer());
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getDomainConnector(contextRoot) {
        return this._connectorMap.get(contextRoot);
    }
    getErrorPage() {
        return this._errorPage;
    }
    setErrorPage(errorPage) {
        this._errorPage = errorPage;
    }
}
exports.DomainConnectorManager = DomainConnectorManager;
