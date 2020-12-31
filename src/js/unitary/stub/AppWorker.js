'use strict';
/**
 * Created by nbeni on 12/21/2020.
 * This code exists within the application web worker
 */

define([
  'unitary/stub/ContextObj',
  'unitary/core/Helpers'
], function(CtxObj, helpers) {

  const c_array_reply_transactions = [];
  const c_func_reply_listener = (event) => {

  };


  return {
    layout: {
      // Functions for processing GoldenLayout go here
    },
    contexts: {
      // Functions for managing data contexts go here
      create: (options) => { // creates a new context (Promise)
        // message {action: "context:create", options:"data"}
        postMessage({action: "context:create", options:options});
      },
      delete: (ctx_id) => {  // deletes a context
        // message {action: "context:delete", ctxid: "context_string"}
        postMessage({action: "context:delete", ctxid:ctx_id});
      },
      load: (ctx_id, change_callback) => { // loads a context given its InstanceID
        // message {action: "context:follow", ctxid: "context_string"}
        return Promise(async (resolve, reject) => {
          const txn_id = helpers.ID2String(await helpers.generateID());
          // register handlers for "OK" and "Error"
          c_array_reply_transactions[txn_id] = {
            resolve: (data) => {
              resolve(new CtxObj(ctx_id, data));
            },
            reject: (data) => {
              reject(data);
            }
          }
          postMessage({action: "context:follow", ctxid:ctx_id});
        });
      },
      list: () => { // lists all contexts
        // message {action: "context:list"}
      }
    },
    components: {
      listRegistered: () => {
        // message {action:"components:list"}
      },
      listInstances: () => {
        // message {action:"instances:list"}
      },
      deleteInstance: (instance_id) => {
        // message {action:"instances:delete", instanceid: "instance_string"}
      }
    },
    messages : {
      sendMessage: (instance_id, data) => {
        // message {action:"message:send", instanceid: "instance_string", data:"mydata"}
      },
      sendTransaction: (instance_id, data, callback) => {
        // message {action:"message:send", instanceid: "instance_string", data:"mydata"}
      }
    },
    // DOES THE APPLICATION WORKER REALLY NEED ACCESS TO DRAG AND DROP FUNCTIONALITY?
    // dragdrop: {
    //   pushData: () => {
    //     // message {action:"dragdrop:push", data:"data"}
    //   },
    //   popData: (callback) => {
    //     // message {action:"dragdrop:push", data:"data"}
    //   }
    // }
  };

});

