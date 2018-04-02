"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Kernel_1 = require("../../core/Kernel");
class KernelBuilder {
    constructor() { }
    build(config) {
        const kernel = new Kernel_1.Kernel();
        kernel.initContext(config);
        return kernel;
    }
}
exports.KernelBuilder = KernelBuilder;
