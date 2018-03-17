"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
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
        const decorators = file.decorators;
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
        const context = watcher.getContainer().getJsletContext();
        const jslets = new Array();
        const pathLength = sourcePath.length + 1;
        let len = this._jsletFiles.length;
        let file = null;
        let jsletPath = null;
        while (len--) {
            file = this._jsletFiles[len];
            jsletPath = file.path.substring(pathLength) + file.name;
            LoggerManager_1.LoggerManager.getInstance().debug(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("jslet.autowireDetect", jsletPath));
            jslets.push(jsletPath);
        }
        JsletContextBuilder_1.JsletContextBuilder.getInstance().initJslets(context, jslets);
        this._jsletFiles.splice(0);
    }
}
JsletsAutowireProcessor.WEBJSLET_MASK = "WebJslet";
JsletsAutowireProcessor.EXCHANGE_MASK = "jec-exchange";
exports.JsletsAutowireProcessor = JsletsAutowireProcessor;
