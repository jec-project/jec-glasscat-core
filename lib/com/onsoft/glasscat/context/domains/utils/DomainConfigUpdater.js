"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainConfigSerializer_1 = require("./DomainConfigSerializer");
const MappedPathUtil_1 = require("../../../util/paths/MappedPathUtil");
const fs = require("fs");
class DomainConfigUpdater {
    constructor() {
        this._serializer = null;
        this.init();
    }
    init() {
        this._serializer = new DomainConfigSerializer_1.DomainConfigSerializer();
    }
    update(config, result) {
        let path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(DomainConfigUpdater.DOMAIN_FILE_PATH);
        this._serializer.serialize(config, (data) => {
            fs.writeFile(path, data, result);
        }, (err) => {
            result(err);
        });
    }
}
DomainConfigUpdater.DOMAIN_FILE_PATH = "${root}/public/domains/manifest.json";
exports.DomainConfigUpdater = DomainConfigUpdater;
;
