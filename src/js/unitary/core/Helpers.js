'use strict';
/**
 * Created by nbeni on 11/19/2020.
 * This code can exist anywhere.
 */

define([], function() {
  let helper = {};

  helper.pool = [];

  helper.generator = async function() {
    while (helper.pool.length < 500) {
      helper.pool.push(await helper.generateID());
    }
  };

  setInterval(helper.generator, 50);

  helper.init = function() {
    helper.generator();
  };

  helper.popID = function() {
    return helper.ID2String(helper.pool.pop());
  };

  helper.generateID = async function generateID() {
    // Framework was designed assuming this function
    // is cryptographically secure to protect
    // against possible collision attacks
    let str = Date() + Math.random();
    let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    let bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return await crypto.subtle.digest('SHA-512', bufView);
  };

  helper.ID2String = function (id_array) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(id_array))).replaceAll('=','').replaceAll('/','-')
  };

  helper.String2ID = function (id_string) {
    let temp = id_string.replaceAll('-', '/');
    temp = atob(temp + '='.repeat(4 - (id_string.length % 4)));
    let bytes = new Uint8Array(temp.length);
    let len = bytes.length;
    for (let i=0; i<len; i++) {
      bytes[i] = temp.charCodeAt(i);
    }
    return bytes.buffer;
  };

  return helper;

});
