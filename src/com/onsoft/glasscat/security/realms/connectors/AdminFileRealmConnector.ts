//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {AbstractRealmConnector} from "./AbstractRealmConnector";
import {Credentials, SessionOwner, RealmConnector, AuthenticationError} from "jec-exchange";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import * as stream from "stream";
import {GlassCatLocaleManager} from "../../../i18n/GlassCatLocaleManager";
import {LoggerManager} from "../../../util/logging/LoggerManager";
import { EncodingFormat, HttpStatusCode } from "jec-commons";
import {MappedPathUtil} from "../../../util/paths/MappedPathUtil";
import {DefaultUserHashModule} from "../../crypto/DefaultUserHashModule";
import {SessionOwnerBuilder} from "../../session/utils/SessionOwnerBuilder";
import {GlassCatError} from "../../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../../exceptions/GlassCatErrorCode";
import {BasicAuthenticationError} from "../../session/errors/BasicAuthenticationError";

/**
 * The default <code>RealmConnector</code> implementation for managing
 * administrators.
 */
export class AdminFileRealmConnector extends AbstractRealmConnector
                                     implements RealmConnector {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AdminFileRealmConnector</code> instance.
   */
  constructor() {
    super();
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to <code>line</code> event type.
   */
  private readonly LINE_EVENT:string = "line";

  /**
   * The reference to <code>close</code> event type.
   */
  private readonly CLOSE_EVENT:string = "close";

  /**
   * The reference to spacer used to separate user data in the keystore file.
   */
  private readonly SPACER:string = " ";

  /**
   * The reference to the path for the "keystore" file.
   */
  private _gksPath:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    let pathUtil:MappedPathUtil = MappedPathUtil.getInstance();
    let gkpPath:string =
                      pathUtil.resolve("${root}/public/cfg/keyfiles/admin.gkp");
    this._gksPath = pathUtil.resolve("${root}/public/cfg/keyfiles/admin.gks");
    try {
      fs.accessSync(
        this._gksPath,
        fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK
      );
      fs.accessSync(
        gkpPath,
        fs.constants.F_OK | fs.constants.R_OK
      );
    } catch(e) {
      this.throwInitError(e);
    }
    this.__userHashModule = new DefaultUserHashModule();
    fs.readFile(gkpPath, (error:Error, data:Buffer)=> {
      if(error) {
        this.throwInitError(error);
      }
      this.__userHashModule.setPrivateKey(data.toString(EncodingFormat.UTF8));
    });
  }

  /**
   * Throws a glasscat error if the initialiszation step fails.
   * 
   * @param {any} error the reference to the encoutered error.
   */
  private throwInitError(error:any):void {
    let msg:string = null;
    let loggerManager:LoggerManager = null;
    if(GlassCatLocaleManager.getInstance().isInitialized()) {
       msg = GlassCatLocaleManager.getInstance().get("errors.keystoreFile");
    }
    loggerManager = (LoggerManager.getInstance() as LoggerManager);
    if(loggerManager.isInitialized()) loggerManager.error(error);
    throw new GlassCatError(GlassCatErrorCode.ADMIN_REALM_INIT_FAILURE, msg);
  }

  /**
   * Creates and returns a file stream for this realm.
   * 
   * @return {fs.ReadStream} a new file stream for this realm.
   */
  private getStream():fs.ReadStream {
    return fs.createReadStream(this._gksPath);
  }

  /**
   * Creates and returns a <code>ReadLine</code> instance for this realm.
   * 
   * @param {fs.ReadStream} stream the input stream associated with the new
   *                               <code>ReadLine</code> instance.
   * @return {readline.ReadLine} a new <code>ReadLine</code> instance for this
   *                             realm.
   */
  private getReadLine(stream:fs.ReadStream):readline.ReadLine {
    let line:readline.ReadLine = readline.createInterface(
      { input:stream, output:null, terminal:false }
    );
    return line;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public authenticate(credentials:Credentials,
                                   success:(sessionOwner:SessionOwner)=>void,
                                   error:(err:AuthenticationError)=>void):void {
    let sessionOwner:SessionOwner = null;
    let login:string = credentials.login;
    let alias:string = this.__userHashModule.encryptAlias(login);
    let password:string =
                    this.__userHashModule.encryptPassword(credentials.password);
    let userData:string[] = null;
    let roles:string[] = null;
    let lineId:number = 0;
    let stream:fs.ReadStream = this.getStream();
    let rl:readline.ReadLine = this.getReadLine(stream);
    let builder:SessionOwnerBuilder = null;
    rl.on(this.LINE_EVENT, (line:string)=> {
      if(line.indexOf(alias) === 0) {
        userData = line.split(this.SPACER);
        if(userData[1] === password) {
          roles = this.__userHashModule.decryptRoles(userData[2]);
          builder = new SessionOwnerBuilder();
          sessionOwner = builder.build(
            String(lineId),
            login,
            this.extractRoles(roles)
          );
        }
        rl.close();
      }
    });
    rl.on(this.CLOSE_EVENT, ()=> {
      stream.close();
      if(sessionOwner) success(sessionOwner);
      else {
        error(
          new BasicAuthenticationError(HttpStatusCode.UNAUTHORIZED)
        );
      }
    });
  }
}