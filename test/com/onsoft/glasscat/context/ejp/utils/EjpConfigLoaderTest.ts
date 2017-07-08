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
import { expect, assert } from "chai";
import { EjpConfigLoader } from "../../../../../../../src/com/onsoft/glasscat/context/ejp/utils/EjpConfigLoader";
import { GlassCatError } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";

import * as utils from "../../../../../../../utils/test-utils/utilities/EjpConfigUtils";

@TestSuite({
  description: "Test the EjpConfigLoader class methods and properties"
})
export class EjpConfigLoaderTest {

  public loader:EjpConfigLoader = null;

  @BeforeAll()
  public initTest():void {
    this.loader = new EjpConfigLoader();
  }

  @Test({
    description: "should have a 'MANIFEST_PATH' static property equals to '/webapp/WEB-INF/web.json'"
  })
  public pathTest():void {
    expect(EjpConfigLoader.MANIFEST_PATH).to.equal(utils.MANIFEST_PATH);
  }

  @Test({
    description: "should return a valid object"
  })
  public loadSyncTest():void {
    let result:any = this.loader.loadSync(utils.VALID_PATH);
    expect(result).not.to.be.null;
  }

  @Test({
    description: "should throw a GlassCatError exception when config file does not exist"
  })
  public loadSyncInvalidPathErrorTest():void {
    let loadFile:Function = function():void {
      this.loader.loadSync(utils.INVALID_PATH);
    };
    expect(loadFile.bind(this)).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError exception with code 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'  when config file does not exist"
  })
  public loadSyncInvalidPathErrorCodeTest():void {
    try {
      this.loader.loadSync(utils.INVALID_PATH);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
    }
  }

  @Test({
    description: "should throw a GlassCatError exception when config file is not valid"
  })
  public loadSyncInvalidFileErrorTest():void {
    let loadFile:Function = function():void {
      this.loader.loadSync(utils.INVALID_FILE);
    };
    expect(loadFile.bind(this)).to.throw(GlassCatError);
  }
  
  @Test({
    description: "should throw a GlassCatError exception with code 'GlassCatErrorCode.CONFIG_LOADING_FAILURE'  when config file is  not valid"
  })
  public loadSyncInvalidFileErrorCodeTest():void {
    try {
      this.loader.loadSync(utils.INVALID_FILE);
    } catch (e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.CONFIG_LOADING_FAILURE);
    }
  }

  @Test({
    description: "should invoke the success coallback and pass a valid object as data parameter"
  })
  public loadTest(@Async done:Function):void {
    this.loader.load(
      utils.VALID_PATH,
      (data:any)=> {
        expect(data).not.to.be.null;
        done();
      },
      (error:GlassCatError)=> {
        assert.fail(null, error, "Test should not fail");
      }
    );
  }
  
  @Test({
    description: "should invoke the error callback when config file does not exist"
  })
  public loadInvalidPathErrorTest(@Async done:Function):void {
    this.loader.load(
      utils.INVALID_PATH,
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
    description: "should pass an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE' when config file does not exist"
  })
  public loadInvalidPathErrorCodeTest(@Async done:Function):void {
    this.loader.load(
      utils.INVALID_PATH,
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
    description: "should invoke the error callback when config file is not valid"
  })
  public loadInvalidFileErrorTest(@Async done:Function):void {
    this.loader.load(
      utils.INVALID_FILE,
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
    description: "should pass an error of the type of 'GlassCatErrorCode.CONFIG_LOADING_FAILURE' when config file is not valid"
  })
  public loadInvalidFileErrorCodeTest(@Async done:Function):void {
    this.loader.load(
      utils.INVALID_FILE,
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