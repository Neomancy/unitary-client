/**
 * Created by nbeni on 12/6/2020.
 */

define(function() {
  "use strict";

  let CtxMgr = {
    "data": {},
    "exec": {}
  };

  CtxMgr.data._ctx = {};
  CtxMgr.data.ctxList = function() {
    return Object.keys(CtxMgr.data._ctx);
  };
  CtxMgr.data.ctxAdd = function() {};
  CtxMgr.data.ctxRemove = function(path) {};
  CtxMgr.data.read = function(component, path) {};
  CtxMgr.data.write = function(component, path) {};


  CtxMgr.exec._ctx = {};
  CtxMgr.exec.ctxList = function() {
    return Object.keys(CtxMgr.exec._ctx);
  };
  CtxMgr.exec.ctxAdd = function() {};
  CtxMgr.exec.ctxRemove = function() {};


  return CtxMgr;
});
