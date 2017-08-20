"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpStatusReport {
    constructor() {
        this.title = null;
        this.type = "Status report";
        this.message = null;
        this.description = null;
        this.version = null;
        this.status = 0;
        this.codeName = null;
    }
    toString() {
        return "[Object::HttpStatusReport: title=" + this.title
            + ", type=" + this.type + ", message=" + this.description
            + ", version=" + this.version + ", codeName=" + this.codeName
            + ", message=" + this.description + ", status=" + this.status + "]";
    }
}
exports.HttpStatusReport = HttpStatusReport;
