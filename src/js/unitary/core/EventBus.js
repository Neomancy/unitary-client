'use strict';
/**
 * Created by nbeni on 12/24/2020.
 * This code exists within the main window.
 */

define([], function(helpers) {

  return function(window_ref, Mediator) {
    const c_ApplicationMgr = Mediator.getReference("ApplicationMgr");
    const c_ComponentMgr = Mediator.getReference("ComponentMgr");
    let EventBus = {};
    let c_SourceInstances = {};
    let c_BroadcastGroups = {};
    let c_TransactionMsgs = {};

    EventBus.name = 'EventBus';  // used by the logger subsystem

    EventBus.debug = function() {
      EventBus.debug = {
        sources: c_SourceInstances,
        broadcast: c_BroadcastGroups,
        window: c_window_reference,
        transactions: c_TransactionMsgs
      };
    };

    // Initialize the EventBus object's event listener
    if (window_ref === undefined) window_ref = window;
    let c_window_reference = window_ref;
    // register the parent window as the source for FRAMEWORK events
    c_SourceInstances['FRAMEWORK'] = c_window_reference;
    // -------------------- <Event Listener> --------------------
    c_window_reference.addEventListener('message', (event) => {
//      console.log(JSON.stringify(event.data));

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
        console.dir(sender_info);
        console.warn('Log/report message from unregistered source!');
        return null;
      }

      // handle the message routing
      const msg_object = event.data;
      // TODO: Develop event bus sniffer functionality
      // c_window_reference.dispatchEvent(new CustomEvent('promiscuous', {detail: {packet: msg_object, actual_sender: sender_info.id}}));

      if (msg_object.header === undefined) return null;
      if (msg_object.header.to !== undefined && c_SourceInstances[msg_object.header.to] === undefined) {
        // log message to unregistered sources as a execution problem
        console.warn('Log/report message to an unknown source!');
        return null;
      }

      // TODO: write security traffic filtering code here!


      // header: {
      //   to: to_instance,
      //   from: from_instance,
      //   broadcast: broadcast_group,
      //   type: msg_type
      //
      // c_TransactionMsgs[txid] = {
      //   request: packet,
      //   response: null,
      //   sent: Date.now(),
      //   recieved: null
      // };


      // TODO: capture and process transactional events if this is a response
      if (msg_object.header.transaction !== undefined) {
        // see if the transaction exists already in store, if not then add it
      }

      // TODO: Forward events to framework modules
      c_window_reference.dispatchEvent(new CustomEvent('framework', {detail: {packet: msg_object, actual_sender: sender_info.id}}));

      if (msg_object.header.from === "AppStub") console.warn("process message from AppStub")
      // -------------------- </Event Listener> --------------------
    });

    EventBus.RegisterSource = (event_source_ref, instance_id) => {
      c_SourceInstances[instance_id] = {id:instance_id, source_ref: event_source_ref};
    };

    // EventBus.RegisterBroadcastSubscriber = function(address, subscriber_id){
    //   if (c_SourceInstances[subscriber_id] === undefined) return false;
    // };
    // EventBus.UnregisterBroadcastSubscriber = function(address, ){
    //   if (c_BroadcastGroups[subscriber_id] === undefined) return false;
    // };

    EventBus.packetize = (to_instance, from_instance, msg_type, message, transaction_id) => {
      let ret = {
        header: {
          to: to_instance,
          from: from_instance,
          type: msg_type
        },
        msg: message
      };
      if (transaction_id !== undefined) ret.header.transaction = transaction_id;
      return ret;
    };


    const c_funcGetDestination = function(packet) {
      // find the destination
      let dest_info = null;
      if (packet.header.to !== undefined) {
        // going to a single entity
        if (c_SourceInstances[packet.header.to] === undefined) {
          dest_info = c_SourceInstances[packet.header.to]
        } else {
          // TODO: Log attempt to send message to invalid address
          console.warn('Invalid \"to\" address!');
        }
      } else if (packet.header.broadcast !== undefined) {
        // going to broadcast group
        if (c_BroadcastGroups[packet.header.broadcast] !== undefined) {
          dest_info = c_BroadcastGroups[packet.header.broadcast];
        } else {
          // TODO: Log attempt to send message to invalid address
          console.warn('Invalid \"broadcast\" address!');
        }
      }
      return dest_info;
    };


    EventBus.sendMessage = (packet) => {
      // sends a simplex one-way message to a target
      const send_promise = new Promise(async (resolve, reject) => {
        // find the destination
        let dest_info = c_funcGetDestination(packet);
        if (dest_info === null) {
          reject({status: 'ERROR', message: 'No or invalid Broadcast/To address specified!'});
        }
        // SEND MESSAGE(s)
        for (let dest_idx in dest_info) {
          let source_rec = c_SourceInstances[dest_info[dest_idx]];
          if (source_rec !== undefined && source_rec.source_ref !== undefined) {
            source_rec.source_ref.postMessage(packet);
          }
        }
        resolve({status: 'OK'});
      });
      return send_promise;
    };

    EventBus.sendBroadcast = (packet) => {
      // sends a simplex one-way message to a broadcast group
      const send_promise = new Promise(async (resolve, reject) => {
        // find the destination
        let dest_info = c_funcGetDestination(packet);
        if (dest_info === null) {
          reject({status: 'ERROR', message: 'No or invalid Broadcast/To address specified!'});
        }
        // SEND MESSAGEs
        for (let dest_idx in dest_info) {
          let source_rec = c_SourceInstances[dest_info[dest_idx]];
          if (source_rec !== undefined && source_rec.source_ref !== undefined) {
            source_rec.source_ref.postMessage(packet);
          }
        }
        resolve({status: 'OK'});
      });
      return send_promise;
    };



    return EventBus;
  }
});
