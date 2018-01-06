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
import { JsletConnector } from "../../../../../../../src/com/onsoft/glasscat/jslets/jcad/connectors/JsletConnector";
import { Decorator } from "jec-commons";
import { JsletConnectorRefs } from "jec-exchange";

@TestSuite({
  description: "Test the JsletConnector class methods"
})
export class JsletConnectorTest {

  public connector:JsletConnector = null;
  public decorator:Decorator = null;

  @BeforeAll()
  public initTest():void {
    this.decorator = ({} as Decorator);
    this.connector = new JsletConnector(
      JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF, 
      this.decorator
    );
  }

  @Test({
    description: "should return the same JCAD reference as passed to the constructor function",
  })
  public getJcadReferenceTest():void {
    expect(
      this.connector.getJcadReference()
    ).to.equal(JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF);
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