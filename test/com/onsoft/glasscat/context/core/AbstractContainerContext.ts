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

import { TestSuite, Test, TestSorters, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { AbstractContainerContext } from "../../../../../../src/com/onsoft/glasscat/context/core/AbstractContainerContext";
import { ContainerContext } from "jec-commons";
import { DomainConnector } from "../../../../../../src/com/onsoft/glasscat/domains/connectors/DomainConnector";

import { ContainerContextImpl } from "../../../../../../utils/test-utils/classes/ContainerContextImpl";

@TestSuite({
  description: "Test the AbstractContainerContext class methods: TODO implement all tests for this class",
  disabled: true
})
export class AbstractContainerContextTest {

  public context:AbstractContainerContext = null;
  public connector:DomainConnector = null;

  @BeforeAll()
  public initTest():void {
    this.connector = ({} as DomainConnector);
    this.context = new ContainerContextImpl(this.connector);
  }
}