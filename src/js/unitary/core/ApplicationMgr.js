'use strict';
/**
 * Created by nbeni on 12/30/2020.
 * This code exists within the main window.
 */

define([
  'unitary/core/Helpers',
  'unitary/core/EventBus',
  'unitary/core/ComponentMgr',
  'unitary/core/DataContext'
], function(helpers, EventBusFactory, CompMgrFactory) {


  // ************* <App Worker Event Handler> *************
  const func_AppEventHandler = (event) => {
    const msg = event.data;
    if (msg.action === undefined || msg.txn_id === undefined) return;
    switch (msg.action) {
      // ******* DISPLAY *******
      // ******* CONTEXT *******
      case "context:create":
        Unitary.contexts.create().then((new_ctx_id) => {
          let packet = EventBus.packetize();
          // TODO: generate a new context and send packet back with it's identifier
          Unitary.app.worker.postMessage();
        })
        break;
      case "context:delete":
        // TODO: delete an existing context and send back a success response
        break;
      case "context:follow":
        // TODO: subscribe the app window to all changes of the given context
        break;
      case "context:list":
        // TODO: build list of all contexts and send back to app
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
      case "":
        break;
      // ******* DRAG DROP *******
      case "":
        break;
      case "":
        break;
      case "":
        break;
    }

  };
  // ************* </App Worker Event Handler> *************
  return {
    initialize: (app_manifest) => {
      Unitary.app.manifest = app_manifest;
      Unitary.app.worker = new Worker(app_manifest.app.url, {name: 'application_worker'});
      Unitary.app.worker.onmessage = func_AppEventHandler;
      Unitary.events.RegisterSource(Unitary.app.worker, "APPLICATION");

    }

  };


});
