"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
class EnvironmentValidator {
    constructor() { }
    validate(kernel) {
        let i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        let env = i18n.get("environment.start");
        env += "\n   * "
            + i18n.get("environment.host", os.type(), os.platform(), os.release());
        env += "\n   * " + i18n.get("environment.hostName", os.hostname());
        env += "\n   * " + i18n.get("environment.directory", os.homedir());
        env += "\n   * " + i18n.get("environment.totalMemory", String(os.totalmem()));
        env += "\n   * " + i18n.get("environment.freeMemory", String(os.freemem()));
        LoggerManager_1.LoggerManager.getInstance().info(env);
        env = i18n.get("cpus.start");
        let cpuList = os.cpus();
        let len = cpuList.length;
        let cpuNum = 1;
        let cpuInf;
        while (len--) {
            cpuInf = cpuList[len];
            env += "\n   => " + i18n.get("cpus.num", String(cpuNum));
            env += "\n   * " + i18n.get("cpus.model", cpuInf.model);
            env += "\n   * " + i18n.get("cpus.speed", String(cpuInf.speed));
            cpuNum++;
        }
        LoggerManager_1.LoggerManager.getInstance().info(env);
    }
}
exports.EnvironmentValidator = EnvironmentValidator;
;
