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

import {DomainConfigImpl} from "../../../src/com/onsoft/glasscat/context/domains/DomainConfigImpl";
import {DomainImpl} from "../../../src/com/onsoft/glasscat/context/domains/DomainImpl";
import {DomainConnectorConfigImpl} from "../../../src/com/onsoft/glasscat/context/domains/DomainConnectorConfigImpl";
import * as configUtils from "./DomainConfigurationUtils";
import { DomainConfig, Domain, DomainConnectorConfig } from "jec-glasscat-config";

/*!
 * This module constains utilities used by the DomainConfigSerializer test
 * suite.
 */

// Utilities:
export const INVALID_DATA:any = ["foo", "bar"];
export const buildDomainConfig:Function = function():DomainConfigImpl {
  const cfg:DomainConfig = new DomainConfigImpl();
  const domain:Domain = new DomainImpl();
  const connector:DomainConnectorConfig = new DomainConnectorConfigImpl();
  connector.server = configUtils.CONFIG_SERVER;
  connector.type = configUtils.CONFIG_TYPE;
  domain.name = configUtils.CONFIG_NAME;
  domain.host = configUtils.CONFIG_HOST;
  domain.target = configUtils.CONFIG_TARGET;
  domain.connector = connector;
  cfg.domains = [domain];
  return cfg;
};
export const RESULT:string = '{"domains":[{"name":"test-ejp","host":"localhost","target":"${root}/test","connector":{"type":"ejp","server":"test-server"}}]}';
