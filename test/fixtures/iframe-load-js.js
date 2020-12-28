/**
 * Created by nbeni on 12/26/2020.
 */
console.log("loaded JS file");
window.parent.postMessage({header: {to: "ComponentMgr", type: "MGMT"}, msg: "READY"}, "*");
alert("loaded JS file");
