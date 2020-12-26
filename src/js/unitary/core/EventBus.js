/**
 * Created by nbeni on 12/24/2020.
 */

define([], function() {
  return function() {
    let EventBus = {};
    let c_ComponentInstances = {};
    let c_BroadcastGroups = {};
    let c_window_reference = null;

    EventBus.name = "EventBus";  // used by the logger subsystem

    EventBus.initalize = (window_ref) => {
      if (window_ref === undefined) window_ref = window;
      c_window_reference = window_ref

      c_window_reference.addEventListener("message", (event) => {
        let sender_component = null;
        // find the source window of the event
        for (let component_id in c_ComponentInstances) {
          if (c_ComponentInstances[component_id].iframe_win === event.source) {
            sender_component = c_ComponentInstances[component_id];
            break;
          }
        }

        if (sender_component === null) {
          // log message from unregistered senders as a security violation
          alert("Log/report message from unregistered source!");
          return null;
        }

        console.dir(event.data);

        // TODO: capture and process transactional events

      });
    };

    EventBus.MonitorWidget = (iframe_ref, instance_id) => {

    };

    EventBus.MonitorLibrary = (iframe_ref, instance_id) => {

    };


    EventBus.sendMessage = () => {
      // sends a simplex one-way message to a target
    };

    EventBus.sendTransaction = async (component_id, message, timeout) => {
      // sends a first message and awaits the
      const transaction_promise = new Promise((resolve, reject) => {
        if (timeout !== undefined) {
          const timout_ref = setTimeout(()=>{
            reject({status:"ERROR", message:"Message timeout"});
          }, timeout);
        }
        // TODO: REGISTER MESSAGE AND ITS PROMISE HANDLERS


        // TODO: SEND MESSAGE

      });
      return transaction_promise;
    };


    return EventBus;
  }
});
