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

import { TestSuite, Test, BeforeAll, AfterAll } from "jec-juta";
import { expect } from "chai";
import { BootstrapConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/BootstrapConfig";
import { GlasscatConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/GlasscatConfig";
import { ToolsConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/ToolsConfig";
import { LoggersConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/LoggersConfig";
import { LoggerFactoryConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/LoggerFactoryConfig";
import { HttpConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/HttpConfig";
import { HttpListenerConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/HttpListenerConfig";
import { HttpMonitoringConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/HttpMonitoringConfig";
import { SecurityConfig } from "../../../../../../../src/com/onsoft/glasscat/context/core/SecurityConfig";

// Class to test:
import { BootstrapConfigParser } from "../../../../../../../src/com/onsoft/glasscat/context/core/utils/BootstrapConfigParser";

// Utilities:
import * as utils from "../../../../../../../utils/test-utils/utilities/BootstrapConfigParserTestUtils";

@TestSuite({
  description: "Tests the com.onsoft.glasscat.context.core.utils.BootstrapConfigParser class methods."
})
export class BootstrapConfigParserTest {

  public config:BootstrapConfig = null;
  public parser:BootstrapConfigParser = null;
  
  @BeforeAll()
  public initConfig():void {
    let  configFile:any = utils.loadConfigFile();
    this.parser = new BootstrapConfigParser();
    this.config = this.parser.parse(configFile);
  }

  @AfterAll()
  public deleteConfig():void {
    this.config = null;
    this.parser = null;
  }

  @Test({
    description: "should return a valid BootstrapConfig object"
  })
  public parseBootstrapConfigTest():void {
    expect(this.config).to.be.an.instanceof(BootstrapConfig);
  }

  @Test({
    description: "should return a valid GlasscatConfig object"
  })
  public parseGlasscatConfigTest():void {
    expect(this.config.glasscat).to.be.an.instanceof(GlasscatConfig);
  }

  @Test({
    description: "should return the valid version of the GlasscatConfig object"
  })
  public parseGlasscatConfigVersionTest():void {
    expect(this.config.glasscat.version).to.equal(utils.GLASSCAT_VERSION);
  }

  @Test({
    description: "should return the valid locale of the GlasscatConfig object"
  })
  public parseGlasscatConfigLocaleTest():void {
    expect(this.config.glasscat.locale).to.equal(utils.GLASSCAT_LOCALE);
  }

  @Test({
    description: "should return a valid ToolsConfig object"
  })
  public parseToolsConfigTest():void {
    expect(this.config.config).to.be.an.instanceof(ToolsConfig);
  }
  
  @Test({
    description: "should return a valid LoggersConfig object"
  })
  public parseLoggersConfigTest():void {
    expect(this.config.config.loggers).to.be.an.instanceof(LoggersConfig);
  }
  
  @Test({
    description: "should return the valid log level of the LoggersConfig object"
  })
  public parseLoggersConfigLogLevelTest():void {
    expect(this.config.config.loggers.logLevel).to.equal(utils.LOG_LEVEL);
    let factories:LoggerFactoryConfig[] = this.config.config.loggers.factories;
    expect(factories).to.be.an("array");
    expect(factories).to.have.a.lengthOf(2);
  }
  
  @Test({
    description: "should return valid array of LoggerFactoryConfig objects"
  })
  public parseLoggerFactoryConfigTest():void {
    let factories:LoggerFactoryConfig[] = this.config.config.loggers.factories;
    expect(factories).to.be.an("array");
    expect(factories).to.have.a.lengthOf(2);
  }

  @Test({
    description: "should return the valid names for the LoggerFactoryConfig objects"
  })
  public parseLoggerFactoryConfigNameTest():void {
    let factory:LoggerFactoryConfig = this.config.config.loggers.factories[0];
    expect(factory.name).to.equal(utils.FACTORY_0.name);
    factory = this.config.config.loggers.factories[1];
    expect(factory.name).to.equal(utils.FACTORY_1.name);
  }

  @Test({
    description: "should return the valid log levels for the LoggerFactoryConfig objects"
  })
  public parseLoggerFactoryConfigLogeLevelTest():void {
    let factory:LoggerFactoryConfig = this.config.config.loggers.factories[0];
    expect(factory.logLevel).to.equal(utils.FACTORY_0.logLevel);
    factory = this.config.config.loggers.factories[1];
    expect(factory.logLevel).to.equal(utils.FACTORY_1.logLevel);
  }
  
  @Test({
    description: "should return the valid factory references for the LoggerFactoryConfig objects"
  })
  public parseLoggerFactoryConfigFactoryTest():void {
    let factory:LoggerFactoryConfig = this.config.config.loggers.factories[0];
    expect(factory.factory).to.equal(utils.FACTORY_0.factory);
    factory = this.config.config.loggers.factories[1];
    expect(factory.factory).to.equal(utils.FACTORY_1.factory);
  }

  @Test({
    description: "should return a valid HttpConfig object"
  })
  public parseHttpConfigTest():void {
    expect(this.config.config.http).to.be.an.instanceof(HttpConfig);
  }

  @Test({
    description: "should return valid array of HttpListenerConfig objects"
  })
  public parseHttpConfigListenersTest():void {
    let listeners:HttpListenerConfig[] = this.config.config.http.listeners;
    expect(listeners).to.be.an("array");
    expect(listeners).to.have.a.lengthOf(2);
  }

  @Test({
    description: "should return the valid id references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersIdTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.id).to.equal(utils.HTTP_LISTENER_CONFIG_0.id);
    listener = this.config.config.http.listeners[1];
    expect(listener.id).to.equal(utils.HTTP_LISTENER_CONFIG_1.id);
  }

  @Test({
    description: "should return the valid address references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersAddressTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.address).to.equal(utils.HTTP_LISTENER_CONFIG_0.address);
    listener = this.config.config.http.listeners[1];
    expect(listener.address).to.equal(utils.HTTP_LISTENER_CONFIG_1.address);
  }
  
  @Test({
    description: "should return the valid domain references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersDomainTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.domain).to.equal(utils.HTTP_LISTENER_CONFIG_0.domain);
    listener = this.config.config.http.listeners[1];
    expect(listener.domain).to.equal(utils.HTTP_LISTENER_CONFIG_1.domain);
  }
  
  @Test({
    description: "should return the valid port references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersPortTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.port).to.equal(utils.HTTP_LISTENER_CONFIG_0.port);
    listener = this.config.config.http.listeners[1];
    expect(listener.port).to.equal(utils.HTTP_LISTENER_CONFIG_1.port);
  }
  
  @Test({
    description: "should return the valid secured references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersSecuredTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.secured).to.equal(utils.HTTP_LISTENER_CONFIG_0.secured);
    listener = this.config.config.http.listeners[1];
    expect(listener.secured).to.equal(utils.HTTP_LISTENER_CONFIG_1.secured);
  }
  
  @Test({
    description: "should return the valid sslPath references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersSslPathTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.sslPath).to.equal(utils.HTTP_LISTENER_CONFIG_0.sslPath);
    listener = this.config.config.http.listeners[1];
    expect(listener.sslPath).to.equal(utils.HTTP_LISTENER_CONFIG_1.sslPath);
  }
  
  @Test({
    description: "should return the valid server references for the HttpListenerConfig objects"
  })
  public parseHttpConfigListenersServerTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.server).to.equal(utils.HTTP_LISTENER_CONFIG_0.server);
    listener = this.config.config.http.listeners[1];
    expect(listener.server).to.equal(utils.HTTP_LISTENER_CONFIG_1.server);
  }
  
  @Test({
    description: "should return valid HttpMonitoringConfig objects"
  })
  public parseHttpMonitoringConfigTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.monitoring).to.be.an.instanceOf(HttpMonitoringConfig);
    listener = this.config.config.http.listeners[1];
    expect(listener.monitoring).to.be.an.instanceOf(HttpMonitoringConfig);
  }

  @Test({
    description: "should return a valid enabled reference for the HttpMonitoringConfig objects"
  })
  public parseHttpMonitoringConfigEnabledTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.monitoring.enabled).to.equal(utils.MONITORING.enabled);
    listener = this.config.config.http.listeners[1];
    expect(listener.monitoring.enabled).to.be.false;
  }
  
  @Test({
    description: "should return a valid factory reference for the HttpMonitoringConfig objects"
  })
  public parseHttpMonitoringConfigFactoryTest():void {
    let listener:HttpListenerConfig = this.config.config.http.listeners[0];
    expect(listener.monitoring.factory).to.equal(utils.MONITORING.factory);
    listener = this.config.config.http.listeners[1];
    expect(listener.monitoring.factory).to.be.null;
  }

  @Test({
    description: "should return a valid SecurityConfig object"
  })
  public parseSecurityConfigTest():void {
    expect(this.config.config.security).to.be.an.instanceof(SecurityConfig);
  }
}
