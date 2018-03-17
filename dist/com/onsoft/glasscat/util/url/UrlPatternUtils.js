"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class UrlPatternUtils {
    constructor() { }
    match(url, pattern) {
        const notStrict = !pattern.strict;
        const baseUrl = pattern.baseUrl;
        let result = false;
        let testUrl = url;
        if (notStrict) {
            testUrl += jec_commons_1.UrlStringsEnum.SLASH;
            if (testUrl.indexOf(baseUrl) === 0)
                return true;
        }
        testUrl = url;
        if (testUrl === baseUrl)
            result = true;
        else if (testUrl.indexOf(baseUrl) === 0) {
            if (testUrl.charAt(pattern.baseUrlLength) === jec_commons_1.UrlStringsEnum.MARK) {
                result = true;
            }
            else
                result = notStrict;
        }
        return result;
    }
}
exports.UrlPatternUtils = UrlPatternUtils;
