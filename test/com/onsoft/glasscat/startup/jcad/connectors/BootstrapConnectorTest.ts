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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { BootstrapConnector } from "../../../../../../../src/com/onsoft/glasscat/startup/jcad/connectors/BootstrapConnector";
import { Decorator } from "jec-commons";
import { BootstrapConnectorRefs } from "jec-exchange";

@TestSuite({
  description: "Test the BootstrapConnector class methods"
})
export class BootstrapConnectorTest {

  public connector:BootstrapConnector = null;
  public decorator:Decorator = null;

  @BeforeAll()
  public initTest():void {
    this.decorator = ({} as Decorator);
    this.connector = new BootstrapConnector(
      BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF, 
      this.decorator
    );
  }

  @Test({
    description: "should return the same JCAD reference as passed to the constructor function",
  })
  public getJcadReferenceTest():void {
    expect(
      this.connector.getJcadReference()
    ).to.equal(BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF);
  }
  
  @Test({
    description: "should return the same decorator reference as passed to the constructor function",
  })
  public getDecoratorTest():void {
    expect(
      this.connector.getDecorator()
    ).to.equal(this.decorator);
  }
}