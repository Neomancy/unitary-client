/**
 * Created by nbeni on 11/19/2020.
 */
define([], function() {
  let helper = {};

  async function generateID() {
    let str = Date() + Math.random();
    let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    let bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return await crypto.subtle.digest("SHA-512", bufView);
  };
  helper.generateID =  generateID;

  return helper;

});
