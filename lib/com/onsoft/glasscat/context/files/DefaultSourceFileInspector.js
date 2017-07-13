"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const jec_commons_1 = require("jec-commons");
const jec_commons_node_1 = require("jec-commons-node");
class DefaultSourceFileInspector {
    constructor() {
        this._processors = null;
        this._sourcePaths = null;
        this._connector = null;
        this._target = null;
        this._walkUtil = null;
        this.init();
    }
    init() {
        this._processors = new Array();
        this._sourcePaths = new Array();
        this._walkUtil = new jec_commons_node_1.WalkPathUtil();
    }
    inspectSourcePath(sourcePath) {
        let file = null;
        let targetPath = this._target + sourcePath;
        this.notifyProcessStart(targetPath);
        this._walkUtil.walkSync(targetPath, (file) => {
            this.processFile(file);
        });
        this.notifyProcessComplete(targetPath);
    }
    processFile(file) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].process(file, this._connector);
        }
    }
    notifyProcessStart(sourcePath) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].processStart(this._connector, sourcePath);
        }
    }
    notifyProcessComplete(sourcePath) {
        let len = this._processors.length;
        while (len--) {
            this._processors[len].processComplete(this._connector, sourcePath);
        }
    }
    setWatcher(connector) {
        let logManager = LoggerManager_1.LoggerManager.getInstance();
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        if (this._connector) {
            logManager.error(i18n.get("srcInspector.initError"));
        }
        else {
            this._connector = connector;
            this._target = connector.getTarget() + jec_commons_1.UrlStringsEnum.SLASH;
            logManager.info(i18n.get("srcInspector.init"));
            this.addSourcePath("src");
        }
    }
    getWatcher() {
        return this._connector;
    }
    addProcessor(processor) {
        this._processors.push(processor);
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("srcInspector.processorAdded", processor.constructor.name));
    }
    addSourcePath(path) {
        this._sourcePaths.push(path);
        LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("srcInspector.sourcePathAdded", path));
    }
    inspect() {
        let len = this._processors.length;
        let logManager = LoggerManager_1.LoggerManager.getInstance();
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        if (len > 0) {
            logManager.info(i18n.get("srcInspector.lookupStart"));
            len = this._sourcePaths.length;
            while (len--) {
                this.inspectSourcePath(this._sourcePaths[len]);
            }
            logManager.info(i18n.get("srcInspector.lookupComplete"));
        }
    }
}
exports.DefaultSourceFileInspector = DefaultSourceFileInspector;
