"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class LoggerContext {
    constructor() {
        this.factory = null;
        this.name = null;
        this.logLevel = jec_commons_1.LogLevel.TRACE;
    }
}
exports.LoggerContext = LoggerContext;
