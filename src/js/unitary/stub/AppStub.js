'use strict';
/**
 * Created by nbeni on 12/21/2020.
 * This code exists within the application web worker
 */

define([
  'unitary/core/Helpers'
], function(helpers) {

  let c_array_reply_transactions = {};
  let c_func_reply_listener = (event) => {
    let packet = event.data;
    if (packet.header.to !== 'AppStub') return;
    if (packet.header.reply !== true) return;
    // TODO: lookup the transaction id and get the promise functions
    let promise_funcs = c_array_reply_transactions[packet.header.transaction];
    if (promise_funcs === undefined) return;
    delete c_array_reply_transactions[packet.header.transaction];

    // TODO: process the message type
    switch (packet.header.action) {
      case 'context:create':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'context:delete':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'context:follow':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'context:list':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'components:list':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'instances:list':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
      case 'instances:delete':
        if (packet.data !== false) {
          promise_funcs.resolve(packet.data);
        } else {
          promise_funcs.reject(false);
        }
        break;
    }
  };


  return function(EventSource, EngineMediator) {
    let c_EventSource = EventSource;
    let c_EngineMediator = EngineMediator;
    c_EventSource.addEventListener('message', c_func_reply_listener);
    return {
      layout: {
        // Functions for processing GoldenLayout go here
      },
      contexts: {
        // Functions for managing data contexts go here
        create: async (options) => { // creates a new context (Promise)
          // message {action: 'context:create', options:'data'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'context:create'
              },
              data: {options: options}
            });
          });
          return myPromise;
        },
        delete: async (ctx_id) => {  // deletes a context
          // message {action: 'context:delete', ctxid: 'context_string'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'context:delete'
              },
              data: ctx_id
            });
          });
          return myPromise;
        },
        load: async (ctx_id) => { // loads a context given its InstanceID
          // message {action: 'context:follow', ctxid: 'context_string'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'context:follow'
              },
              data: ctx_id
            });
          });
          return myPromise;
        },
        list: async () => { // lists all contexts
          // message {action: 'context:list'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'context:list'
              },
              data: null
            });
          });
          return myPromise;
        }
      },
      components: {
        listRegistered: async () => {
          // message {action:'components:list'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'components:list'
              },
              data: null
            });
          });
          return myPromise;
        },
        listInstances: async () => {
          // message {action:'instances:list'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'instances:list'
              },
              data: null
            });
          });
          return myPromise;
        },
        deleteInstance: async (instance_id) => {
          // message {action:'instances:delete', instanceid: 'instance_string'}
          let myPromise = new Promise(async (resolve, reject) => {
            let txid = c_EngineMediator.getReference('Helpers').popID();
            c_array_reply_transactions[txid] = {resolve:resolve, reject:reject, expires: Date.now()+(120 * 1000)};
            c_EventSource.postMessage({
              header: {
                transaction: txid,
                to: 'AppMgr',
                from: 'AppStub',
                action: 'instances:delete'
              },
              data: instance_id
            });
          });
          return myPromise;
        }
      },
      messages: {
        sendMessage: (instance_id, data) => {
          // message {action:'message:send', instanceid: 'instance_string', data:'mydata'}
        },
        sendTransaction: (instance_id, data, callback) => {
          // message {action:'message:send', instanceid: 'instance_string', data:'mydata'}
        }
      },
      // DOES THE APPLICATION WORKER REALLY NEED ACCESS TO DRAG AND DROP FUNCTIONALITY?
      // dragdrop: {
      //   pushData: () => {
      //     // message {action:'dragdrop:push', data:'data'}
      //   },
      //   popData: (callback) => {
      //     // message {action:'dragdrop:push', data:'data'}
      //   }
      // }
    };
  };

});

