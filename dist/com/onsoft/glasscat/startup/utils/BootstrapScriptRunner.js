"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BootstrapScriptSorter_1 = require("./BootstrapScriptSorter");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
class BootstrapScriptRunner {
    constructor() { }
    runAll(container) {
        const logManager = LoggerManager_1.LoggerManager.getInstance();
        const i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        const context = container.getBootstrapContext();
        const scripts = context.getScriptList();
        let sorter = null;
        let script = null;
        let len = scripts.length;
        if (len > 0) {
            sorter = new BootstrapScriptSorter_1.BootstrapScriptSorter();
            sorter.sortCollection(scripts);
            while (len--) {
                script = scripts[len];
                logManager.debug(i18n.get("bootstrap.run", script.constructor.name));
                script.run(container);
            }
        }
    }
}
exports.BootstrapScriptRunner = BootstrapScriptRunner;
