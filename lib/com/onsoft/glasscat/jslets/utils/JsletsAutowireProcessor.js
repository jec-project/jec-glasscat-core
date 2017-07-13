"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const JsletContextBuilder_1 = require("./JsletContextBuilder");
class JsletsAutowireProcessor {
    constructor() {
        this._jsletFiles = null;
        this.initObj();
    }
    initObj() {
        this._jsletFiles = new Array();
    }
    processStart(watcher, sourcePath) { }
    process(file, watcher) {
        let decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        while (len--) {
            decorator = decorators[len];
            if (decorator.name === JsletsAutowireProcessor.WEBJSLET_MASK &&
                decorator.classPath === JsletsAutowireProcessor.EXCHANGE_MASK) {
                this._jsletFiles.push(file);
            }
        }
    }
    processComplete(watcher, sourcePath) {
        let context = watcher.getContainer().getJsletContext();
        let len = this._jsletFiles.length;
        let file = null;
        let jslets = new Array();
        let pathLength = sourcePath.length + 1;
        let jsletPath = null;
        while (len--) {
            file = this._jsletFiles[len];
            jsletPath = file.path.substring(pathLength) + file.name;
            LoggerManager_1.LoggerManager.getInstance().info(LocaleManager_1.LocaleManager.getInstance().get("jslet.autowireDetect", jsletPath));
            jslets.push(jsletPath);
        }
        JsletContextBuilder_1.JsletContextBuilder.getInstance().initJslets(context, jslets);
        this._jsletFiles.splice(0);
    }
}
JsletsAutowireProcessor.WEBJSLET_MASK = "WebJslet";
JsletsAutowireProcessor.EXCHANGE_MASK = "jec-exchange";
exports.JsletsAutowireProcessor = JsletsAutowireProcessor;
