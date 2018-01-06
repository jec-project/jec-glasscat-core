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

import {ContainerContext, JecStringsEnum, Logger} from "jec-commons";
import {DomainConnector} from "../../domains/connectors/DomainConnector";
import {LoggerManager} from "../../util/logging/LoggerManager";

/**
 * An abstract class for <code>ContainerContext<code> implementations.
 */
export abstract class AbstractContainerContext implements ContainerContext {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractDecoratorConnector</code> instance.
   * 
   * @param {DomainConnector} connector The domain connector on which is 
   *                                    deployed this context.
   */
  constructor(connector:DomainConnector) {
    this.initObj(connector);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Protected properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The domain connector on which is deployed this context.
   */
  protected __connector:DomainConnector = null;
  
  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {DomainConnector} connector The domain connector on which is 
   *                                    deployed this context.
   */
  private initObj(connector:DomainConnector):void {
    this.__connector = connector;
  }

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getStatusInfo():any {
    return this.__connector.getStatusInfo();
  }

  /**
    * @inheritDoc
    */
  public getDirectoryPath():string {
      return this.__connector.getTarget() + JecStringsEnum.WEB_APP;
  }

  /**
    * @inheritDoc
    */
  public getSourcePath():string{
      return this.__connector.getTarget() + JecStringsEnum.SRC;
  }

  /**
   * @inheritDoc
   */
  public getLogger():Logger {
    return LoggerManager.getInstance();
  }
}

