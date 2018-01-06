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
import { CacheableFile } from "../../../../../../src/com/onsoft/glasscat/context/files/CacheableFile";

@TestSuite({
  description: "Test the CacheableFile class properties"
})
export class CacheableFileTest {

  public config:CacheableFile = null;

  @BeforeAll()
  public initTest():void {
    this.config = new CacheableFile();
  }

  @Test({
    description: "should have a 'file' property set to 'null'"
  })
  public fileTest():void {
    expect(this.config).to.have.property("file", null);
  }
  
  @Test({
    description: "should have a 'sourcePath' property set to 'null'"
  })
  public sourcePathTest():void {
    expect(this.config).to.have.property("sourcePath", null);
  }
}