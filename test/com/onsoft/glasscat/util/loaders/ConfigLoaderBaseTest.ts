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

import { TestSuite, Test, BeforeAll, AfterAll, Async } from "jec-juta";
import { expect, assert } from "chai";
import { ConfigLoaderBaseImpl } from "../../../../../../utils/test-utils/classes/ConfigLoaderBaseImpl";
import { MappedPathUtil } from "../../../../../../src/com/onsoft/glasscat/util/paths/MappedPathUtil";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../utils/test-utils/utilities/ConfigLoaderBaseTestUtils";

@TestSuite({
  description: "Test the ConfigLoaderBase class template methods"
})
export class ConfigLoaderBaseTest {

  private loader:ConfigLoaderBaseImpl = null;

  @BeforeAll()
  public initTest():void {
    this.loader = new ConfigLoaderBaseImpl();
    MappedPathUtil.getInstance().init(process.cwd());
  }

  @AfterAll()
  public resetTest():void {
    this.loader = null;
    MappedPathUtil.getInstance().init(null);
  }

  @Test({
    description: "should load and return a valid JavaScript Object that contains domains information"
  })
  public loadConfigSyncTest():void {
    const result:any = this.loader.loadConfigSyncImpl(utils.VALID_CONFIG_PATH);
    expect(result.domains).to.have.lengthOf(1);
  }

  @Test({
    description: "should throw an error when the path to the congiguration file is not valid"
  })
  public loadConfigSyncInvalidPathTest():void {
    const loadInvalidDomain:Function = function():void {
      this.loader.loadConfigSyncImpl(utils.INVALID_PATH);
    };
    expect(loadInvalidDomain.bind(this)).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'"
  })
  public loadConfigSyncInvalidPathErrorTest():void {
    try {
      this.loader.loadConfigSyncImpl(utils.INVALID_PATH);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
    }
  }

  @Test({
    description: "should throw an error when the congiguration file does not contain a valid object"
  })
  public loadConfigSyncInvalidFileTest():void {
    const loadInvalidDomain:Function = function():void {
      this.loader.loadConfigSyncImpl(utils.INVALID_CONFIG_PATH);
    };
    expect(loadInvalidDomain.bind(this)).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'"
  })
  public loadConfigSyncInvalidFileErrorTest():void {
    try {
      this.loader.loadConfigSyncImpl(utils.INVALID_CONFIG_PATH);
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
    }
  }
  
  @Test({
    description: "should load and return a valid JavaScript Object that contains domains information"
  })
  public loadConfigTest(@Async done:Function):void {
    this.loader.loadConfigImpl(utils.VALID_CONFIG_PATH,
      (data:any)=> {
        expect(data.domains).to.have.lengthOf(1);
        done();
      },
      (error:GlassCatError)=> {
        assert.fail(null, error, "Exception should not be thrown");
      }
    );
  }

  @Test({
    description: "should invoke the error callback when the path to the congiguration file is not valid"
  })
  public loadConfigInvalidPathTest(@Async done:Function):void {
    this.loader.loadConfigImpl(utils.INVALID_PATH,
      (data:any)=> {
        assert.fail(null, data, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(error).not.to.be.null;
        done();
      }
    );
  }

  @Test({
    description: "should pass an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'"
  })
  public loadConfigInvalidPathErrorTest(@Async done:Function):void {
    this.loader.loadConfigImpl(utils.INVALID_PATH,
      (data:any)=> {
        assert.fail(null, data, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(error.getCode()).to
                               .equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
        done();
      }
    );
  }

  @Test({
    description: "should invoke the error callback when the congiguration file does not contain a valid object"
  })
  public loadConfigInvalidFileTest(@Async done:Function):void {
    this.loader.loadConfigImpl(utils.INVALID_CONFIG_PATH,
      (data:any)=> {
        assert.fail(null, data, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(error).not.to.be.null;
        done();
      }
    );
  }

  @Test({
    description: "should pass an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'"
  })
  public loadConfigInvalidFileErrorTest(@Async done:Function):void {
    this.loader.loadConfigImpl(utils.INVALID_CONFIG_PATH,
      (data:any)=> {
        assert.fail(null, data, "Test should fail");
      },
      (error:GlassCatError)=> {
        expect(error.getCode()).to
                               .equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
        done();
      }
    );
  }
}