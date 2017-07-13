"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsletManager {
    constructor() {
        this._jsletContextMap = null;
        this.init();
    }
    init() {
        this._jsletContextMap = new Map();
    }
    addContext(ref, context) {
        this._jsletContextMap.set(ref, context);
    }
    getContext(ref) {
        return this._jsletContextMap.get(ref);
    }
    getJslet(ref, url) {
        let jslet = undefined;
        let ctx = this.getContext(ref);
        if (ctx)
            jslet = ctx.getJslet(url);
        return jslet;
    }
}
exports.JsletManager = JsletManager;
;
