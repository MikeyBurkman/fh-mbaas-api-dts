// Type definitions for fh-mbaas-api 5.0.0
// Project: https://github.com/feedhenry/fh-mbaas-api
// Definitions by: Michael Burkman <https://github.com/MikeyBurkman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*!
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

declare namespace MbaasApi {

  type logLevel = 'silly' | 'verbose' | 'info' | 'warn' | 'debug' | 'error';

  type StandardCb = (err?: Error|null, res?: any) => void;

  type Serializable = string | number | boolean | null;

  // Service stuff

  function service(params: {
    guid: string;
    path: string;
    method: string;
    params?: any;
    timeout?: number;
    headers?: any;
  }, callback?: (err?: Error|null, body?: any, res?: any) => void): void;

  // Cache stuff
  // TODO would be really awesome if we could figure out how to overload this...
  //function cache(params: {act: 'save', key: string, value: Serializable, expiry?: number}, cb?: StandardCb): void;
  //function cache(params: {act: 'load'|'remove', key: string}, cb?: StandardCb): void;
  function cache(params: {
    act: 'save'|'load'|'remove', 
    key: string, 
    value?: Serializable, 
    expiry?: number
  }, cb?: StandardCb): void;


  namespace sync {

    function init(dataset_id: string, options: {
      sync_frequency?: number;
      logLevel?: logLevel;
    }, callback: (err?: Error|null) => void): void;
    function invoke(dataset_id: string, options: any, callback: () => void): void;
    function stop(dataset_id: string, callback: () => void): void;
    function stopAll(callback: (err?: Error|null, res?: string[]|null) => void): void;
    function handleList(dataset_id: string, callback: (dataset_id: string, params: any, cb: (err?: Error|null, res?: any) => void, meta_data: any) => void): void;
    function globalHandleList(callback: (dataset_id: string, params: any, cb: StandardCb, meta_data: any) => void): void;
  }
}

export = MbaasApi;