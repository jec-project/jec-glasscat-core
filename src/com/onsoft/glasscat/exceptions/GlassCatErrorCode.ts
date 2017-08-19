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

/**
 * The <code>GlassCatErrorCode</code> class defines a set of standard errors 
 * references that are used to indicates the reason why a
 * <code>GlassCatError</code> exception is thrown.
 */
export enum GlassCatErrorCode {

  /**
   * Indicates that the exception is due to the attempt of instantiating a
   * singleton, instead of using the <code>getInstance()</code> method.
   * This error code is initialized to <code>0</code>.
   */
  SINGLETON_ERROR = 0,

  /**
   * Indicates that the exception is due to the loading failure of a
   * configuration file.
   * This error code is initialized to <code>1</code>.
   */
  CONFIG_LOADING_FAILURE = 1,
  
  /**
   * Indicates that the exception is due to an attempt of serializing an invalid
   * configuration object.
   * This error code is initialized to <code>2</code>.
   */
  CONFIG_SERIALIZATION_ERROR = 2,
  
  /**
   * Indicates that the exception is due to an error thrown while updating a
   * configuration object.
   * This error code is initialized to <code>3</code>.
   */
  CONFIG_UPDATE_ERROR = 3,

  /**
   * Indicates that the specified <code>EjpConfig</code> object must not be
   * <code>null</code>.
   * This error code is initialized to <code>4</code>.
   */
  NULL_EJP_CONFIG = 4,

  /**
   * Indicates that the specified <code>EjpConfig</code> object does not define
   * a required property.
   * This error code is initialized to <code>5</code>.
   */
  EJP_CONFIG_MISSING_PROPERTY = 5,
  
  /**
   * Indicates that the specified <code>EjpConfig</code> object define an 
   * invalid property.
   * This error code is initialized to <code>6</code>.
   */
  EJP_CONFIG_INVALID_PROPERTY = 6,

  /**
   * Indicates that the specified <code>EjpConfig</code> object define an 
   * invalid login configuration.
   * This error code is initialized to <code>7</code>.
   */
  EJP_CONFIG_INVALID_LOGIN = 7,
  
  /**
   * Indicates that the specified <code>EjpConfig</code> object define an 
   * invalid realm configuration.
   * This error code is initialized to <code>8</code>.
   */
  EJP_CONFIG_INVALID_REALM = 8,
  
  /**
   * Indicates that the specified secutity context object is not valid.
   * This error code is initialized to <code>9</code>.
   */
  INVALID_SECURITY_CONTEXT = 9,

  /**
   * Indicates that the specified encryption key is not valid.
   * This error code is initialized to <code>10</code>.
   */
  INVALID_ENCRYPTION_KEY = 10,
  
  /**
   * Indicates that the specified context object is not valid.
   * This error code is initialized to <code>11</code>.
   */
  INVALID_CONTEXT = 11,

  /**
   * Indicates that an error ocurred while initializing the admin realm.
   * This error code is initialized to <code>12</code>.
   */
  ADMIN_REALM_INIT_FAILURE = 12,
  
  /**
   * Indicates that the specified jslet configuration is not valid.
   * This error code is initialized to <code>13</code>.
   */
  INVALID_JSLET_CONFIG = 13,

  /**
   * Indicates that the specified bootstrap configuration is not valid.
   * This error code is initialized to <code>14</code>.
   */
  INVALID_BOOTSTRAP_CONFIG = 14
}
