"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const BootstrapScriptBuilder_1 = require("./BootstrapScriptBuilder");
const BootstrapScriptRunner_1 = require("./BootstrapScriptRunner");
const jec_commons_1 = require("jec-commons");
class BootstrapAutowireProcessor {
    constructor() {
        this._bootstrapFiles = null;
        this.initObj();
    }
    initObj() {
        this._bootstrapFiles = new Array();
    }
    processStart(watcher, sourcePath) { }
    process(file, watcher) {
        const decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        while (len--) {
            decorator = decorators[len];
            if (decorator.name === BootstrapAutowireProcessor.BOOTSTRAP_MASK &&
                decorator.classPath === BootstrapAutowireProcessor.COMMONS_MASK) {
                this._bootstrapFiles.push(file);
            }
        }
    }
    processComplete(watcher, sourcePath) {
        const container = watcher.getContainer();
        const context = container.getBootstrapContext();
        const src = watcher.getTarget() + jec_commons_1.JecStringsEnum.SRC;
        const builder = new BootstrapScriptBuilder_1.BootstrapScriptBuilder();
        const runner = new BootstrapScriptRunner_1.BootstrapScriptRunner();
        const pathLength = sourcePath.length + 1;
        let len = this._bootstrapFiles.length;
        let file = null;
        let script = null;
        let bootstrapPath = null;
        while (len--) {
            file = this._bootstrapFiles[len];
            bootstrapPath = file.path.substring(pathLength) + file.name;
            LoggerManager_1.LoggerManager.getInstance().debug(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("bootstrap.autowireDetect", bootstrapPath));
            script = builder.build(src + bootstrapPath);
            context.addScript(script);
        }
        this._bootstrapFiles.splice(0);
        runner.runAll(container);
    }
}
BootstrapAutowireProcessor.BOOTSTRAP_MASK = "Bootstrap";
BootstrapAutowireProcessor.COMMONS_MASK = "jec-commons";
exports.BootstrapAutowireProcessor = BootstrapAutowireProcessor;
