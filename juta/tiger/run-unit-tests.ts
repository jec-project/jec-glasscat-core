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

import { TestStats } from "jec-juta";
import { Tiger, TigerFactory } from "jec-tiger";

let factory:TigerFactory = new TigerFactory();
let tiger:Tiger = factory.create();
tiger.process((stats:TestStats)=> {
  if(stats.error) console.error(stats.error);
  else {
    console.log(
`Test stats:
- test lookup process duration: ${stats.time}
- number of test suites: ${stats.numTestSuites}
- number of disabled test suites: ${stats.numDisabledTestSuites}
- number of synchronous test cases: ${stats.numTests}
- number of asynchronous test cases: ${stats.numAsyncTests}
- number of disabled test cases: ${stats.numDisabledTests}`
    );
  }
});