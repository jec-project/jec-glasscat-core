"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRealmConnector_1 = require("./AbstractRealmConnector");
const fs = require("fs");
const readline = require("readline");
const GlassCatLocaleManager_1 = require("../../../i18n/GlassCatLocaleManager");
const LoggerManager_1 = require("../../../util/logging/LoggerManager");
const jec_commons_1 = require("jec-commons");
const MappedPathUtil_1 = require("../../../util/paths/MappedPathUtil");
const DefaultUserHashModule_1 = require("../../crypto/DefaultUserHashModule");
const SessionOwnerBuilder_1 = require("../../session/utils/SessionOwnerBuilder");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
const BasicAuthenticationError_1 = require("../../session/errors/BasicAuthenticationError");
class AdminFileRealmConnector extends AbstractRealmConnector_1.AbstractRealmConnector {
    constructor() {
        super();
        this.LINE_EVENT = "line";
        this.CLOSE_EVENT = "close";
        this.SPACER = " ";
        this._gksPath = null;
        this.init();
    }
    init() {
        let pathUtil = MappedPathUtil_1.MappedPathUtil.getInstance();
        let gkpPath = pathUtil.resolve("${root}/public/cfg/keyfiles/admin.gkp");
        this._gksPath = pathUtil.resolve("${root}/public/cfg/keyfiles/admin.gks");
        try {
            fs.accessSync(this._gksPath, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK);
            fs.accessSync(gkpPath, fs.constants.F_OK | fs.constants.R_OK);
        }
        catch (e) {
            this.throwInitError(e);
        }
        this.__userHashModule = new DefaultUserHashModule_1.DefaultUserHashModule();
        fs.readFile(gkpPath, (error, data) => {
            if (error) {
                this.throwInitError(error);
            }
            this.__userHashModule.setPrivateKey(data.toString(jec_commons_1.EncodingFormat.UTF8));
        });
    }
    throwInitError(error) {
        let msg = null;
        let loggerManager = null;
        if (GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().isInitialized()) {
            msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.keystoreFile");
        }
        loggerManager = LoggerManager_1.LoggerManager.getInstance();
        if (loggerManager.isInitialized())
            loggerManager.error(error);
        throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.ADMIN_REALM_INIT_FAILURE, msg);
    }
    getStream() {
        return fs.createReadStream(this._gksPath);
    }
    getReadLine(stream) {
        let line = readline.createInterface({ input: stream, output: null, terminal: false });
        return line;
    }
    authenticate(credentials, success, error) {
        let sessionOwner = null;
        let login = credentials.login;
        let alias = this.__userHashModule.encryptAlias(login);
        let password = this.__userHashModule.encryptPassword(credentials.password);
        let userData = null;
        let roles = null;
        let lineId = 0;
        let stream = this.getStream();
        let rl = this.getReadLine(stream);
        let builder = null;
        rl.on(this.LINE_EVENT, (line) => {
            if (line.indexOf(alias) === 0) {
                userData = line.split(this.SPACER);
                if (userData[1] === password) {
                    roles = this.__userHashModule.decryptRoles(userData[2]);
                    builder = new SessionOwnerBuilder_1.SessionOwnerBuilder();
                    sessionOwner = builder.build(String(lineId), login, this.extractRoles(roles));
                }
                rl.close();
            }
        });
        rl.on(this.CLOSE_EVENT, () => {
            stream.close();
            if (sessionOwner)
                success(sessionOwner);
            else {
                error(new BasicAuthenticationError_1.BasicAuthenticationError(jec_commons_1.HttpStatusCode.UNAUTHORIZED));
            }
        });
    }
}
exports.AdminFileRealmConnector = AdminFileRealmConnector;
