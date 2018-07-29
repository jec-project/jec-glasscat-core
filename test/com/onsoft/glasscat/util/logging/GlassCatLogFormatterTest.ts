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
import { GlassCatLogFormatter } from "../../../../../../src/com/onsoft/glasscat/util/logging/GlassCatLogFormatter";

import * as utils from "../../../../../../utils/test-utils/utilities/GlassCatLogFormatterTestUtils"; 

@TestSuite({
  description: "Test the GlassCatLogFormatter class methods and properties"
})
export class GlassCatLogFormatterTest {

  public formatter:GlassCatLogFormatter = null;

  @BeforeAll()
  public initTest():void {
    this.formatter = new GlassCatLogFormatter();
  }
  
  @Test({
    description: "should have a 'appender' property set to '\n'"
  })
  public appenderTest():void {
    expect(this.formatter).to.have.property("appender", utils.APPENDER);
  }
  
  @Test({
    description: "should have a 'timeFormat' property set to 'MM/DD/YY HH:mm:ss.SSS'"
  })
  public timeFormatTest():void {
    expect(this.formatter).to.have.property("timeFormat", utils.TIME_FORMAT);
  }
  
  @Test({
    description: "should format a log message correctly"
  })
  public formatTest():void {
    const result:string = this.formatter.format(
      utils.LOG_LEVEL,
      utils.MARKER
    );
    expect(utils.FORMAT_RESULT.test(result)).to.be.true;
  }
  
  @Test({
    description: "should format a log message with the 'appender' character at the end"
  })
  public apperderTest():void {
    const result:string = this.formatter.format(
      utils.LOG_LEVEL,
      utils.MARKER,
      true
    );
    expect(utils.FORMAT_RESULT.test(result)).to.be.true;
    expect(result).to.include(this.formatter.appender);
  }
}