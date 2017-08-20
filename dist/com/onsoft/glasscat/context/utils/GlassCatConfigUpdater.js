"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MappedPathUtil_1 = require("../../util/paths/MappedPathUtil");
const fs = require("fs");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class GlassCatConfigUpdater {
    constructor() { }
    update(config, result) {
        let path = MappedPathUtil_1.MappedPathUtil.getInstance()
            .resolve(GlassCatConfigUpdater.BOOTSTRAP_FILE_PATH);
        let data = JSON.stringify(config);
        let glassCatError = null;
        fs.writeFile(path, data, (error) => {
            if (error) {
                glassCatError = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_UPDATE_ERROR, String(error));
            }
            result(glassCatError);
        });
    }
}
GlassCatConfigUpdater.BOOTSTRAP_FILE_PATH = "${root}/public/cfg/bootstrap_test.json";
exports.GlassCatConfigUpdater = GlassCatConfigUpdater;
;
