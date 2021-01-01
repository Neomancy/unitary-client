'use strict';
/**
 * Created by nbeni on 12/24/2020.
 * This code exists within the main window.
 */

define([
  'unitary/core/Helpers',
  'unitary/core/EventBus'
], function(helpers, EventBus) {

  return function(EventBusInstance) {
    let ComponentMgr = {};
    let c_Components = {};
    let c_Instances = {};
    let c_EventBus = EventBusInstance;

    ComponentMgr.name = 'ComponentMgr';  // used by the logger subsystem

    ComponentMgr.debug = function() {
      ComponentMgr.debug = {
        components: c_Components,
        instances: c_Instances
      }
    };

    // gets a valid component definition
    ComponentMgr.getComponent = function(component_id) {
      if (c_Components[component_id] === undefined) return null;
      return Object.assign({}, c_Components[component_id]);
    };

    // lists all defined component's IDs
    ComponentMgr.listComponents = function() {
      return Object.keys(c_Components);
    };

    // lists IDs of all component instances
    ComponentMgr.listInstances = function() {
      return Object.keys(c_Instances);
    };

    // list all instances of a given component ID
    ComponentMgr.listInstancesByType = function(component_id) {
      if (c_Components[component_id] === undefined) return null;
      let ret = [];
      for (let key in c_Instances) {
        if (c_Instances[key].type_id == component_id) {
          ret.append(key);
        }
      }
      return ret;
    };

    ComponentMgr.RegisterComponent = function(component_info) {
      if (component_info.id === undefined) {
        throw new Error('ComponentMgr.RegisterComponent: ID is not set');
      }
      // clone and fill in unspecified default values
      c_Components[component_info.id] = Object.assign({
          isWidget: false,
          isLibrary: false,
          isInitialized: false,
          name: 'unnamed',
          tabTitle: 'unnamed tab',
          tabDesc: false,
          singleton: false
        }, component_info
      );
      return true;
    };

    ComponentMgr.CreateWidgetInstance = async function(component_id, container_el, exec_context) {
      if (component_id === undefined || !(container_el instanceof HTMLElement)) {
        throw new Error('ComponentMgr.CreateWidgetInstance: Bad or missing component_id or container_el!');
      }
      let component_info = ComponentMgr.getComponent(component_id);
      if (component_info === undefined) throw new Error('ComponentMgr.CreateWidgetInstance: Component_id is invalid');
      if (component_info.isWidget === false) throw new Error('ComponentMgr.CreateWidgetInstance: Component_id is not of widget type');
      // TODO: see if widget is a singleton that is already instanciated, return that instance if so

      let instance_id = helpers.ID2String(await helpers.generateID());
      // clone and fill in unspecified default values and save result to closure storage
      // TODO: make this assignment be more specific in copying over info from the component record
      c_Instances[instance_id] = Object.assign({}, component_info, {
          type: component_id,
          isWidget: true,
          loaded: false,
          target_el: container_el,
          exec_ctx: exec_context
      });

      // create the sandboxed iframe and append to the target DOM node
      let iframe = document.createElement('iframe');
      iframe.setAttribute('id', instance_id);
      iframe.setAttribute('sandbox', 'allow-scripts');
      iframe.setAttribute('src', component_info.url);
      container_el.appendChild(iframe);
      c_Instances[instance_id].src_window = iframe.contentWindow;

      // register the component with the EventBus
      c_EventBus.RegisterSource(c_Instances[instance_id].src_window, instance_id);

      // TODO: Confirm this... used to load the scripts in the Component's sandbox
      let scripts = [
        require.toUrl("unitary/stub/ComponentStub"),
        require.toUrl("require")
      ];

      return instance_id;
    };

    ComponentMgr.CreateLibraryInstance = function(component_id, exec_context) {
      // TODO: Create a webworker and load the library with it
    };


    return ComponentMgr;
  };
});
