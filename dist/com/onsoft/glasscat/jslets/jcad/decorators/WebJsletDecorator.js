"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
class WebJsletDecorator {
    constructor() { }
    decorate(target, params) {
        const patterns = params.urlPatterns;
        if (!patterns) {
            throw new jec_exchange_1.JsletError("errors.jslet.patternsMissing");
        }
        else if (patterns.length === 0) {
            throw new jec_exchange_1.JsletError("errors.jslet.patternsEmpty");
        }
        Reflect.defineProperty(target, WebJsletDecorator.METADATA_REF, {
            value: params,
            configurable: false,
            enumerable: false,
            writable: false
        });
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
WebJsletDecorator.METADATA_REF = "__webJsletMetadata";
exports.WebJsletDecorator = WebJsletDecorator;
