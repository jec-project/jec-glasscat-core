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
import * as chai from "chai";
import * as spies from "chai-spies";
import { DefaultTemplateProcessor } from "../../../../../src/com/onsoft/glasscat/templates/DefaultTemplateProcessor";
import { HttpRequest, HttpResponse } from "jec-exchange";

import * as utils from "../../../../../utils/test-utils/utilities/TemplateProcessorTesttUtils";

// Chai declarations:
const expect = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the DefaultTemplateProcessor class methods"
})
export class DefaultTemplateProcessorTest {

  public processor:DefaultTemplateProcessor = null;
  public request:HttpRequest = null;
  public response:HttpResponse = null;
  public data:any = null;

  public static result:any = null;

  @BeforeAll()
  public initTest():void {
    this.processor = new DefaultTemplateProcessor();
    this.response = ( 
      { 
        end: function(result:any) {
          DefaultTemplateProcessorTest.result = result;
        } 
      } as HttpResponse );
  }

  @Test({
    description: "should invoke the end() method of the HttpResponse object with 'null' as parameter"
  })
  public renderFileInvalidPathTest():void {
    let spy:any = chai.spy.on(this.response, "end");
    this.processor.renderFile(
      utils.INVALID_PATH, utils.DATA, this.request, this.response
    );
    expect(spy).to.have.been.called.with(null);
  }
  
  @Test({
    description: "should invoke the end() method of the HttpResponse object with the rendered file as parameter"
  })
  public renderFileValidPathTest():void {
    let spy:any = chai.spy.on(this.response, "end");
    this.processor.renderFile(
      utils.VALID_PATH, utils.DATA, this.request, this.response
    );
    expect(spy).to.have.been.called.with(DefaultTemplateProcessorTest.result);
    expect(DefaultTemplateProcessorTest.result).to.not.be.null;
  }
  
  @Test({
    description: "should reder correctly the specified data"
  })
  public renderingTest():void {
    this.processor.renderFile(
      utils.VALID_PATH, utils.DATA, this.request, this.response
    );
    expect(DefaultTemplateProcessorTest.result).to.include(utils.RENDERED_DATA);
  }
}