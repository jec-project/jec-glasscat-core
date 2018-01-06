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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { DomainState } from "../../../../../../src/com/onsoft/glasscat/domains/containers/DomainState";

import * as utils from "../../../../../../utils/test-utils/utilities/DomainStateTestUtils";

@TestSuite({
  description: "Test the DomainState class constants"
})
export class DomainStateTest {

  @Test({
    description: "DomainState.STATEFUL should be equal to 'stateful'"
  })
  public STATEFULTest():void {
    expect(DomainState.STATEFUL).to.equal(utils.STATEFUL);
  }
  
  @Test({
    description: "DomainState.STATELESS should be equal to 'stateless'"
  })
  public STATELESSTest():void {
    expect(DomainState.STATELESS).to.equal(utils.STATELESS);
  }
}