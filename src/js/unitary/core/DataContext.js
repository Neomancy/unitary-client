'use strict';
/**
 * Created by nbeni on 11/19/2020.
 * This code exists within the main window with access provided by
 */

define([
  'unitary/core/Helpers'
], function(helpers) {

  function DataContext(uuidOwner) {
    if (!(this instanceof DataContext)) {
      throw new TypeError('DataContext constructor cannot be called as a function');
    }
    this._data = {};
    this._acl = {
      'owner': uuidOwner,
      'global': {
        'read': false,
        'write': false
      },
      'elevated': {
        'read': [ /* ids of components/libraries with access */ ],
        'write': [ /* ids of components/libraries with access */ ],
        'permissions': [ /* ids of components/libraries able to change ACL permissions */ ]
      },
      'normal': {
        'read': [ /* ids of components/libraries with access */ ],
        'write': [ /* ids of components/libraries with access */ ]
      }
    };

    // create a unique and cryptographically secure ID
    helpers.generateID().then((uuid)=>{
      this.uuidContext = helpers.ID2String(uuid);
    });
  }

  let closure_funcAdd = function(base_ref, permissions) {
    if (Array.isArray(permissions.read)) {
      for (let idx in permissions.read) {
        let target_uuid = permissions.read[idx];
        if (!base_ref.read.includes(target_uuid)) {
          base_ref.read.push(target_uuid);
        }
      }
    }
    if (Array.isArray(permissions.write)) {
      for (let idx in permissions.write) {
        let target_uuid = permissions.write[idx];
        if (!base_ref.write.includes(target_uuid)) {
          base_ref.write.push(target_uuid);
        }
      }
    }
  };
  let closure_funcDelete = function(base_ref, permissions) {
    if (Array.isArray(permissions.read)) {
      for (let idx in permissions.read) {
        let target_uuid = permissions.read[idx];
        if (base_ref.read.includes(target_uuid)) {
          base_ref.read = base_ref.read.filter((uuid) => {
            uuid != target_uuid
          });
        }
      }
    }
    if (Array.isArray(permissions.write)) {
      for (let idx in permissions.write) {
        let target_uuid = permissions.write[idx];
        if (base_ref.write.includes(target_uuid)) {
          base_ref.write = base_ref.write.filter((uuid) => {
            uuid != target_uuid
          });
        }
      }
    }
  }

  DataContext.prototype = {
    constructor: DataContext,
    aclElevatedAdd(requestor, permissions) {
      /* expected object:
       *  {'read':[List of instance IDs], 'write':[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
      if (requestor == "APP" || requestor == this._acl.owner || this._acl.elevated.permissions.includes(requestor) === true) {
        closure_funcAdd(this._acl.elevated, permissions);
        return true;
      } else {
        return false;
      }
    },
    aclElevatedDelete(requestor, permissions) {
      /* expected object:
       *  {'read':[List of instance IDs], 'write':[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
      if (requestor == "APP" || requestor == this._acl.owner || this._acl.elevated.permissions.includes(requestor) === true) {
        closure_funcDelete(this._acl.elevated, permissions);
        return true;
      } else {
        return false;
      }
    },
    aclNormalAdd(requestor, permissions) {
      /* expected object:
       *  {'read':[List of instance IDs], 'write':[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
      if (requestor == "APP" || requestor == this._acl.owner || this._acl.elevated.permissions.includes(requestor) === true) {
        closure_funcAdd(this._acl.normal, permissions);
        return true;
      } else {
        return false;
      }
    },
    aclNormalDelete(requestor, permissions) {
      /* expected object:
       *  {'read':[List of instance IDs], 'write':[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
      if (requestor == "APP" || requestor == this._acl.owner || this._acl.elevated.permissions.includes(requestor) === true) {
        closure_funcDelete(this._acl.normal, permissions);
        return true;
      } else {
        return false;
      }
    },
    aclGlobal(requestor, boolObj) {
      /* expected object:
       *  {'read':True, 'write':false} OR
       *  {'read':True} OR
       *  {'write':false}
       */
      if (requestor == "APP" || requestor == this._acl.owner || this._acl.elevated.permissions.includes(requestor) === true) {
        if (boolObj.read !== undefined && boolObj.read == true) {
          this._acl.global.read = true;
        } else {
          this._acl.global.read = false;
        }
        if (boolObj.write !== undefined && boolObj.write == true) {
          this._acl.global.write = true;
        } else {
          this._acl.global.write = false;
        }
        return true;
      } else {
        return false;
      }
    },

    list(requestor) {
      if (requestor == "APP" ||
          requestor == this._acl.owner ||
          this._acl.elevated.read.includes(requestor) === true ||
          this._acl.normal.read.includes(requestor) === true ||
          this._acl.global.read === true)
      {
        console.error("list the paths within this context");
      }
    },
    get(requestor, path) {
      if (requestor == "APP" ||
        requestor == this._acl.owner ||
        this._acl.elevated.read.includes(requestor) === true ||
        this._acl.normal.read.includes(requestor) === true ||
        this._acl.global.read === true)
      {
        console.error("read the given path within this context");
      }
    },
    set(requestor, path, value, acl = false ) {
      /* requestor - the requestor ID
       * path - the path for the variable of interest
       * value - what to set the variable of interest to
       * acl - object {'read':'pge', write:'e'}
       *     - where Promiscuous
       * */
      if (requestor == "APP" ||
        requestor == this._acl.owner ||
        this._acl.elevated.write.includes(requestor) === true ||
        this._acl.normal.write.includes(requestor) === true ||
        this._acl.global.write === true)
      {
        console.error("write to the given path within this context");
      }
      return null;
    },
    delete(requestor, path) {
      if (requestor == "APP" ||
        requestor == this._acl.owner ||
        this._acl.elevated.write.includes(requestor) === true ||
        this._acl.normal.write.includes(requestor) === true ||
        this._acl.global.write === true)
      {
        console.error("delete the given path within this context");
      }
    }

  };

  return {
    'DataContext': DataContext
  };
});
