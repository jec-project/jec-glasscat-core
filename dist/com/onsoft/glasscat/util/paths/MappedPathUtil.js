"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
const path = require("path");
class MappedPathUtil {
    constructor() {
        this._initialized = false;
        this._rootPath = null;
        this._glasscatPath = null;
        this._modulesPath = null;
        if (MappedPathUtil._locked || MappedPathUtil.INSTANCE) {
            let msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "MappedPathUtil");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        MappedPathUtil._locked = true;
    }
    static getInstance() {
        if (MappedPathUtil.INSTANCE === null) {
            MappedPathUtil._locked = false;
            MappedPathUtil.INSTANCE = new MappedPathUtil();
        }
        return MappedPathUtil.INSTANCE;
    }
    init(rootPath) {
        this._rootPath = rootPath;
        this._glasscatPath = rootPath + MappedPathUtil.GLASSCAT_PATH;
        this._modulesPath = rootPath + MappedPathUtil.MODULES_PATH;
        this._initialized = rootPath ? true : false;
    }
    isInitialized() {
        return this._initialized;
    }
    resolve(rawPath) {
        let resolved = rawPath;
        if (resolved.indexOf(MappedPathUtil.ROOT_PATTERN) === 0) {
            resolved = resolved.replace(MappedPathUtil.ROOT_PATTERN, this._rootPath);
        }
        else if (resolved.indexOf(MappedPathUtil.SERVER_PATTERN) === 0) {
            resolved = resolved.replace(MappedPathUtil.SERVER_PATTERN, this._glasscatPath);
        }
        else if (resolved.indexOf(MappedPathUtil.MODULES_PATTERN) === 0) {
            resolved = resolved.replace(MappedPathUtil.MODULES_PATTERN, this._modulesPath);
        }
        return path.normalize(resolved);
    }
}
MappedPathUtil._locked = true;
MappedPathUtil.INSTANCE = null;
MappedPathUtil.SERVER_PATTERN = "${server}";
MappedPathUtil.ROOT_PATTERN = "${root}";
MappedPathUtil.MODULES_PATTERN = "${modules}";
MappedPathUtil.GLASSCAT_PATH = "/server/com/onsoft/glasscat";
MappedPathUtil.MODULES_PATH = "/public/modules";
exports.MappedPathUtil = MappedPathUtil;
;
