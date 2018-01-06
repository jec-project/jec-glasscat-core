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

import {UserHashModule} from "jec-exchange";
import * as crypto from "crypto";
import {EncodingFormat} from "jec-commons";
import { GlassCatError } from "../../exceptions/GlassCatError";
import { GlassCatErrorCode } from "../../exceptions/GlassCatErrorCode";

/**
 * The default implementation of the <code>UserHashModule</code> interface.
 */
export class DefaultUserHashModule implements UserHashModule {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultUserHashModule</code> instance.
   */
  constructor() {}

  // see lollyrock.com/articles/nodejs-encryption
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The private key for this <code>UserHashModule<code> instance.
   */
  private _key:string = null;

  /**
   * The type of algorithm used by this <code>UserHashModule</code> object for 
   * passwords encryption.
   */
  private readonly HASH_ALGORITHM:string = "sha256";

  /**
   * A convenient string that represents a single whitespace.
   */
  private readonly SPACER:string = " ";

  /**
   * The type algorithm used by this <code>UserHashModule</code> object for 
   * data encryption.
   */
  private readonly ALGORITHM:string = "aes-256-ctr";
  
  /**
   * The charater used by this <code>UserHashModule</code> object for separating
   * roles into the data storage module.
   */
  private readonly ROLES_SEPARATOR:any = ",";

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Throws a <code>GlassCatError</code> exception whether no secret key is
   * defined.
   */
  private checkKey():void {
    if(!this._key) {
      throw new GlassCatError(GlassCatErrorCode.INVALID_ENCRYPTION_KEY);
    }
  }

  /**
   * Returns the cipher object based upon the encryption algorithm and the
   * private key.
   * 
   * @return {crypto.Cipher} a cipher object based upon the encryption algorithm 
   *                         and the private key.
   */
  private getCipher():crypto.Cipher {
    this.checkKey();
    return crypto.createCipher(this.ALGORITHM, this._key);
  }

  /**
   * Returns the decipher object based upon the encryption algorithm and the
   * private key.
   * 
   * @return {crypto.Decipher} a decipher object based upon the encryption  
   *                           algorithm and the private key.
   */
  private getDecipher():crypto.Decipher {
    this.checkKey();
    return crypto.createDecipher(this.ALGORITHM, this._key);
  }

  /**
   * Encrypts the specified text and returns the encrypted string.
   * 
   * @param {string} text the text to encrypt.
   * @return {string} the result of the encryption for the specified text.
   */
  private encryptString(text:string):string {
    let cipher:crypto.Cipher = this.getCipher();
    let result:string =
                 cipher.update(text, EncodingFormat.UTF8, EncodingFormat.HEX);
    result += cipher.final(EncodingFormat.HEX);
    return result;
  }

  /**
   * Decrypts the specified text and returns the decrypted string.
   * 
   * @param {string} text the text to decrypt.
   * @return {string} the result of the decryption for the specified text.
   */
  private decryptString(text:string):string {
    let decipher:crypto.Decipher = this.getDecipher();
    let result:string =
               decipher.update(text, EncodingFormat.HEX, EncodingFormat.UTF8);
    result += decipher.final(EncodingFormat.UTF8);
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setPrivateKey(key:string):void {
    this._key = key;
  }

  /**
   * @inheritDoc
   */
  public encryptUser(alias:string, password:string, roles:string[]):string {
    let result:string =
      this.encryptAlias(alias) + this.SPACER +
      this.encryptPassword(password) + this.SPACER +
      this.encryptRoles(roles);
    return result;
  }

  /**
   * @inheritDoc
   */
  public encryptAlias(alias:string):string { 
    return this.encryptString(alias);
  }

  /**
   * @inheritDoc
   */
  public encryptPassword(password:string):string {
    let hash = crypto.createHash(this.HASH_ALGORITHM);
    return hash.update(password).digest(EncodingFormat.HEX).toString();
  }

  /**
   * @inheritDoc
   */
  public encryptRoles(roles:string[]):string {
    let data:string = roles.join(this.ROLES_SEPARATOR);
    return this.encryptString(data);
  }

  /**
   * @inheritDoc
   */
  public decryptAlias(alias:string):string {
    return this.decryptString(alias);
  }

  /**
   * @inheritDoc
   */
  public decryptRoles(roles:string):string[] {
    let decrypted:string = this.decryptString(roles);
    return decrypted.split(this.ROLES_SEPARATOR);
  }
}