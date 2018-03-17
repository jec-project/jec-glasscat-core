"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
const LoggerManager_1 = require("../util/logging/LoggerManager");
class DefaultTemplateProcessor {
    constructor() { }
    renderFile(templatePath, data, req, res) {
        ejs.renderFile(templatePath, data, null, (error, result) => {
            if (!error) {
                res.end(result);
            }
            else {
                const logger = LoggerManager_1.LoggerManager.getInstance();
                if (logger.isInitialized()) {
                    LoggerManager_1.LoggerManager.getInstance().error(error);
                }
                res.end(null);
            }
        });
    }
}
exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
