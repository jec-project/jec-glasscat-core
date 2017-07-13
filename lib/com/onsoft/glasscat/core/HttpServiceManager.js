"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../util/logging/LoggerManager");
const LocaleManager_1 = require("../i18n/LocaleManager");
class HttpServiceManager {
    constructor() {
        this._httpServiceMap = null;
        this.init();
    }
    init() {
        this._httpServiceMap = new Map();
    }
    initManagers(connectorManager, securityManager) {
        this._httpServiceMap.forEach(function (svc, key) {
            svc.initConnectors(connectorManager);
            svc.initSecurity(securityManager);
        });
    }
    addService(service) {
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        this._httpServiceMap.set(service.getHttpListener().getServer(), service);
        let msg = i18n.get("http.services.service.added");
        let listener = service.getHttpListener();
        msg += "\n   => " + i18n.get("http.services.service.id", listener.getId());
        msg += "\n   * " + i18n.get("http.services.service.server", listener.getServer());
        msg += "\n   * " + i18n.get("http.services.service.config", listener.getAdress(), String(listener.getPort()));
        msg += "\n   * " + i18n.get("http.services.service.secured", String(listener.getSecured()));
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getService(name) {
        return this._httpServiceMap.get(name);
    }
    startServices() {
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("http.services.start"));
        let logMapElements = function (svc, key) {
            if (!svc.isActive())
                svc.start();
        };
        this._httpServiceMap.forEach(logMapElements);
    }
    stopServices() {
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("http.services.stop"));
        let logMapElements = function (svc, key) {
            if (svc.isActive())
                svc.stop();
        };
        this._httpServiceMap.forEach(logMapElements);
    }
}
exports.HttpServiceManager = HttpServiceManager;
;
