"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionMonitorDerivation_1 = require("../../../net/http/monitoring/TransactionMonitorDerivation");
const MappedPathUtil_1 = require("../../../util/paths/MappedPathUtil");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class HttpMonitoring {
    constructor(config) {
        this._config = null;
        this._enableMonitoring = false;
        this._transactionMonitor = null;
        this.init(config);
    }
    init(config) {
        if (!config) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "Config must not be null.");
        }
        let loader = null;
        let Contructor = null;
        let classPath = null;
        let builder = null;
        let factory = config.factory;
        this._config = config;
        this._enableMonitoring = config.enabled;
        if (this._enableMonitoring) {
            if (factory) {
                loader = new jec_commons_1.DefaultClassLoader();
                classPath = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(factory);
                Contructor = loader.loadClass(classPath);
                builder = new Contructor();
                this._transactionMonitor = builder.build();
            }
            else {
                this._transactionMonitor = new TransactionMonitorDerivation_1.TransactionMonitorDerivation();
            }
        }
    }
    enableMonitoring() {
        return this._enableMonitoring;
    }
    getTransactionMonitor() {
        return this._transactionMonitor;
    }
}
exports.HttpMonitoring = HttpMonitoring;
