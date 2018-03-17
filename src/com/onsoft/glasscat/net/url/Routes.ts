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

import {RoutePattern} from "./RoutePattern";

/**
 * The <code>Routes<code> decorator provides routing functionalities for jslets.
 * This decorator is not a part of the JEC specification; it must not be used
 * out of the GlassCat admin project.
 *
```javascript
@Routes([]
  {
    name: "userRoute",
    template: "/api/users(/:id)"
  }
])
```
 */
export function Routes(metadata:any):Function {

  //////////////////////////////////////////////////////////////////////////////
  // Overrides
  //////////////////////////////////////////////////////////////////////////////

  return function(target:any):Function {

    ////////////////////////////////////////////////////////////////////////////
    // Validation process
    ////////////////////////////////////////////////////////////////////////////

    const routes:string[] = metadata;
    if(!routes) return target;
    const oldInit:Function = target.prototype.init;
    
    target.__routesMetadata = metadata;

    /**
     * @override
     */
    target.prototype.init = function():void {
      let len:number = routes.length;
      let pattern:RoutePattern = null;
      let name:string = null;
      let rawPattern:any = null;
      while(len--){
        rawPattern = routes[len];
        name = rawPattern.name;
        pattern = new RoutePattern(rawPattern.pattern);
        pattern.setName(name);
        Object.defineProperty(this, name, {
          value: pattern,
          enumerable: true
        });
      }
      oldInit.apply(this);
    }

    return target;
  }
}
