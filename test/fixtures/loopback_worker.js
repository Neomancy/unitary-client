/**
 * Created by nbeni on 12/30/2020.
 */

onmessage = (e) => {
  const msg = e.data;
  console.dir(msg);
  postMessage(msg);
};
