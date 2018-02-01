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

import { TestSuite, Test, BeforeAll, Async } from "jec-juta";
import { expect, assert } from "chai";
import { GlassCatContext } from "../../../../../src/com/onsoft/glasscat/context/GlassCatContext";
import { BootstrapConfig } from "../../../../../src/com/onsoft/glasscat/context/core/BootstrapConfig";
import { BootstrapConfigParser } from "../../../../../src/com/onsoft/glasscat/context/core/utils/BootstrapConfigParser";
import { JsonLoader, JsonLoaderError, LogLevelUtil } from "jec-commons";
import { DefaultJsonLoader } from "jec-commons-node";
import * as path from "path";

@TestSuite({
  description: "Test the GlassCatContext class methods"
})
export class GlassCatContextTest {

  public context:GlassCatContext = null;
  public bootstrapFile:any = null;
  public config:BootstrapConfig = null;

  @BeforeAll()
  public initTest(@Async done:Function):void {
    let loader:JsonLoader = new DefaultJsonLoader();
    let configParser:BootstrapConfigParser = null;
    loader.load(
      process.cwd() + "/public/cfg/bootstrap.json",
      (data:any)=> {
        this.bootstrapFile = data;
        configParser = new BootstrapConfigParser();
        this.config = configParser.parse(data);
        this.context = new GlassCatContext(this.config);
        done();
      },
      (err:JsonLoaderError)=> {
        assert.fail(null, err, "Exception should not be thrown");
      }
    );
  }
  
  @Test({
    description: "should return the address as defined in the HTTP config context"
  })
  public httpConfigAdressTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].address
    ).to.equal(this.bootstrapFile.config.http.listeners[0].address);
  }

  @Test({
    description: "should return the ID as defined in the HTTP config context"
  })
  public httpConfigIdTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].id
    ).to.equal(this.bootstrapFile.config.http.listeners[0].id);
  }

  @Test({
    description: "should return the domain as defined in the HTTP config context"
  })
  public httpConfigDomainTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].domain
    ).to.equal(this.bootstrapFile.config.http.listeners[0].domain);
  }

  @Test({
    description: "should return the port as defined in the HTTP config context"
  })
  public httpConfigPortTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].port
    ).to.equal(this.bootstrapFile.config.http.listeners[0].port);
  }

  @Test({
    description: "should return the secured value as defined in the HTTP config context"
  })
  public httpConfigSecuredTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].secured
    ).to.equal(this.bootstrapFile.config.http.listeners[0].secured);
  }

  @Test({
    description: "should return the server as defined in the HTTP config context"
  })
  public httpConfigServerTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].server
    ).to.equal(this.bootstrapFile.config.http.listeners[0].server);
  }
  
  @Test({
    description: "should return the ssl path as defined in the HTTP config context"
  })
  public httpConfigSslPathTest():void {
    expect(
      this.context.getHttpListenerConfigList()[0].sslPath
    ).to.equal(this.bootstrapFile.config.http.listeners[0].sslPath);
  }

  @Test({
    description: "should return the same log level as defined in the config context"
  })
  public getLogLevelTest():void {
    let util:LogLevelUtil = new LogLevelUtil();
    expect(
      this.context.getLogLevel()
    ).to.equal(
      util.stringTogLevel(this.config.config.loggers.logLevel)
    );
  }

  @Test({
    description: "should return the same error page as defined in the config context"
  })
  public getErrorPageTest():void {
    expect(this.context.getErrorPage()).to.equal(
      path.normalize(this.bootstrapFile.config.errorPage)
    );
  }

  @Test({
    description: "should return the same locale as defined in the config context"
  })
  public getLocaleTest():void {
    expect(this.context.getLocale()).to.equal(this.config.glasscat.locale);
  }

  @Test({
    description: "should return the same version as defined in the config context"
  })
  public getVersionTest():void {
    expect(this.context.getVersion()).to.equal(this.config.glasscat.version);
  }

  @Test({
    description: "should return the current project path"
  })
  public getRootTest():void {
    expect(this.context.getRoot()).to.equal(process.cwd());
  }
}