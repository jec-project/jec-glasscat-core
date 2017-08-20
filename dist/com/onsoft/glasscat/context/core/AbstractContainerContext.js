"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
class AbstractContainerContext {
    constructor(connector) {
        this.__connector = null;
        this.initObj(connector);
    }
    initObj(connector) {
        this.__connector = connector;
    }
    getStatusInfo() {
        return this.__connector.getStatusInfo();
    }
    getDirectoryPath() {
        return this.__connector.getTarget() + jec_commons_1.JecStringsEnum.WEB_APP;
    }
    getSourcePath() {
        return this.__connector.getTarget() + jec_commons_1.JecStringsEnum.SRC;
    }
    getLogger() {
        return LoggerManager_1.LoggerManager.getInstance();
    }
}
exports.AbstractContainerContext = AbstractContainerContext;
