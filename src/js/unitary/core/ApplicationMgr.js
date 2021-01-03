'use strict';
/**
 * Created by nbeni on 12/30/2020.
 * This code exists within the main window.
 */

define([], function() {

  // // ************* <App Worker Event Handler> *************
  // const func_AppEventHandler = (ProcessedEvent) => {
  //   if (ProcessedEvent.header.action === undefined || ProcessedEvent.header.txn_id === undefined) return;
  //   switch (ProcessedEvent.header.action) {
  //     // ******* DISPLAY *******
  //     // ******* CONTEXT *******
  //     case "context:create":
  //       Mediator.getReference('ContextMgr').create().then((new_ctx_id) => {
  //         // TODO: generate a new context and send packet back with it's identifier
  //       })
  //       break;
  //     case "context:delete":
  //       // TODO: delete an existing context and send back a success response
  //       break;
  //     case "context:follow":
  //       // TODO: subscribe the app window to all changes of the given context
  //       break;
  //     case "context:list":
  //       // TODO: build list of all contexts and send back to app
  //       break;
  //     // ******* COMPONENTS *******
  //     case "components:list":
  //       // TODO: send list of components
  //       break;
  //     case "instances:list":
  //       // TODO: send list of instances
  //       break;
  //     case "instances:delete":
  //       // TODO: delete an instance []
  //       break;
  //     // ******* MESSAGES *******
  //     case "message:send":
  //       break;
  //     case "":
  //       break;
  //     // ******* DRAG DROP *******
  //     case "":
  //       break;
  //     case "":
  //       break;
  //     case "":
  //       break;
  //   }
  //
  // };
  // // ************* </App Worker Event Handler> *************



  return function(Mediator) {
    let c_Mediator = Mediator;
    return {
      init: () => {
        console.warn("initialize event listener");
      },
      ReceiveMessage: (ProcessedMessage) => {
        if (ProcessedMessage.header.action === undefined || ProcessedMessage.header.transaction === undefined) return;
        switch (ProcessedMessage.header.action) {
          // ******* DISPLAY *******
          // ******* CONTEXT *******
          case "context:create":
            c_Mediator.getReference("ContextMgr").create().then((new_ctx_id) => {
              // Send packet back with new context's identifier
              c_Mediator.getReference('EventBus').SendMessage({
                header: {
                  to: 'AppStub',
                  from: 'AppMgr',
                  action: 'context:create',
                  reply: true,
                  transaction: ProcessedMessage.header.transaction
                },
                data: new_ctx_id
              });
            });
            break;
          case "context:delete":
            c_Mediator.getReference("ContextMgr").delete(ProcessedMessage.data).then((result) => {
              // Send packet back with new context's identifier
              c_Mediator.getReference('EventBus').SendMessage({
                header: {
                  to: 'AppStub',
                  from: 'AppMgr',
                  action: 'context:delete',
                  reply: true,
                  transaction: ProcessedMessage.header.transaction
                },
                data: result
              });
            });
            break;
          case "context:follow":
            // TODO: subscribe the app window to all changes of the given context
            c_Mediator.getReference("ContextMgr").follow(ProcessedMessage.data).then((result) => {
              // Send packet back with new context's identifier
              c_Mediator.getReference('EventBus').SendMessage({
                header: {
                  to: 'AppStub',
                  from: 'AppMgr',
                  action: 'context:follow',
                  reply: true,
                  transaction: ProcessedMessage.header.transaction
                },
                data: result
              });
            });
            break;
          case "context:list":
            // TODO: build list of all contexts and send back to app
            c_Mediator.getReference("ContextMgr").list().then((result) => {
              // Send packet back with new context's identifier
              c_Mediator.getReference('EventBus').SendMessage({
                header: {
                  to: 'AppStub',
                  from: 'AppMgr',
                  action: 'context:list',
                  reply: true,
                  transaction: ProcessedMessage.header.transaction
                },
                data: result
              });
            });
            break;
          // ******* COMPONENTS *******
          case "components:list":
            // TODO: send list of components
            break;
          case "instances:list":
            // TODO: send list of instances
            break;
          case "instances:delete":
            // TODO: delete an instance []
            break;
          // ******* MESSAGES *******
          case "message:send":
            break;
          // ******* DRAG DROP *******
          case "":
            break;
        }
      }
    };
  };


  // return {
  //   initialize: (app_manifest) => {
  //     Unitary.app.manifest = app_manifest;
  //     // TODO: Register components from the manifest
  //
  //     // instanciate application worker
  //     Unitary.app.worker = new Worker(app_manifest.app.url, {name: 'application_worker'});
  //     Unitary.app.worker.onmessage = func_AppEventHandler;
  //     Unitary.events.RegisterSource(Unitary.app.worker, "APPLICATION");
  //
  // }};


});
