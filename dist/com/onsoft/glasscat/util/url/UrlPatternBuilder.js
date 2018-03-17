"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextRootUtil_1 = require("../contextroot/ContextRootUtil");
const jec_commons_1 = require("jec-commons");
const BasicUrlPattern_1 = require("./BasicUrlPattern");
class UrlPatternBuilder {
    constructor() { }
    build(pattern) {
        const urlMapper = new BasicUrlPattern_1.BasicUrlPattern();
        const len = pattern.length - 2;
        const permMarkId = pattern.lastIndexOf(jec_commons_1.UrlStringsEnum.PERM_MARK);
        let baseUrl = pattern.indexOf(jec_commons_1.UrlStringsEnum.SLASH) === 0 ?
            pattern.substr(1) : pattern;
        if (permMarkId === len) {
            urlMapper.strict = false;
            baseUrl = baseUrl.substr(0, len);
        }
        if (baseUrl.length === 0)
            baseUrl = ContextRootUtil_1.ContextRootUtil.INDEX;
        urlMapper.baseUrl = baseUrl;
        urlMapper.baseUrlLength = baseUrl.length;
        urlMapper.pattern = pattern;
        return urlMapper;
    }
}
exports.UrlPatternBuilder = UrlPatternBuilder;
