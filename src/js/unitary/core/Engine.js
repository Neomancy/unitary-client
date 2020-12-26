/**
 * Created by nbeni on 12/6/2020.
 */

define([
  'src/js/unitary/core/Helpers',
  'src/js/unitary/core/ComponentMgr'
], function(helpers, CompMgrFactory) {
  Unitary =  {
    helpers: {},
    XXXcomponents: {
      createWidget: async (container_el, type_id, ctx) => {
        // Creates an iframe within container_el and loads url given by type_id.uri into it
        if (!(container_el instanceof HTMLElement)) {
          throw new Error("Unitary.app.components.createWidget: Passed container_el is not HTMLElement");
        }
        // verify that the type_id is correct
        if (Unitary.app.components._types[type_id] === undefined) {
          throw new Error("Unitary.app.components.createWidget: Passed type_id is unregistered");
        }
        let widget_url = Unitary.app.components._types[type_id].url;

        // create an instance record
        let instance_id = await Unitary.helpers.generateID();
        console.log(window.btoa(instance_id));
        Unitary.app.components._instances[instance_id] = {
          initialized: false,
          type: type_id,
          context: ctx
        };


        // create the sandboxed iframe and append to the target DOM node
        let iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'my-test-iframe');
        iframe.setAttribute('sandbox', 'allow-scripts');
        iframe.setAttribute('src', widget_url+'#'+btoa(instance_id));
        container_el.appendChild(iframe);
        return instance_id;
      },
      createLibrary: () => {
        // Creates a webworker and loads the library into it
      },
      listTypes: () => {
        /* Lists all types registered by the application
         * returns: {"{typeID}":{
         *     TypeID: a unique uri used to identify the type
         *     Name: human friendly name for the type
         *     isLibrary: boolean - is the type a WebWorker component
         *     isUI: boolean - is the type a UI component
         * }, ...}
         * */
      },
      listInstances: () => {
        /* Lists all instances instanciated in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      },
      getInstance: () => {
        /* Get a single component instance in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      },
      getInstancesByType: ()=> {
        /* Lists all instances of a type that are instanciated in the application
         * returns: {"{InstanceID}":{
         *     InstanceID: a unique hash used to identify the instance
         *     TypeID: a unique uri used to identify the type
         *     TabTitle: the title displayed in the tab if user is
         *     TabSummary: the text displayed on mouseover of tab or when using screen reader
         *     ExecutionCtx: the execution context for the instance
         *
         * }, ...}
         * */
      }
    }
  };

  // build the Unitary namespace
  Unitary.helpers = helpers;
  Unitary.components = CompMgrFactory();

  // *******************************************************************
  // Sterilize any debug functionality that may exist on the modules
  // (depends on a special "debug" value in sessionStorage being true
  // *******************************************************************
  if (window.sessionStorage.getItem("debug") !== true) {
    for (let module in Unitary) {
      delete Unitary[module].debug;
    }
  }

  // fire the framework loaded event
  window.postMessage({family:'mgnt', msg:'FRAMEWORK_LOADED', data: {}});


  return Object.assign({}, Unitary, {"name":"UnitaryDesktop"});
});
