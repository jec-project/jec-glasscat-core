"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SourceMapProcessor {
    constructor() {
        this._fileList = null;
        this.init();
    }
    init() {
        this._fileList = new Array();
    }
    processStart(watcher, sourcePath) { }
    process(file, connector) {
        this._fileList.push(file);
    }
    processComplete(connector, sourcePath) { }
    getGraph() { }
}
exports.SourceMapProcessor = SourceMapProcessor;
