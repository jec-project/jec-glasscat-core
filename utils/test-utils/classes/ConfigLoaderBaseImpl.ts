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

import {ConfigLoaderBase} from "../../../src/com/onsoft/glasscat/util/loaders/ConfigLoaderBase";
import {GlassCatError} from "../../../src/com/onsoft/glasscat/exceptions/GlassCatError";

export class ConfigLoaderBaseImpl extends ConfigLoaderBase {

  constructor() {
    super();
  }

  public loadConfigSyncImpl(filePath:string):any {
    return this.loadConfigSync(filePath);
  }
  
  public loadConfigImpl(filePath:string, success:(data:any)=>void,
                                         error:(err:GlassCatError)=>void):void {
    this.loadConfig(filePath, success, error);
  }
}