"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoutePattern_1 = require("./RoutePattern");
function Routes(metadata) {
    return function (target) {
        const routes = metadata;
        if (!routes)
            return target;
        const oldInit = target.prototype.init;
        target.__routesMetadata = metadata;
        target.prototype.init = function () {
            let len = routes.length;
            let pattern = null;
            let name = null;
            let rawPattern = null;
            while (len--) {
                rawPattern = routes[len];
                name = rawPattern.name;
                pattern = new RoutePattern_1.RoutePattern(rawPattern.pattern);
                pattern.setName(name);
                Object.defineProperty(this, name, {
                    value: pattern,
                    enumerable: true
                });
            }
            oldInit.apply(this);
        };
        return target;
    };
}
exports.Routes = Routes;
