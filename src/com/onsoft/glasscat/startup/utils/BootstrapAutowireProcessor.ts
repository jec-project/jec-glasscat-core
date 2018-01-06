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

import {LoggerManager} from "../../util/logging/LoggerManager";
import {GlassCatLocaleManager} from "../../i18n/GlassCatLocaleManager";
import {DomainContainer} from "../../domains/containers/DomainContainer";
import {BootstrapScriptBuilder} from "./BootstrapScriptBuilder";
import {BootstrapScriptRunner} from "./BootstrapScriptRunner";
import {DecoratorProperties, FileProperties, FilePreProcessor,
        BootstrapContext, BootstrapScript, JecStringsEnum
       } from "jec-commons";

/**
 * The <code>BootstrapAutowireProcessor</code> class allows to find all 
 * bootstrap classes defined for an <code>EjpContainer</code> instance.
 */
export class BootstrapAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>@Bootstrap</code> decorator in a file.
   */
  private static readonly BOOTSTRAP_MASK:string = "Bootstrap";

  /**
   * The mask used to detect the <code>jec-commons</code> imports in a file.
   */
  private static readonly COMMONS_MASK:string = "jec-commons";

  /**
   * The collection of <code>FileProperties</code> instances that represent a
   * jslet.
   */
  private _bootstrapFiles:FileProperties[] = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._bootstrapFiles = new Array<FileProperties>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void {}

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, watcher:any):void {
    let decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    while(len--) {
      decorator = decorators[len];
      if( decorator.name === BootstrapAutowireProcessor.BOOTSTRAP_MASK &&
          decorator.classPath === BootstrapAutowireProcessor.COMMONS_MASK ) {
        this._bootstrapFiles.push(file);
      }
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(watcher:any, sourcePath:string) {
    //TODO check whether the watcher is a DomainConnector instance or not:
    let container:DomainContainer = watcher.getContainer();
    let context:BootstrapContext = container.getBootstrapContext();
    let len:number = this._bootstrapFiles.length;
    let file:FileProperties = null;
    let script:BootstrapScript = null;
    let pathLength:number = sourcePath.length + 1;
    let bootstrapPath:string = null;
    let src:string = watcher.getTarget() + JecStringsEnum.SRC;
    let builder:BootstrapScriptBuilder = new BootstrapScriptBuilder();
    let runner:BootstrapScriptRunner = new BootstrapScriptRunner();
    while(len--) {
      file = this._bootstrapFiles[len];
      bootstrapPath = file.path.substring(pathLength) + file.name;
      LoggerManager.getInstance().info(
        GlassCatLocaleManager.getInstance().get(
            "bootstrap.autowireDetect", bootstrapPath
          )
        );
      script = builder.build(src + bootstrapPath);
      context.addScript(script);
    }
    this._bootstrapFiles.splice(0);
    runner.runAll(container);
  }
}