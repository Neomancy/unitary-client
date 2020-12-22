/**
 * Created by nbeni on 11/19/2020.
 */

define(['src/js/unitary/core/helpers'], function(helpers) {
  "use strict";

  function DataContext(uuidOwner) {
    if (!(this instanceof DataContext)) {
      throw new TypeError("DataContext constructor cannot be called as a function");
    }
    this._data = {};
    this._acl = {
      "owner": uuidOwner,
      "promiscuous": {
        "read": false,
        "write": false
      },
      "elevated": {
        "read": [ /* ids of components/libraries with access */ ],
        "write": [ /* ids of components/libraries with access */ ],
        "permissions": [ /* ids of components/libraries able to change ACL permissions */ ]
      },
      "global": {
        "read": [ /* ids of components/libraries with access */ ],
        "write": [ /* ids of components/libraries with access */ ]
      }
    };

    // create a unique and cryptographically secure ID
    helpers.generateID().then((uuid)=>{
      this.uuidContext = uuid;
    });
  }

  DataContext.prototype = {
    constructor: DataContext,
    _checkLocation: function(location, action) {
      let parts = location.split(".");
      let parts_index = parts.map((r) => {
        let t = r.split("[");
        if (t.length > 1) {
          return parseInt(t[1].replace("]", ""));
        } else {
          return NaN;
        }
      });
      parts = parts.map((r) => {
        return r.split("[")[0];
      });
      let path = [];
      let locs = Object.keys(this._data);
      let found = false;
      do {
        let t = parts.shift();
        path.push(t);
        let pathkey = path.join(".");
        if (locs.indexOf(pathkey) > -1) {
          // found the path record
          let ref = this._data[pathkey];
          while (parts.length > 0 || !Number.isNaN(array_index)) {
            // handle any array index
            let array_index = parts_index[parts.length - 1];
            if (!Number.isNaN(array_index)) {
              // array requested by path object
              if (!Array.isArray(ref)) return false;
              if (ref[array_index] === undefined) return {found: false};
              ref = ref[array_index]
            }
            // sub item by path object
            let sub_path_key = path.shift();
            if (ref[sub_path_key] === undefined) return {found: false};
            ref = ref[sub_path_key];
          }
          // full path processed, exit
          if (parts.length == 0) return ref;
        }
        // break out if it is an index and was not found
        if (!Number.isNaN(parts_index[parts.length - 1])) break;
      } while (false);
      return false;
    },
    _checkACL: function(requester, location, action) {},
    aclElevatedAdd(requester, permissions) {
      /* expected object:
       *  {"read":[List of instance IDs], "write":[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
    },
    aclElevatedDelete(requester, permissions) {
      /* expected object:
       *  {"read":[List of instance IDs], "write":[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
    },
    aclGlobalAdd(requester, permissions) {
      /* expected object:
       *  {"read":[List of instance IDs], "write":[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
    },
    aclGlobalDelete(requester, permissions) {
      /* expected object:
       *  {"read":[List of instance IDs], "write":[List of instance IDs]}
       *  lists can also contain strings for lib/component classes
       * */
    },
    aclPromiscuous(requester, boolObj) {
      /* expected object:
       *  {"read":True, "write":false} OR
       *  {"read":True} OR
       *  {"write":false}
       */
    },
    get(requester, path) {},
    set(requester, path, value, acl = false ) {
      /* requester - the requester ID
       * path - the path for the variable of interest
       * value - what to set the variable of interest to
       * acl - object {"read":"pge", write:"e"}
       *     - where Promiscuous
       * */

      this._data
    },
    delete(requester, path) {},
    curryPath(path) { /* returns a DataContextCurried object */}

  };

  return {
    "DataContext": DataContext
  };
});

//let hlpr = require(['../core/helpers']);
// class DataContext {
//   #acl;
//   #ctx_id;
//   constructor(uuidOwner, funcUUID) {
//     this.#acl = {
//       "owner": uuidOwner,
//       "promiscuous": {
//         "read": false,
//         "write": false
//       },
//       "elevated": {
//         "read": [ /* ids of components/libraries with access */ ],
//         "write": [ /* ids of components/libraries with access */ ],
//         "permissions": [ /* ids of components/libraries able to change ACL permissions */ ]
//       },
//       "global": {
//         "read": [ /* ids of components/libraries with access */ ],
//         "write": [ /* ids of components/libraries with access */ ]
//       }
//     };
//
//     // create a unique and cryptographically secure ID
//     this.#ctx_id = funcUUID;
//   }
//
//   aclElevatedAdd(requester, permissions) {
//     /* expected object:
//      *  {"read":[List of instance IDs], "write":[List of instance IDs]}
//      *  lists can also contain strings for lib/component classes
//      * */
//   }
//   aclElevatedDelete(requester, permissions) {
//     /* expected object:
//      *  {"read":[List of instance IDs], "write":[List of instance IDs]}
//      *  lists can also contain strings for lib/component classes
//      * */
//   }
//   aclGlobalAdd(requester, permissions) {
//     /* expected object:
//      *  {"read":[List of instance IDs], "write":[List of instance IDs]}
//      *  lists can also contain strings for lib/component classes
//      * */
//   }
//   aclGlobalDelete(requester, permissions) {
//     /* expected object:
//      *  {"read":[List of instance IDs], "write":[List of instance IDs]}
//      *  lists can also contain strings for lib/component classes
//      * */
//   }
//   aclPromiscuous(requester, boolObj) {
//     /* expected object:
//      *  {"read":True, "write":false} OR
//      *  {"read":True} OR
//      *  {"write":false}
//      */
//   }
//
//
//   get(requester, path) {}
//   set(requester, path, value, acl = false ) {
//     /* requester - the requester ID
//      * path - the path for the variable of interest
//      * value - what to set the variable of interest to
//      * acl - object {"read":"pge", write:"e"}
//      *     - where Promiscuous
//      * */
//   }
//   delete(requester, path) {}
//
//
//   curry(path) { /* returns a DataContextCurried object */}
// }
