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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { EjpConfigParser } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/utils/EjpConfigParser";
import { EjpConfigLoader } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/utils/EjpConfigLoader";
import { EjpConfig, EjpBootstrapConfig, EjpResourceMapperConfig, EjpLoginConfig,
         EjpSecurityConfig, EjpRoleConfig, EjpConstraintConfig } from "jec-glasscat-config";
import { EjpConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpConfigImpl";
import { EjpWebAppConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpWebAppConfigImpl";
import { EjpBootstrapConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpBootstrapConfigImpl";
import { EjpSessionConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpSessionConfigImpl";
import { EjpResourceMapperConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpResourceMapperConfigImpl";
import { EjpLoginConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpLoginConfigImpl";
import { EjpFormConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpFormConfigImpl";
import { EjpRealmConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpRealmConfigImpl";
import { EjpSecurityConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpSecurityConfigImpl";
import { EjpRoleConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpRoleConfigImpl";
import { EjpStaticResourcesConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpStaticResourcesConfigImpl";
import {  EjpConstraintConfigImpl } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/EjpConstraintConfigImpl";

import * as utils from "../../../../../../../utils/test-utils/utilities/EjpConfigUtils";

@TestSuite({
  description: "Test the EjpConfigParser class methods"
})
export class EjpConfigParserTest {

  public parsedFile:EjpConfig = null;

  @BeforeAll()
  public initTest():void {
    let loader:EjpConfigLoader = new EjpConfigLoader();
    let parser:EjpConfigParser = new EjpConfigParser();
    let result:any = loader.loadSync(utils.VALID_PATH);
    this.parsedFile = parser.parse(result);
  }

  @Test({
    description: "should return an instance of the 'EjpConfig' class"
  })
  public parseTest():void {
    expect(this.parsedFile).to.be.an.instanceOf(EjpConfigImpl);
  }
  
  @Test({
    description: "should define an 'EjpWebAppConfig' instance"
  })
  public webappTest():void {
    expect(this.parsedFile.webapp).to.be.an.instanceOf(EjpWebAppConfigImpl);
  }
  
  @Test({
    description: "should define a 'name' property correctly set"
  })
  public webappNameTest():void {
    expect(this.parsedFile.webapp.name).to.equal(utils.WEBAPP_NAME);
  }
  
  @Test({
    description: "should define a 'contextRoot' property correctly set"
  })
  public webappContextrootTest():void {
    expect(
      this.parsedFile.webapp.contextRoot
    ).to.equal(utils.WEBAPP_CONTEXTROOT);
  }

  @Test({
    description: "should define a 'welcomeFile' property correctly set"
  })
  public webappWelcomeFileTest():void {
    expect(
      this.parsedFile.webapp.welcomeFile
    ).to.equal(utils.WEBAPP_WELCOMEFILE);
  }
  
  @Test({
    description: "should define a 'description' property correctly set"
  })
  public webappDescriptionTest():void {
    expect(
      this.parsedFile.webapp.description
    ).to.equal(utils.WEBAPP_DESCRIPTION);
  }
  
  @Test({
    description: "should define a 'version' property correctly set"
  })
  public webappVersionTest():void {
    expect(this.parsedFile.webapp.version).to.equal(utils.WEBAPP_VERSION);
  }
  
  @Test({
    description: "should define a 'author' property correctly set"
  })
  public webappAuthorTest():void {
    expect(this.parsedFile.webapp.author).to.equal(utils.WEBAPP_AUTHOR);
  }
  
  @Test({
    description: "should define a 'state' property correctly set"
  })
  public webappStateTest():void {
    expect(this.parsedFile.webapp.state).to.equal(utils.WEBAPP_STATE);
  }
  
  @Test({
    description: "should define a 'bootstrap' property of type of array"
  })
  public bootstrapTest():void {
    expect(this.parsedFile.webapp.bootstrap).to.have.a.lengthOf(1);
  }
  
  @Test({
    description: "should define an 'EjpBootstrapConfig' instance"
  })
  public EjpBootstrapConfigTest():void {
    expect(
      this.parsedFile.webapp.bootstrap[0]
    ).to.be.an.instanceOf(EjpBootstrapConfigImpl);
  }
  
  @Test({
    description: "should define a 'path' property correctly set"
  })
  public bootstrapPathTest():void {
    const bootstrapCfg:EjpBootstrapConfig = this.parsedFile.webapp.bootstrap[0];
    expect(bootstrapCfg.path).to.equal(utils.BOOTSTRAP_PATH);
  }
  
  @Test({
    description: "should define a 'priority' property correctly set"
  })
  public bootstrapPriorityTest():void {
    const bootstrapCfg:EjpBootstrapConfig = this.parsedFile.webapp.bootstrap[0];
    expect(bootstrapCfg.priority).to.equal(utils.BOOTSTRAP_PRIORITY);
  }
  
  @Test({
    description: "should define an 'EjpSessionConfig' instance"
  })
  public sessionTest():void {
    expect(this.parsedFile.webapp.session).to.be.an
                                          .instanceOf(EjpSessionConfigImpl);
  }
  
  @Test({
    description: "should define a 'errorUrl' property correctly set"
  })
  public sessionErrorUrlTest():void {
    expect(this.parsedFile.webapp.session.errorUrl).to
                                                .equal(utils.SESSION_ERROR_URL);
  }
  
  @Test({
    description: "should define a 'storage' property correctly set"
  })
  public sessionStorageTest():void {
    expect(this.parsedFile.webapp.session.storage).to
                                                  .equal(utils.SESSION_STORAGE);
  }
  
  @Test({
    description: "should define a 'maxAge' property correctly set"
  })
  public sessionMaxAgeTest():void {
    expect(this.parsedFile.webapp.session.maxAge).to
                                                  .equal(utils.SESSION_MAX_AGE);
  }
  
  @Test({
    description: "should define a 'resourceMap' property of type of array"
  })
  public resourceMapTest():void {
    expect(this.parsedFile.webapp.resourceMap).to.have.a.lengthOf(1);
  }
  
  @Test({
    description: "should define an 'EjpResourceMapperConfig' instance"
  })
  public EjpResourceMapperConfigTest():void {
    expect(
      this.parsedFile.webapp.resourceMap[0]
    ).to.be.an.instanceOf(EjpResourceMapperConfigImpl);
  }
  
  @Test({
    description: "should define a 'name' property correctly set"
  })
  public resourceMapNameTest():void {
    const resourceMap:EjpResourceMapperConfig =
                                          this.parsedFile.webapp.resourceMap[0];
    expect(resourceMap.name).to.equal(utils.RESOURCEMAP_NAME);
  }
  
  @Test({
    description: "should define a 'value' property correctly set"
  })
  public resourceMapValueTest():void {
    const resourceMap:EjpResourceMapperConfig =
                                          this.parsedFile.webapp.resourceMap[0];
    expect(resourceMap.value).to.equal(utils.RESOURCEMAP_VALUE);
  }

  @Test({
    description: "should define an 'EjpLoginConfig' instance"
  })
  public loginTest():void {
    expect(
      this.parsedFile.webapp.login
    ).to.be.an.instanceOf(EjpLoginConfigImpl);
  }
  
  @Test({
    description: "should define a 'authMethod' property correctly set"
  })
  public loginAuthMethodTest():void {
    expect(this.parsedFile.webapp.login.authMethod).to
                                                .equal(utils.LOGIN_AUTH_METHOD);
  }
  
  @Test({
    description: "should define an 'EjpFormConfig' instance"
  })
  public formConfigTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.formConfig).to.be.an.instanceOf(EjpFormConfigImpl);
  }

  @Test({
    description: "should define a 'errorUrl' property correctly set"
  })
  public formConfigErrorUrlTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.formConfig.errorUrl).to.equal(utils.FORM_CONFIG_ERROR_URL);
  }

  @Test({
    description: "should define a 'loginUrl' property correctly set"
  })
  public formConfigLoginUrlTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.formConfig.loginUrl).to.equal(utils.FORM_CONFIG_LOGIN_URL);
  }
  
  @Test({
    description: "should define an 'EjpRealmConfig' instance"
  })
  public realmTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.realm).to.be.an.instanceOf(EjpRealmConfigImpl);
  }
  
  @Test({
    description: "should define a 'type' property correctly set"
  })
  public realmTypeTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.realm.type).to.equal(utils.REALM_TYPE);
  }

  @Test({
    description: "should define a 'securedArea' property correctly set"
  })
  public realmSecuredAreaTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.realm.securedArea).to.equal(utils.REALM_SECURED_AREA);
  }
  
  @Test({
    description: "should define a 'connectorFactory' property correctly set"
  })
  public realmConnectorFactoryTest():void {
    const login:EjpLoginConfig = this.parsedFile.webapp.login;
    expect(login.realm.connectorFactory).to
                                        .equal(utils.REALM_CONNECTOR_FACTORY);
  }
  
  @Test({
    description: "should define an 'EjpSecurityConfig' instance"
  })
  public securityTest():void {
    expect(
      this.parsedFile.webapp.security
    ).to.be.an.instanceOf(EjpSecurityConfigImpl);
  }
  
  @Test({
    description: "should define a 'roles' property of type of array"
  })
  public rolesTest():void {
    expect(this.parsedFile.webapp.security.roles).to.have.a.lengthOf(1);
  }
  
  @Test({
    description: "should define an 'EjpRoleConfig' instance"
  })
  public EjpRoleConfigTest():void {
    const security:EjpSecurityConfig = this.parsedFile.webapp.security;
    expect(security.roles[0]).to.be.an.instanceOf(EjpRoleConfigImpl);
  }
  
  @Test({
    description: "should define a 'name' property correctly set"
  })
  public roleNameTest():void {
    const role:EjpRoleConfig = this.parsedFile.webapp.security.roles[0];
    expect(role.name).to.equal(utils.ROLE_NAME);
  }
  
  @Test({
    description: "should define a 'path' property correctly set"
  })
  public rolePathTest():void {
    const role:EjpRoleConfig = this.parsedFile.webapp.security.roles[0];
    expect(role.path).to.equal(utils.ROLE_PATH);
  }
  
  
  @Test({
    description: "should define a 'staticResources' property of type of array"
  })
  public staticResourcesTest():void {
    expect(this.parsedFile.webapp.security.staticResources).to.have
                                                           .a.lengthOf(3);
  }
  
  @Test({
    description: "should define 'EjpStaticResourcesConfig' instances"
  })
  public EjpStaticResourcesConfigTest():void {
    this.parsedFile.webapp.security.staticResources.forEach(element => {
      expect(element).to.be.an.instanceOf(EjpStaticResourcesConfigImpl);
    });
  }
  
  @Test({
    description: "should define 'urlPattern' properties correctly set"
  })
  public staticResourcesUrlPatternTest():void {
    this.parsedFile.webapp.security.staticResources.forEach(element => {
      expect(utils.RESOURCES_URL_PATTERNS).to.include(element.urlPattern);
    });
  }
  
  @Test({
    description: "should define a 'constraints' property of type of array"
  })
  public constraintsTest():void {
    expect(this.parsedFile.webapp.security.constraints).to.have.a.lengthOf(1);
  }
  
  @Test({
    description: "should define an 'EjpConstraintConfig' instance"
  })
  public EjpSecurityConfigTest():void {
    const security:EjpSecurityConfig = this.parsedFile.webapp.security;
    expect(
      security.constraints[0]
    ).to.be.an.instanceOf(EjpConstraintConfigImpl);
  }
  
  @Test({
    description: "should define a 'name' property correctly set"
  })
  public constraintNameTest():void {
    const constraint:EjpConstraintConfig =
                                 this.parsedFile.webapp.security.constraints[0];
    expect(constraint.name).to.equal(utils.CONSTRAINT_NAME);
  }
  
  @Test({
    description: "should define a 'role' property of type of array"
  })
  public constraintRoleTest():void {
    const constraint:EjpConstraintConfig =
                                 this.parsedFile.webapp.security.constraints[0];
    expect(constraint.roles).to.have.a.lengthOf(1);
  }

  @Test({
    description: "should define a 'role' value correctly set"
  })
  public constraintRoleValueTest():void {
    const constraint:EjpConstraintConfig =
                                 this.parsedFile.webapp.security.constraints[0];
    expect(constraint.roles[0]).to.equal(utils.CONSTRAINT_ROLE);
  }

  @Test({
    description: "should define a 'errorUrl' property correctly set"
  })
  public constraintErrorUrlTest():void {
    const constraint:EjpConstraintConfig =
                                 this.parsedFile.webapp.security.constraints[0];
    expect(constraint.errorUrl).to.equal(utils.CONSTRAINT_ERROR_URL);
  }
  
  @Test({
    description: "should define a 'urlPattern' property correctly set"
  })
  public constraintUrlPatternTest():void {
    const constraint:EjpConstraintConfig =
                                 this.parsedFile.webapp.security.constraints[0];
    expect(constraint.urlPattern).to.equal(utils.CONSTRAINT_URL_PATTERN);
  }
}