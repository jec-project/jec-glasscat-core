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
import {DecoratorProperties, FileProperties, FilePreProcessor} from "jec-commons";
import {JsletContext} from "jec-exchange";
import {JsletContextBuilder} from "./JsletContextBuilder";

/**
 * The <code>JsletsAutowireProcessor</code> class allows to find all jslets
 * defined for an <code>EjpContainer</code> instance.
 */
export class JsletsAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JsletsAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>@WebJslet</code> decorator in a file.
   */
  private static readonly WEBJSLET_MASK:string = "WebJslet";

  /**
   * The mask used to detect the <code>jec-exchange</code> imports in a file.
   */
  private static readonly EXCHANGE_MASK:string = "jec-exchange";

  /**
   * The collection of <code>FileProperties</code> instances that represent a
   * jslet.
   */
  private _jsletFiles:FileProperties[] = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._jsletFiles = new Array<FileProperties>();
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
    const decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    while(len--) {
      decorator = decorators[len];
      if( decorator.name === JsletsAutowireProcessor.WEBJSLET_MASK &&
          decorator.classPath === JsletsAutowireProcessor.EXCHANGE_MASK ) {
        this._jsletFiles.push(file);
      }
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(watcher:any, sourcePath:string) {
    //TODO check whether the watcher is a DomainConnector instance or not:
    const context:JsletContext = watcher.getContainer().getJsletContext();
    const jslets:string[] = new Array<string>();
    const pathLength:number = sourcePath.length + 1;
    let len:number = this._jsletFiles.length;
    let file:FileProperties = null;
    let jsletPath:string = null;
    while(len--) {
      file = this._jsletFiles[len];
      jsletPath = file.path.substring(pathLength) + file.name;
      LoggerManager.getInstance().debug(
        GlassCatLocaleManager.getInstance().get(
            "jslet.autowireDetect", jsletPath
          )
        );
      jslets.push(jsletPath);
    }
    JsletContextBuilder.getInstance().initJslets(context, jslets);
    this._jsletFiles.splice(0);
  }
}