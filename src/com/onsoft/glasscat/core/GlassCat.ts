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

import {JcadContextManager, DecoratorConnectorManager} from "jec-commons";
import {GlassCatConfig} from "./GlassCatConfig";
import {KernelBuilder} from "../util/core/KernelBuilder";
import {Kernel} from "./Kernel";
import {LoggerManager} from "../util/logging/LoggerManager";
import {LoggerManagerBuilder} from "../util/logging/LoggerManagerBuilder";
import {GlassCatLocaleManager} from "../i18n/GlassCatLocaleManager";
import {ContextValidator} from "../context/validators/ContextValidator";
import {EnvironmentValidator} from "../context/validators/EnvironmentValidator";

/**
 * Represents the entry point for a GlassCat container instance.
 */
export class GlassCat {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCat</code> instance.
   * 
   * @param {GlassCatConfig} config the configuration for this
   *                                <code>GlassCat</code> instance.
   */
  constructor(config:GlassCatConfig) {
    this.initObj(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The kernel for the current GlassCat container instance.
   */
  private _kernel:Kernel = null;

  /**
   * The configuration for this <code>GlassCat</code> instance.
   */
  private _config:GlassCatConfig = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {GlassCatConfig} config the configuration for this
   *                                <code>GlassCat</code> instance.
   */
  private initObj(config:GlassCatConfig):void {
    this._config = config;
  }

  /**
   * Initializes the container instance. This method is called by the
   * <code>start()</code> function.
   */
  private runProcesses():void {
    const initDate:number = Date.now();
    this.initKernel();
    this.initLogger();
    this.checkConfig();
    this.initServices();
    this.startServices();
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get("server.ready")
    );
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get(
        "server.startDuration", String(Date.now() - initDate)
      )
    );
  }

  /**
   * Kills all processes used by the container instance. This method is called
   * by the <code>stop()</code> function.
   */
  private killProcesses():void {
    this._kernel.stopServices();
    this._kernel = null;
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get("server.stop")
    );
  }

  /**
   * Initializes the container kernel.
   */
  private initKernel():void {
    const builder:KernelBuilder = new KernelBuilder();
    this._kernel = builder.build(this._config);
  }

  /**
   * Initializes the logger for this container instance.
   */
  private initLogger():void {
    new LoggerManagerBuilder().context(this._kernel.getContext()).build();
  }

  /**
   * Checks the container context to detect errors.
   */
  private checkConfig():void {
    new ContextValidator().validate(this._kernel);
    new EnvironmentValidator().validate(this._kernel);
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get(
        "singleton.info",
        "[JcadContextManager]",
        JcadContextManager.getInstance().getId()
      )
    );
    LoggerManager.getInstance().info(
      GlassCatLocaleManager.getInstance().get(
        "singleton.info",
        "[DecoratorConnectorManager]",
        DecoratorConnectorManager.getInstance().getId()
      )
    );
  }

  /**
   * Initializes all core services of the GlassCat container.
   */
  private initServices():void {
    this._kernel.initServices();
  }

  /**
   * Initializes the container services.
   */
  private startServices():void {
    this._kernel.startServices();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Starts the GlassCat container.
   */
  public start():void {
    this.runProcesses();
  }

  /**
   * Stops the GlassCat container.
   */
  public stop():void {
    this.killProcesses();
  }
};
