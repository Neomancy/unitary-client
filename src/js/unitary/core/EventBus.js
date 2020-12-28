/**
 * Created by nbeni on 12/24/2020.
 */

define(["src/js/unitary/core/Helpers"], function(helpers) {
  return function(window_ref) {
    let EventBus = {};
    let c_SourceInstances = {};
    let c_BroadcastGroups = {};
    let c_transaction_msgs = {};

    EventBus.name = "EventBus";  // used by the logger subsystem

    EventBus.debug = function() {
      EventBus.debug = {
        sources: c_SourceInstances,
        broadcast: c_BroadcastGroups,
        window: c_window_reference,
        transactions: c_transaction_msgs
      };
    };

    // Initialize the EventBus object's event listener
    if (window_ref === undefined) window_ref = window;
    let c_window_reference = window_ref;
    // -------------------- <Event Listener> --------------------
    c_window_reference.addEventListener("message", (event) => {
      let sender_info = null;
      // find the source window of the event
      for (let source_id in c_SourceInstances) {
        if (c_SourceInstances[source_id].source_ref === event.source) {
          sender_info = c_SourceInstances[source_id];
          break;
        }
      }
      // address if the event came from an unregistered source
      if (sender_info === null) {
        // log message from unregistered senders as a security violation
        alert("Log/report message from unregistered source!");
        return null;
      }
      // handle the message routing
      const msg_object = event.data;
      if (c_SourceInstances[msg_object.header.to] === undefined) {
        // log message to unregistered sources as a execution problem
        alert("Log/report message to an unknown source!");
        return null;
      }

      // TODO: write security traffic filtering code here!


      // header: {
      //   to: to_instance,
      //   from: from_instance,
      //   broadcast: broadcast_group,
      //   type: msg_type
      //
      // c_transaction_msgs[txid] = {
      //   request: packet,
      //   response: null,
      //   sent: Date.now(),
      //   recieved: null
      // };


      // TODO: capture and process transactional events if this is a response
      if (msg_object.header.transaction !== undefined) {
        // see if the transaction exists already in store, if not then add it



      }
      // -------------------- </Event Listener> --------------------
    });

    EventBus.MonitorSource = (event_source_ref, instance_id) => {
      c_SourceInstances[instance_id] = {source_ref: event_source_ref};
    };

    EventBus.packetize = (to_instance, from_instance, msg_type, message) => {
      return {
        header: {
          to: to_instance,
          from: from_instance,
          type: msg_type
        },
        msg: message
      };
    };

    EventBus.sendMessage = (packet) => {
      // sends a simplex one-way message to a target

    };

    EventBus.sendTransaction = (packet, timeout) => {
      // sends a first message and awaits the
      const transaction_promise = new Promise(async (resolve, reject) => {
        if (timeout !== undefined) {
          const timout_ref = setTimeout(() => {
            reject({status:"ERROR", message:"Message timeout"});
          }, timeout);
        }



        // TODO: REGISTER MESSAGE AND ITS PROMISE HANDLERS
        let txid = await helpers.generateID();
        packet.header["transaction"] = txid;
        c_transaction_msgs[txid] = {
          request: packet,
          response: null,
          sent: Date.now(),
          recieved: null
        };

        // TODO: SEND MESSAGE
        if (packet.header["to"]
        for (let source_id in c_SourceInstances) {
          if (c_SourceInstances[source_id].source_ref === event.source) {
            sender_info = c_SourceInstances[source_id];
            break;
          }
        }

        // header: {
        //   to: to_instance,
        //   from: from_instance,
        //   type: msg_type


      });
      return transaction_promise;
    };


    return EventBus;
  }
});
