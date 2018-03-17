"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../../util/logging/LoggerManager");
const EjpConfigLoader_1 = require("./EjpConfigLoader");
const EjpConfigSerializer_1 = require("./EjpConfigSerializer");
const MappedPathUtil_1 = require("../../../util/paths/MappedPathUtil");
const fs = require("fs");
const GlassCatLocaleManager_1 = require("../../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class EjpConfigUpdater {
    constructor() {
        this._serializer = null;
        this.init();
    }
    init() {
        this._serializer = new EjpConfigSerializer_1.EjpConfigSerializer();
    }
    update(projectPath, config, result, optimize = false) {
        const path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(projectPath + EjpConfigLoader_1.EjpConfigLoader.MANIFEST_PATH);
        let glassCatError = null;
        let stringErr = null;
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("ejp.updateStart", path));
        this._serializer.serialize(config, (data) => {
            fs.writeFile(path, data, (err) => {
                if (err) {
                    LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("ejp.updateFailed", path, err.message));
                    stringErr = err.toString();
                    glassCatError = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_UPDATE_ERROR, stringErr);
                    result(glassCatError);
                }
                else {
                    LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance()
                        .get("ejp.updateComplete", path));
                    result(null);
                }
            });
        }, (err) => {
            stringErr = err.toString();
            LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("ejp.updateFailed", path, stringErr));
            glassCatError = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_UPDATE_ERROR, stringErr);
            result(glassCatError);
        }, optimize);
    }
}
exports.EjpConfigUpdater = EjpConfigUpdater;
;
