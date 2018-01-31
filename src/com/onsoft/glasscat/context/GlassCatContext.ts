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

import {LoggerFactory} from "../util/logging/LoggerFactory";
import {LoggerContext} from "./LoggerContext";
import {LogLevel, LogLevelUtil, ClassLoader, GlobalClassLoader,
        LogLevelString} from "jec-commons";
import {LoggerContextBuilder} from "./utils/LoggerContextBuilder";
import {MappedPathUtil} from "../util/paths/MappedPathUtil";
import {HttpListenerConfig} from "./core/HttpListenerConfig";
import {BootstrapConfig} from "./core/BootstrapConfig";
import {LoggersConfig} from "./core/LoggersConfig";
import {LoggerFactoryConfig} from "./core/LoggerFactoryConfig";

/**
 * A data object which contains the current GlassCat container context.
 */
export class GlassCatContext {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainContext</code> instance.
   * 
   * @param {BootstrapConfig} bootstrap The bootstrap configuration for this
   *                                    <code>GlassCatContext</code> instance.
   */
  constructor(bootstrap:BootstrapConfig) {
    this.initContext(bootstrap);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The bootstrap configuration for this <code>GlassCatContext</code> instance.
   */
  private _bootstrap:BootstrapConfig = null;

  /**
   * The root path to this GlassCat server directory.
   */
  private _root:string = null;

  /**
   * The path to the error template file.
   */
  private _errorPage:string = null;

  /**
   * The <code>LoggerContext</code> instances for this context.
   */
  private _loggerContexts:LoggerContext[] = null;

  /**
   * The level of logging outputs for this context.
   */
  private _logLevel:number = LogLevel.TRACE;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the context of this <code>GlassCatContext</code> instance.
   *
   * @param {BootstrapConfig} bootstrap The bootstrap configuration for this
   *                                    <code>GlassCatContext</code> instance.
   */
  private initContext(bootstrap:any):void {
    this._bootstrap = bootstrap;
    this.initPaths();
    this.initLogLevel();
    this.initLoggerFactories();
  }

  /**
   * Initializes the default paths for the current GlassCat container.
   */
  private initPaths():void {
    this._root = process.cwd();
    this._errorPage = MappedPathUtil.getInstance()
                                    .resolve(this._bootstrap.config.errorPage);
  }

  /**
   * Initializes the log level for the current GlassCat container.
   */
  private initLogLevel():void {
    let llu:LogLevelUtil = new LogLevelUtil();
    this._logLevel = llu.stringTogLevel(this._bootstrap.config.loggers.logLevel);
  }

  /**
   * Initializes the <code>LoggerFactory</code> instances.
   */
  private initLoggerFactories():void {
    let config:LoggersConfig = this._bootstrap.config.loggers;
    let factoryRefs:LoggerFactoryConfig[] = config.factories;
    let factoryData:LoggerFactoryConfig = null;
    let len:number = factoryRefs.length;
    let loggerFactory:LoggerFactory = null;
    let ctxBuiler:LoggerContextBuilder = new LoggerContextBuilder();
    let loggerContext:LoggerContext = null;
    let llu:LogLevelUtil = new LogLevelUtil();
    let loader:ClassLoader = GlobalClassLoader.getInstance();
    let Contructor:any = null;
    let classPath:string = null;
    let logLevel:LogLevelString = null;
    this._loggerContexts = new Array<LoggerContext>();
    while(len--) {
      factoryData = factoryRefs[len];
      classPath = MappedPathUtil.getInstance().resolve(factoryData.factory);
      Contructor = loader.loadClass(classPath);
      loggerFactory = new Contructor();
      logLevel = factoryData.logLevel;
      loggerContext = ctxBuiler.buildContext(
        factoryData.name,
        loggerFactory,
        logLevel ? llu.stringTogLevel(logLevel) : this._logLevel
      );
      this._loggerContexts.push(loggerContext);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the list of <code>LoggerContext</code> instances for this context.
   *
   * @return {Array<LoggerContext>} the <code>LoggerContext</code> instances for 
   *                                this context.
   */
  public getLoggerContexts():LoggerContext[] {
    return this._loggerContexts;
  }

  /**
   * Returns the log level for this context.
   *
   * @return {number} the log level for this context.
   */
  public getLogLevel():number {
    return this._logLevel;
  }

  /**
   * Returns the GlassCat prefered version for the context file.
   *
   * @return {string} the prefered version for the context file.
   */
  public getVersion():string {
    return this._bootstrap.glasscat.version;
  }

  /**
   * Returns the collections of <code>HttpListenerConfig</code> instances for
   * this context.
   *
   * @return {Array<HttpListenerConfig>} the collections of 
   *                                     <code>HttpListenerConfig</code>
   *                                     instances for this context.
   */
  public getHttpListenerConfigList():Array<HttpListenerConfig> {
    return this._bootstrap.config.http.listeners;
  }

  /**
   * Returns the GlassCat current locale.
   *
   * @return {string} the GlassCat current locale.
   */
  public getLocale():string {
    return this._bootstrap.glasscat.locale;
  }

  /**
   * Returns the path to the error template file.
   *
   * @return {string} the path to the error template file.
   */
  public getErrorPage():string {
    return this._errorPage;
  }
  
  /**
   * Returns the root path to this GlassCat server directory.
   *
   * @return {string} the root path to this GlassCat server directory.
   */
  public getRoot():string {
    return this._root;
  }
};
