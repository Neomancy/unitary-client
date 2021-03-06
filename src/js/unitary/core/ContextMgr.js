'use strict';
/**
 * Created by nbeni on 12/6/2020.
 * This code exists within the main window.
 */

define(function() {

  let c_CtxReferences = {};
  let CtxMgr = {};

  // ---------------------------------------------------------------------------
  CtxMgr.init = () => {
    console.warn("initialize the module to listen for framework events");
  }
  CtxMgr.create = () => {
    // creates a new context [APP ONLY]
  };
  CtxMgr.delete = (ctx_id, requestor) => {
    // deletes a given context [APP ONLY]
    if (c_CtxReferences[ctx_id] === undefined) return false;
    delete c_CtxReferences[ctx_id];
    // TODO: Broadcast that a change has occurred
  };
  // ---------------------------------------------------------------------------
  CtxMgr.list = () => {
    // lists all contexts [APP ONLY]
    return Object.keys(c_CtxReferences);
  };
  CtxMgr.contents = (ctx_id, requestor) => {
    // lists the items within a given context
    if (c_CtxReferences[ctx_id] === undefined) return false;
    return c_CtxReferences[ctx_id].list(requestor);
  };
  // ---------------------------------------------------------------------------
  CtxMgr.follow = (ctx_id, requestor, callback) => {
    // register a callback to be triggered when there is changes to a context
  };
  CtxMgr.unfollow = (ctx_id, requestor) => {
    // unregister a changes-to-context activated callback
  };





  return CtxMgr;
});
