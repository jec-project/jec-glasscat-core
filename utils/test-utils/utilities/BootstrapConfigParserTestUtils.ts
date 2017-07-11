//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {JsonLoader, LogLevelUtil} from "jec-commons";

/*!
 * This module constains utilities used by the BootstrapConfigParserTest test
 * suite.
 */

// Utilities:
const BOOTSTRAP_FILE:string = "utils/test-utils/files/bootstrap.json";
export const loadConfigFile:Function = function():any {
  let loader:JsonLoader = new JsonLoader();
  return loader.loadSync(BOOTSTRAP_FILE);
};
export const GLASSCAT_VERSION:string = "0.0.0";
export const GLASSCAT_LOCALE:string = "en-US";
export const LOG_LEVEL:string = LogLevelUtil.TRACE;
export const FACTORY_0:any = {
  logLevel: LogLevelUtil.ERROR,
  name: "fileLogger",
  factory: "${server}/logging/FileLoggerFactory"
};
export const FACTORY_1:any = {
  logLevel: undefined,
  name: "consoleLogger",
  factory: "${server}/logging/ConsoleLoggerFactory"
};
export const HTTP_LISTENER_CONFIG_0:any = {
  id: "admin",
  address: "127.0.0.0",
  domain: "domain.com",
  port: 9990,
  secured: true,
  sslPath: "${root}/public/cfg/ssl/admin/",
  server: "admin-server"
};
export const HTTP_LISTENER_CONFIG_1:any = {
  id: "default",
  address: "127.0.0.1",
  domain: "localhost",
  port: 8484,
  secured: false,
  server: "server1",
  sslPath: undefined
};
export const MONITORING:any = {
  enabled: false,
  factory: "${server}/monitoring/ConsoleTransactionMonitorFactory"
};