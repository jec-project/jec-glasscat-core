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

import {FileProperties, FilePreProcessor} from "jec-commons";
import {DomainConnector} from "../../domains/connectors/DomainConnector";

/**
 * The <code>SourceMapProcessor</code> class allows to cartography source files 
 * of an <code>EjpContainer</code> instance. This functionality is not available
 * yet.
 */
export class SourceMapProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SourceMapProcessor</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The collection of source files for a GlassCat domain container.
   */
  private _fileList:FileProperties[] = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private init():void {
    this._fileList = new Array<FileProperties>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void { }

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, connector:DomainConnector):void {
    this._fileList.push(file);
  }

  /**
   * @inheritDoc
   */
  public processComplete(connector:DomainConnector, sourcePath:string) {}

  /**
   * Not implemented yet.
   */
  public getGraph():void {}
}