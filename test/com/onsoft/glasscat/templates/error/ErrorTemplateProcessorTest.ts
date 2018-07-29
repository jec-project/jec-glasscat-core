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
import * as sinon from "sinon";
import { ErrorTemplateProcessor } from "../../../../../../src/com/onsoft/glasscat/templates/error/ErrorTemplateProcessor";
import { GlassCatError } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../../../../../src/com/onsoft/glasscat/exceptions/GlassCatErrorCode";
import { HttpRequest, HttpResponse } from "jec-exchange";

import * as utils from "../../../../../../utils/test-utils/utilities/TemplateProcessorTesttUtils";

@TestSuite({
  description: "Test the ErrorTemplateProcessor class methods"
})
export class ErrorTemplateProcessorTest {

  public request:HttpRequest = null;
  public response:HttpResponse = null;
  public data:any = null;
  public statusSpy:any = null;
  public endSpy:any = null;

  public static result:any = null;

  @BeforeAll()
  public initTest():void {
    this.response = ( 
      { 
        end: function(result:any) {
          ErrorTemplateProcessorTest.result = result;
        },
        status: function(statusCode:number) {} 
      } as HttpResponse );
    this.statusSpy = sinon.spy(this.response, "status");
    this.endSpy = sinon.spy(this.response, "end");
  }

  @AfterAll()
  public resetTest():void {
    sinon.restore();
    this.statusSpy = null;
    this.endSpy = null;
  }

  @Test({
    description: "should throw a GlassCatError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new ErrorTemplateProcessor();
    };
    expect(buildInstance).to.throw(GlassCatError);
  }

  @Test({
    description: "should throw a GlassCatError error of the type of GlassCatErrorCode.SINGLETON_ERROR when calling the constructor function"
  })
  public singletonErrorCodeTest():void {
    try {
      new ErrorTemplateProcessor();
    } catch(e) {
      expect(e.getCode()).to.equal(GlassCatErrorCode.SINGLETON_ERROR);
    }
  }

  @Test({
    description: "should return a ErrorTemplateProcessor instance"
  })
  public getInstanceTest():void {
    const processor:ErrorTemplateProcessor =
                                           ErrorTemplateProcessor.getInstance();
    expect(processor).to.be.an.instanceOf(ErrorTemplateProcessor);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    const proc1:ErrorTemplateProcessor = ErrorTemplateProcessor.getInstance();
    const proc2:ErrorTemplateProcessor = ErrorTemplateProcessor.getInstance();
    expect(proc1).to.equal(proc2);
  }
  
  @Test({
    description: "should invoke the end() method of the HttpResponse object with 'null' as parameter"
  })
  public renderFileInvalidPathTest():void {
    ErrorTemplateProcessor.getInstance().renderFile(
      utils.INVALID_PATH, utils.DATA, this.request, this.response
    );
    sinon.assert.calledWith(this.endSpy, null);
  }
  
  @Test({
    description: "should invoke the status() method with the specified data status"
  })
  public statusInvalidPathTest():void {
    ErrorTemplateProcessor.getInstance().renderFile(
      utils.INVALID_PATH, utils.DATA, this.request, this.response
    );
    sinon.assert.calledWith(this.statusSpy, utils.DATA.status);
  }
  
  @Test({
    description: "should invoke the end() method of the HttpResponse object with the rendered file as parameter"
  })
  public renderFileValidPathTest():void {
    ErrorTemplateProcessor.getInstance().renderFile(
      utils.VALID_PATH, utils.DATA, this.request, this.response
    );
    sinon.assert.calledWith(this.endSpy, ErrorTemplateProcessorTest.result);
    expect(ErrorTemplateProcessorTest.result).to.not.be.null;
  }
  
  @Test({
    description: "should invoke the status() method with the specified data status"
  })
  public statusValidPathTest():void {
    
    ErrorTemplateProcessor.getInstance().renderFile(
      utils.INVALID_PATH, utils.DATA, this.request, this.response
    );
    sinon.assert.calledWith(this.statusSpy, utils.DATA.status);
  }
  
  @Test({
    description: "should reder correctly the specified data"
  })
  public renderingTest():void {
    ErrorTemplateProcessor.getInstance().renderFile(
      utils.VALID_PATH, utils.DATA, this.request, this.response
    );
    expect(ErrorTemplateProcessorTest.result).to.include(utils.RENDERED_STATUS);
  }
}