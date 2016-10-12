// Type definitions for fh-mbaas-api 5.0.0
// Project: https://github.com/feedhenry/fh-mbaas-api
// Definitions by: Michael Burkman <https://github.com/MikeyBurkman>

/*
 * Licensed under:
 *   The MIT License (MIT)
 *
 *   Copyright (c) 2016 unional
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *   THE SOFTWARE.
 */


type StandardCb<T> = (err?: Error|null, res?: T) => void;

interface ServiceOptions {
  guid: string;
  path: string;
  method: string;
  params?: any;
  timeout?: number;
  headers?: any;
}

interface DbOptions {
  act: 'create' | 'read' | 'update' | 'delete' | 'deleteAll' | 'list' | 'index';
  type: string;
  fields?: any;
  guid?: string;
  geo?: any;
  eq?: any;
  ne?: any;
  lt?: any;
  le?: any;
  gt?: any;
  ge?: any;
  like?: any;
  in?: any;
  index?: any;
}

interface CacheOptions {
  act: 'save'|'load'|'remove';
  key: string;
  value?: string | number | boolean | null; 
  expiry?: number;
}

interface SyncInitOptions {
  sync_frequency?: number;
  logLevel?: 'silly' | 'verbose' | 'info' | 'warn' | 'debug' | 'error';
}

interface SecOptions {
  act: 'keygen' | 'encrypt' | 'decrypt';
  params: {
    algorithm: 'RSA' | 'AES';
    keysize?: 128 | 256 | 1024 | 2048;
    plaintext?: string;
    key?: string;
    iv?: string;
  }
}

interface SecResults {
  public: string;
  private: string;
  modulu: string;
  secretkey: string;
  iv: string;
  ciphertext: string;
  plaintext: string;
}

interface HashOptions {
  algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';
  text: string;
}

interface PushMessage {
  alert: string;
  sound?: string;
  badge?: string;
  userData?: any;
  apns?: any; // TODO
  windows?: any; // TODO
}

interface PushOptions {
  config?: {
    ttl?: number;
  };
  broadcast?: boolean;
  apps?: string[];
  criteria?: {
    alias?: string[];
    categories?: string[];
    deviceType?: string[]; // TODO: Docs say array but example is a single object?
    variants?: string[];
  }
}

declare namespace MbaasApi {

  function service(options: ServiceOptions, callback?: (err?: Error|null, body?: any, res?: any) => void): void;

  function db(options: DbOptions, callback?: StandardCb<any>): void;

  // TODO would be really awesome if we could figure out how to overload this...
  //function cache(params: {act: 'save', key: string, value: Serializable, expiry?: number}, cb?: StandardCb): void;
  //function cache(params: {act: 'load'|'remove', key: string}, cb?: StandardCb): void;
  function cache(params: CacheOptions, callback?: StandardCb<any>): void;

  namespace stats {
    function inc(counter_name: string): void;
    function dec(counter_name: string): void;
    function timing(timer_name: string, time_in_millis: number): void;
  }

  namespace sync {
    function init(dataset_id: string, options: SyncInitOptions, callback: StandardCb<void>): void;
    function invoke(dataset_id: string, options: any, callback: () => void): void;
    function stop(dataset_id: string, callback: () => void): void;
    function stopAll(callback: (err?: Error|null, res?: string[]|null) => void): void;
    function handleList(dataset_id: string, callback: (dataset_id: string, params: any, cb: (err?: Error|null, res?: any) => void, meta_data: any) => void): void;
    function globalHandleList(callback: (dataset_id: string, params: any, cb: StandardCb<any>, meta_data: any) => void): void;
    // TODO Complete this
  }

  function sec(options: SecOptions, callback?: StandardCb<SecResults>): void;

  function hash(options: HashOptions, callback?: StandardCb<{hashvalue: string}>): void;

  function push(message: any, options: PushOptions, callback?: StandardCb<any>): void;

  function host(callback: StandardCb<string>): void;

  function mbaasExpress(): any;
}

export = MbaasApi;