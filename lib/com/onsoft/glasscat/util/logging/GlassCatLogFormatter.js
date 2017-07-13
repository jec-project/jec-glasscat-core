"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class GlassCatLogFormatter {
    constructor() {
        this.appender = "\n";
        this.timeFormat = "MM/DD/YY HH:mm:ss.SSS";
    }
    format(level, marker, useAppender = false, context = "") {
        let time = moment().format(this.timeFormat);
        let msg = `[${time}][GlassCat]${context} ${level}: ${marker}`;
        if (useAppender)
            msg += this.appender;
        return msg;
    }
}
exports.GlassCatLogFormatter = GlassCatLogFormatter;
;
