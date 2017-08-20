"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
class WebJsletDecorator {
    constructor() { }
    decorate(target, params) {
        let patterns = params.urlPatterns;
        if (!patterns) {
            throw new jec_exchange_1.JsletError("errors.jslet.patternsMissing");
        }
        else if (patterns.length === 0) {
            throw new jec_exchange_1.JsletError("errors.jslet.patternsEmpty");
        }
        target.__webJsletMetadata = params;
        target.prototype.getName = function () {
            return target.__webJsletMetadata.name;
        };
        target.prototype.getUrlPatterns = function () {
            return target.__webJsletMetadata.urlPatterns;
        };
        if (target.__webJsletMetadata.template) {
            target.prototype.getTemplate = function () {
                return target.__webJsletMetadata.template;
            };
        }
        return target;
    }
}
exports.WebJsletDecorator = WebJsletDecorator;
