'use strict';
/**
 * Created by nbeni on 12/30/2020.
 * This code exists within the application web worker, Widgets and Libraries
 */

define([], function() {

  async function ContextRemoteImpl (context_id) {
    if (!(this instanceof ContextRemoteImpl)) {
      throw new TypeError('ContextRemoteImpl constructor cannot be called as a function');
    }
    this.context_id = context_id
    this.loaded = false;
    this.errors = [];


  }


  ContextRemoteImpl.prototype = {
    constructor: ContextRemoteImpl,
    aclElevatedAdd(requester, permissions) {},
    aclElevatedDelete(requester, permissions) {},
    aclNormalAdd(requester, permissions) {},
    aclNormalDelete(requester, permissions) {},
    aclGlobal(requester, boolObj) {},
    get(key) {},
    set(key, data) {}
  };



  return ContextRemoteImpl;

});

