"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class DefaultUserHashModule {
    constructor() {
        this._key = null;
        this.HASH_ALGORITHM = "sha256";
        this.SPACER = " ";
        this.ALGORITHM = "aes-256-ctr";
        this.ROLES_SEPARATOR = ",";
    }
    checkKey() {
        if (!this._key) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
        }
    }
    getCipher() {
        this.checkKey();
        return crypto.createCipher(this.ALGORITHM, this._key);
    }
    getDecipher() {
        this.checkKey();
        return crypto.createDecipher(this.ALGORITHM, this._key);
    }
    encryptString(text) {
        let cipher = this.getCipher();
        let result = cipher.update(text, jec_commons_1.EncodingFormat.UTF8, jec_commons_1.EncodingFormat.HEX);
        result += cipher.final(jec_commons_1.EncodingFormat.HEX);
        return result;
    }
    decryptString(text) {
        let decipher = this.getDecipher();
        let result = decipher.update(text, jec_commons_1.EncodingFormat.HEX, jec_commons_1.EncodingFormat.UTF8);
        result += decipher.final(jec_commons_1.EncodingFormat.UTF8);
        return result;
    }
    setPrivateKey(key) {
        this._key = key;
    }
    encryptUser(alias, password, roles) {
        let result = this.encryptAlias(alias) + this.SPACER +
            this.encryptPassword(password) + this.SPACER +
            this.encryptRoles(roles);
        return result;
    }
    encryptAlias(alias) {
        return this.encryptString(alias);
    }
    encryptPassword(password) {
        let hash = crypto.createHash(this.HASH_ALGORITHM);
        return hash.update(password).digest(jec_commons_1.EncodingFormat.HEX).toString();
    }
    encryptRoles(roles) {
        let data = roles.join(this.ROLES_SEPARATOR);
        return this.encryptString(data);
    }
    decryptAlias(alias) {
        return this.decryptString(alias);
    }
    decryptRoles(roles) {
        let decrypted = this.decryptString(roles);
        return decrypted.split(this.ROLES_SEPARATOR);
    }
}
exports.DefaultUserHashModule = DefaultUserHashModule;
