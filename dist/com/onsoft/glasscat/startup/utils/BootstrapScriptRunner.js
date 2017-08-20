"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BootstrapScriptSorter_1 = require("./BootstrapScriptSorter");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
class BootstrapScriptRunner {
    constructor() { }
    runAll(container) {
        let sorter = null;
        let context = container.getBootstrapContext();
        let scripts = context.getScriptList();
        let script = null;
        let len = scripts.length;
        let logManager = LoggerManager_1.LoggerManager.getInstance();
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        if (len > 0) {
            sorter = new BootstrapScriptSorter_1.BootstrapScriptSorter();
            sorter.sortCollection(scripts);
            while (len--) {
                script = scripts[len];
                logManager.info(i18n.get("bootstrap.run", script.constructor.name));
                script.run(container);
            }
        }
    }
}
exports.BootstrapScriptRunner = BootstrapScriptRunner;
