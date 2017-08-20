"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printMessage = require('print-message');
class SplashScreen {
    constructor() { }
    displayMessage(version) {
        printMessage([
            "  Welcome to the GlassCat server",
            "  ------------------------------",
            `             V. ${version}            `,
            "     (C) 2017 - ONSOFT SYSTEMS    ",
            "        All Rights Reserved       "
        ]);
    }
}
exports.SplashScreen = SplashScreen;
;
