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

import { HttpListenerConfig, HttpMonitoringConfig } from "jec-glasscat-config";
import { HttpMonitoringConfigImpl } from "../../../src/com/onsoft/glasscat/context/core/HttpMonitoringConfigImpl";
import { HttpListenerConfigImpl } from "../../../src/com/onsoft/glasscat/context/core/HttpListenerConfigImpl";
import { HttpConnectionType } from "jec-commons";

/*!
 * This module constains utilities used by the test suites that depend on
 * HttpListenerConfig objects.
 */

// Utilities:
const buildMonitorConfig:Function = function():HttpMonitoringConfig {
  let config:HttpMonitoringConfig = new HttpMonitoringConfigImpl();
  config.enabled = true;
  return config;
};
export const ADDRESS:string = "localhost";
export const DOMAIN:string = "domain";
export const ID:string = "id";
export const PORT:number = 3600;
export const SECURED:boolean = false;
export const SERVER:string = "server1";
export const MONITORING:HttpMonitoringConfig = buildMonitorConfig();
export const PROTOCOL:HttpConnectionType = HttpConnectionType.HTTP;
export const buildConfig:Function = function():HttpListenerConfig {
  let config:HttpListenerConfig = new HttpListenerConfigImpl();
  config.address = ADDRESS;
  config.domain = DOMAIN;
  config.id = ID;
  config.monitoring = MONITORING;
  config.port = PORT;
  config.secured = SECURED;
  config.server = SERVER;
  return config;
};
