'use strict';
/**
 * Created by nbeni on 12/6/2020.
 * This code exists within the main window.
 */

define([
  'unitary/core/Helpers',
  'unitary/core/EventBus',
  'unitary/core/ComponentMgr',
  'unitary/core/ApplicationMgr',
  'unitary/core/ContextMgr'
], function(helpers, EventBusFactory, CompMgrFactory, ApplicationMgr, ContextMgr) {

  // build the Unitary namespace
  const eventbus = EventBusFactory(window);
  window.Unitary = {
    app: {
      manager: ApplicationMgr
    },
    helpers: helpers,
    events: eventbus,
    components: CompMgrFactory(eventbus),
    contexts: ContextMgr
  };

  Unitary.loadApp = function(app_url) {
    return (new Promise((resolve, reject) => {
      require(['json!' + app_url], (app_manifest) => {
        // TODO: Register all the components
        // TODO: instanciate all the libraries
        // TODO: initialize the main application code
        if (typeof app_manifest.app.url !== 'string') {
          console.error('The application manifest does not have value for "app.url"');
          throw Error('Value for "app.url" is missing from application manifest');
        }
        Unitary.app.manifest = app_manifest;
        Unitary.app.manager = ApplicationMgr;
        Unitary.app.manager.initialize(app_manifest);

        // window.postMessage({header: {type:'MGNT', broadcast:'FRAMEWORK'}, msg:'APP_LOADED', data: {}});
        resolve(true);
      });
    }));
  };


      // *******************************************************************
  // Sterilize any debug functionality that may exist on the modules
  // (depends on a special "debug" value in sessionStorage being true)
  // *******************************************************************
  if (window.sessionStorage.getItem('debug') !== true) {
    for (let module in Unitary) {
      delete Unitary[module].debug;
    }
  }

  // fire the framework loaded event
//  window.postMessage({header: {type:'MGNT', broadcast:'FRAMEWORK'}, msg:'FRAMEWORK_LOADED', data: {}});
  return Object.assign({}, Unitary, {'name':'UnitaryDesktop'});
});
