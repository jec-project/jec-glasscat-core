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

import {BootstrapConfig} from "../BootstrapConfig";
import {GlasscatConfig} from "../GlasscatConfig";
import {ToolsConfig} from "../ToolsConfig";
import {LoggersConfig} from "../LoggersConfig";
import {LoggerFactoryConfig} from "../LoggerFactoryConfig";
import {HttpConfig} from "../HttpConfig";
import {HttpListenerConfig} from "../HttpListenerConfig";
import {HttpMonitoringConfig} from "../HttpMonitoringConfig";
import {SecurityConfig} from "../SecurityConfig";

/**
 * A parser utility for creating GlassCat <code>BootstrapConfig</code> instances
 * from a loaded boostrap configuration file.
 */
export class BootstrapConfigParser {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapConfigParser</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Parses the <code>glasscat</code> property and returns a new 
   * <code>GlasscatConfig</code> instance.
   * 
   * @param {Object} bootstrap the data loaded from a boostrap configuration
   *                           file.
   * @return {GlasscatConfig} a <code>GlasscatConfig</code> instance built from 
   *                          the specified data.
   */
  private parseGlasscatConfig(bootstrap:any):GlasscatConfig {
    let cfg:GlasscatConfig = new GlasscatConfig();
    let glasscat:any = bootstrap.glasscat;
    cfg.version = glasscat.version;
    cfg.locale = glasscat.locale;
    return cfg;
  }

  /**
   * Parses the <code>config</code> property and returns a new 
   * <code>ToolsConfig</code> instance.
   * 
   * @param {Object} bootstrap the data loaded from a boostrap configuration
   *                           file.
   * @return {ToolsConfig} a <code>ToolsConfig</code> instance built from the 
   *                       specified data.
   */
  private parseToolsConfig(bootstrap:any):ToolsConfig {
    let cfg:ToolsConfig = new ToolsConfig();
    let config:any = bootstrap.config;
    cfg.loggers = this.parseLoggersConfig(config.loggers);
    cfg.http = this.parseHttpConfig(config.http);
    cfg.security = this.parseSecurityConfig(config.security);
    cfg.errorPage = config.errorPage;
    return cfg;
  }

  /**
   * Parses a property from the <code>http.listeners</code> array and returns a 
   * new <code>HttpListenerConfig</code> instance.
   * 
   * @param {Object} httpListener the HTTP listener data loaded from a boostrap
   *                              configuration file.
   * @return {HttpListenerConfig} a <code>HttpListenerConfig</code> instance 
   *                              built from the specified data.
   */
  private parserHttpListener(httpListener:any):HttpListenerConfig {
    let listener:HttpListenerConfig = new HttpListenerConfig();
    listener.id = httpListener.id;
    listener.address = httpListener.address;
    listener.domain = httpListener.domain;
    listener.port = httpListener.port;
    listener.secured = httpListener.secured;
    listener.sslPath = httpListener.sslPath;
    listener.server = httpListener.server;
    listener.monitoring = this.parseHttpMonitoring(httpListener.monitoring);
    return listener;
  }

  /**
   * Parses the <code>monitoring</code> property and returns a new
   * <code>HttpMonitoringConfig</code> instance.
   * 
   * @param {Object} monitoring the HTTP listener monitoring data loaded from a 
   *                            boostrap configuration file.
   * @return {HttpMonitoringConfig} a <code>HttpMonitoringConfig</code> instance  
   *                                built from the specified data.
   */
  private parseHttpMonitoring(monitoring:any):HttpMonitoringConfig {
    let cfg:HttpMonitoringConfig = new HttpMonitoringConfig();
    if(monitoring) {
      cfg.enabled = monitoring.enabled;
      cfg.factory = monitoring.factory;
    }
    return cfg;
  }

  /**
   * Parses the <code>http</code> property and returns a new 
   * <code>HttpConfig</code> instance.
   * 
   * @param {Object} httpData the data loaded from a boostrap configuration
   *                          file.
   * @return {HttpConfig} a <code>HttpConfig</code> instance built from the 
   *                      specified data.
   */
  private parseHttpConfig(httpData:any):HttpConfig {
    let cfg:HttpConfig = new HttpConfig();
    let listeners:HttpListenerConfig[] = new Array<HttpListenerConfig>();
    let httpListeners:any[] = httpData.listeners;
    let listener:HttpListenerConfig = null;
    let len:number = -1;
    if(httpListeners) {
      len = httpListeners.length;
      while(len--) {
        listener = this.parserHttpListener(httpListeners[len]);
        listeners.push(listener);
      }
    }
    cfg.listeners = listeners;
    return cfg;
  }

  /**
   * Parses the <code>loggers</code> property and returns a new 
   * <code>LoggersConfig</code> instance.
   * 
   * @param {Object} loggers the data loaded from a boostrap configuration
   *                           file.
   * @return {LoggersConfig} a <code>LoggersConfig</code> instance built from  
   *                         the specified data.
   */
  private parseLoggersConfig(loggers:any):LoggersConfig {
    let cfg:LoggersConfig = new LoggersConfig();
    let factories:any[] = loggers.factories;
    let rawFactory:any = null;
    let factory:LoggerFactoryConfig = null;
    let len:number = -1;
    cfg.logLevel = loggers.logLevel;
    if(factories) {
      cfg.factories = new Array<LoggerFactoryConfig>();
      len = factories.length;
      while(len--){
        factory = new LoggerFactoryConfig();
        rawFactory = factories[len];
        factory.name = rawFactory.name;
        factory.logLevel = rawFactory.logLevel;
        factory.factory = rawFactory.factory;
        cfg.factories.push(factory);
      }
    }
    return cfg;
  }

  /**
   * Parses the <code>security</code> property and returns a new 
   * <code>SecurityConfig</code> instance.
   * 
   * @param {Object} security the data loaded from a boostrap configuration
   *                           file.
   * @return {SecurityConfig} a <code>SecurityConfig</code> instance built from  
   *                          the specified data.
   */
  private parseSecurityConfig(security:any):SecurityConfig {
    let cfg:SecurityConfig = new SecurityConfig();
    return cfg;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses data loaded from a boostrap configuration file and returns the
   * <code>BootstrapConfig</code> instance built from the specified data.
   * 
   * @param {Object} bootstrap the data loaded from a boostrap configuration
   *                           file.
   * @return {BootstrapConfig} a <code>BootstrapConfig</code> instance built 
   *                           from the specified data.
   */
  public parse(bootstrap:any):BootstrapConfig {
    let cfg:BootstrapConfig = new BootstrapConfig();
    cfg.glasscat = this.parseGlasscatConfig(bootstrap);
    cfg.config = this.parseToolsConfig(bootstrap);
    return cfg;
  }
}
