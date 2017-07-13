"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n = require("i18n");
const GlassCatError_1 = require("../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../exceptions/GlassCatErrorCode");
class LocaleManager {
    constructor() {
        this._initialized = false;
        if (LocaleManager._locked || LocaleManager.INSTANCE) {
            let msg = LocaleManager.getInstance().get("errors.singleton", "LocaleManager");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        LocaleManager._locked = true;
    }
    static getInstance() {
        if (LocaleManager.INSTANCE === null) {
            LocaleManager._locked = false;
            LocaleManager.INSTANCE = new LocaleManager();
        }
        return LocaleManager.INSTANCE;
    }
    init(locale, options) {
        if (locale) {
            let config = {
                locales: [locale],
                defaultLocale: locale,
                directory: './public/locales',
                objectNotation: true
            };
            if (options)
                config = Object.assign({}, config, options);
            i18n.configure(config);
            this._initialized = true;
        }
        else
            this._initialized = false;
    }
    isInitialized() {
        return this._initialized;
    }
    getLocale() {
        return this._initialized ? i18n.getLocale() : null;
    }
    get(key, ...replace) {
        let result = null;
        if (this._initialized)
            result = i18n.__(key, ...replace);
        return result;
    }
}
LocaleManager._locked = true;
LocaleManager.INSTANCE = null;
exports.LocaleManager = LocaleManager;
