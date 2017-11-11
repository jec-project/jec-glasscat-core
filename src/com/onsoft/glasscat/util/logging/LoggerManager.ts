//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {Logger, LogLevel, LogLevelUtil, AbstractLogger} from "jec-commons";
import {LocaleManager} from "../../i18n/LocaleManager";
import {GlassCatError} from "../../exceptions/GlassCatError";
import {GlassCatErrorCode} from "../../exceptions/GlassCatErrorCode";

/**
 * The wrapper singleton for all logger of a GlassCat container.
 */
export class LoggerManager extends AbstractLogger {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LoggerManager</code> instance.
   */
  constructor() {
    super();
    if(LoggerManager._locked || LoggerManager.INSTANCE) {
      let msg:string =
           LocaleManager.getInstance().get("errors.singleton", "LoggerManager");
      throw new GlassCatError(GlassCatErrorCode.SINGLETON_ERROR, msg);
    }
    LoggerManager._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>LoggerManager</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>LoggerManager</code> singleton instance reference.
   */
  private static INSTANCE:Logger = null;

  /**
   * Returns a reference to the <code>LoggerManager</code> singleton.
   *
   * @return {LoggerManager} a reference to the <code>LoggerManager</code>
   *                         singleton.
   */
  public static getInstance():Logger {
    if(LoggerManager.INSTANCE === null) {
      LoggerManager._locked = false;
      LoggerManager.INSTANCE = new LoggerManager();
    }
    return LoggerManager.INSTANCE;
  }

  /**
   * Initializes the <code>LoggerManager</code> singleton. This method is called 
   * by the kernel object.
   *
   * @param {Array<Logger>} loggers the list of <code>Loggers</code> declared 
   *                                for a GlassCat container.
   * @param {number} logLevel the log level for the GlassCat container.
   */
  public init(loggers:Logger[], logLevel:number) {
    let i18n:LocaleManager = LocaleManager.getInstance();
    let llu:LogLevelUtil = null;
    let msg:string = null;
    let loggerNum:number = 1;
    let logger:Logger = null;
    let len:number = 0;
    if(loggers) {
      this.__name = "LoggerManager";
      this.__logLevel = logLevel;
      this._loggers = loggers;
      llu = new LogLevelUtil();
      msg = i18n.get("loggers.init", llu.logLevelToString(logLevel));
      len = this._loggers.length;
      while(len--) {
        logger = this._loggers[len];
        msg += "\n   => " + i18n.get("loggers.num", String(loggerNum));
        msg += "\n   * " + i18n.get("loggers.name", String(logger.getName()));
        msg += "\n   * " + i18n.get("loggers.classref", String(logger));
        msg += "\n   * " + i18n.get(
          "loggers.internalLogLevel",
          String(llu.logLevelToString(logger.getLogLevel()))
        );
        loggerNum++;
      }
      this.info(msg);
      this._initialized = true;
    } else {
      this.__name = null;
      this.__logLevel = null;
      this._loggers = null;
      this._initialized = false;
    }
  }

  /**
   * Returns a boolean value that indicates whether the singleton is initialized 
   * (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether the singleton is initialized;
   *                   <code>false</code> otherwise.
   */
  public isInitialized():boolean {
    return this._initialized;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A boolean that indicates whether the singleton is initialized 
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _initialized:boolean = false;

  /**
   * The list of Loggers for the GlassCat container.
   */
  private _loggers:Logger[] = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setLogLevel(logLevel:number):void {}

  /**
   * @inheritDoc
   */
  public setName(name:string):void {}

  /**
   * @inheritDoc
   */
  public debug(marker:any):void {
    if(this.__logLevel <= LogLevel.DEBUG && this.__logLevel !== LogLevel.OFF) {
      let len:number = this._loggers.length;
      while(len--) this._loggers[len].debug(marker);
    }
  }

  /**
   * @inheritDoc
   */
  public error(marker:any):void {
    if(this.__logLevel <= LogLevel.ERROR && this.__logLevel !== LogLevel.OFF) {
      let len:number = this._loggers.length;
      while(len--) this._loggers[len].error(marker);
   }
  }

  /**
   * @inheritDoc
   */
  public info(marker:any):void {
    if(this.__logLevel <= LogLevel.INFO && this.__logLevel !== LogLevel.OFF) {
      let len:number = this._loggers.length;
      while(len--) this._loggers[len].info(marker);
   }
  }

  /**
   * @inheritDoc
   */
  public trace(marker:any):void {
    if(this.__logLevel <= LogLevel.TRACE && this.__logLevel !== LogLevel.OFF) {
      let len:number = this._loggers.length;
      while(len--) this._loggers[len].trace(marker);
   }
  }

  /**
   * @inheritDoc
   */
  public warn(marker:any):void {
    if(this.__logLevel <= LogLevel.WARN && this.__logLevel !== LogLevel.OFF) {
      let len:number = this._loggers.length;
      while(len--) this._loggers[len].warn(marker);
   }
  }
};
