// Type definitions for fh-mbaas-api 5.0.0
// Project: https://github.com/feedhenry/fh-mbaas-api
// Definitions by: Michael Burkman <https://github.com/MikeyBurkman>

type StandardCb<T> = (err?: Error|string|null, res?: T|null) => void;

type NoRespCb = (err?: Error|string|null) => void;

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

interface SyncInterceptParams {
  query_params: any;
  meta_data: any;
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

interface PushClientOptions {
  widget: string;
  instance: string;
  appapikey: string;
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

  namespace forms {
    // TODO
    function getForms(...args: any[]): void;
    function getForm(...args: any[]): void;
    function getPopulatedFormList(...args: any[]): void;
    function getSubmissions(...args: any[]): void;
    function getSubmission(...args: any[]): void;
    function getSubmissionFile(...args: any[]): void;
    function getTheme(...args: any[]): void;
    function getAppClientConfig(...args: any[]): void;
    function submitFormData(...args: any[]): void;
    function completeSubmission(...args: any[]): void;
    function createSubmissionModel(...args: any[]): void;
    function registerListener(...args: any[]): void;
    function deregisterListener(...args: any[]): void;
    function exportCSV(...args: any[]): void;
    function exportSinglePDF(...args: any[]): void;
  }

  namespace sync {
    function init(dataset_id: string, options: SyncInitOptions, callback: StandardCb<void>): void;
    function invoke(dataset_id: string, options: any, callback: () => void): void;

    function stop(dataset_id: string, onStop: () => void): void;
    function stopAll(onstop: StandardCb<string[]>): void;

    function handleList(dataset_id: string, onList: (dataset_id: string, params: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalHandleList(onList: (dataset_id: string, params: any, callback: StandardCb<any>, meta_data?: any) => void): void;

    function handleCreate(dataset_id: string, onCreate: (dataset_id: string, data: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalHandleCreate(onCreate: (dataset_id: string, params: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    
    function handleRead(dataset_id: string, onRead: (dataset_id: string, uid: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalHandleRead(onRead: (dataset_id: string, uid: string, callback: StandardCb<any>, meta_data?: any) => void): void;
    
    function handleUpdate(dataset_id: string, onUpdate: (dataset_id: string, uid: string, data: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalHandleUpdate(onCreate: (dataset_id: string, uid: string, data: any, callback: StandardCb<any>, meta_data?: any) => void): void;
    
    function handleDelete(dataset_id: string, onCreate: (dataset_id: string, uid: string, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalHandleDelete(onCreate: (dataset_id: string, uid: string, callback: StandardCb<any>, meta_data?: any) => void): void;

    // TODO: What type is the timestamp???
    function handleCollision(dataset_id: string, onCollision: (dataset_id: string, hash: string, timestamp: Date, uid: string, pre: any, post: any, meta_data?: any) => void): void;
    function globalHandleCollision(onCollision: (dataset_id: string, hash: string, timestamp: Date, uid: string, pre: any, post: any, meta_data?: any) => void): void;
    
    function listCollisions(dataset_id: string, onList: (dataset_id: string, callback: StandardCb<{[hash: string]: any}>, meta_data?: any) => void): void;
    function globalListCollisions(onList: (dataset_id: string, callback: StandardCb<{[hash: string]: any}>, meta_data?: any) => void): void;
    
    // TODO: Wtf are the callback params
    function removeCollisions(dataset_id: string, onRemove: (dataset_id: string, collision_hash: string, callback: StandardCb<any>, meta_data?: any) => void): void;
    function globalListCollisions(onRemove: (dataset_id: string, collision_hash: string, callback: StandardCb<any>, meta_data?: any) => void): void;
    
    function interceptRequest(dataset_id: string, onIntercept: (dataset_id: string, interceptor_params: SyncInterceptParams, callback: NoRespCb) => void): void;
    function globalListCollisions(onIntercept: (dataset_id: string, interceptor_params: SyncInterceptParams, callback: NoRespCb) => void): void;
  }

  function sec(options: SecOptions, callback?: StandardCb<SecResults>): void;

  function hash(options: HashOptions, callback?: StandardCb<{hashvalue: string}>): void;

  function push(message: any, options: PushOptions, callback?: StandardCb<any>): void;
  namespace push {
    function getPushClient(options: PushClientOptions): (message: any, options: PushOptions, callback?: StandardCb<any>) => void;
  }

  function host(callback: StandardCb<string>): void;

  function mbaasExpress(): any;
}

export = MbaasApi;