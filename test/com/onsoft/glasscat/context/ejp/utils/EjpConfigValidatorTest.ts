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

import { TestSuite, Test, BeforeAll, Async } from "jec-juta";
import { expect } from "chai";
import { EjpConfigValidator } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/utils/EjpConfigValidator";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../../utils/test-utils/utilities/EjpConfigValidatorTestUtils";

@TestSuite({
  description: "Test the EjpConfigValidator validate method"
})
export class EjpConfigValidatorTest {
  
  public validator:EjpConfigValidator = null;

  @BeforeAll()
  public initTest():void {
    this.validator = new EjpConfigValidator();
  }

  @Test({
    description: "should return validate the specified EjpConfig object"
  })
  public validateTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildFullConfig(),
      (err:GlassCatError)=> {
        expect(err).to.be.null;
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.NULL_EJP_CONFIG'"
  })
  public validateNullTest(@Async done:Function):void {
    this.validator.validate(
      null,
      (err:GlassCatError)=> {
        expect(err.getCode()).to.equal(GlassCatErrorCode.NULL_EJP_CONFIG);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY'"
  })
  public validateMissignWebappTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildNoWebappConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY);
        done();
      }
    );
  }

  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY'"
  })
  public validateMissignNameTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildNoNameConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY'"
  })
  public validateWelcomeFileTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildNoWelcomeFileConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY);
        done();
      }
    );
  }

  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY'"
  })
  public validateContextRootTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildNoContextRootConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY);
        done();
      }
    );
  }

  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateEmptyContextRootTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildEmptyContextRootConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateInvalidStateTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInvalidStateConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateInvalidAuthMethodTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInvalidAuthMethodConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN'"
  })
  public validateInvalidFormConfigTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInvalidFormConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateNullRealmTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildValidLoginConfig(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateInvalidRealmTypeTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInValidRealmType(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_REALM'"
  })
  public validateInvalidRealmFactoryTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInValidRealmFactory(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_REALM);
        done();
      }
    );
  }
  
  @Test({
    description: "should return an error of the type of 'GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY'"
  })
  public validateInvalidSessionTest(@Async done:Function):void {
    this.validator.validate(
      utils.buildInValidSession(),
      (err:GlassCatError)=> {
        expect(
          err.getCode()
        ).to.equal(GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY);
        done();
      }
    );
  }
}