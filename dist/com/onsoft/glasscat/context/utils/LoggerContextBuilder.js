"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerContext_1 = require("../LoggerContext");
class LoggerContextBuilder {
    constructor() { }
    buildContext(name, factory, logLevel) {
        const ctx = new LoggerContext_1.LoggerContext();
        ctx.name = name;
        ctx.factory = factory;
        ctx.logLevel = logLevel;
        return ctx;
    }
}
exports.LoggerContextBuilder = LoggerContextBuilder;
;
