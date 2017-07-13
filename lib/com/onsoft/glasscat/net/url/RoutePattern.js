"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPattern = require("url-pattern");
class RoutePattern {
    constructor(pattern) {
        this._pattern = null;
        this._name = null;
        this.init(pattern);
    }
    init(pattern) {
        this._pattern = new UrlPattern(pattern);
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    match(url, success, fail) {
        let result = this._pattern.match(url);
        if (result)
            success(result);
        else
            fail();
    }
    test(url) {
        return this._pattern.match(url) ? true : false;
    }
    exec(url) {
        return this._pattern.match(url);
    }
}
exports.RoutePattern = RoutePattern;
