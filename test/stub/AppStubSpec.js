/**
 * Created by nbeni on 12/30/2020.
 */

describe("[AppWorker functions]", () => {

  beforeAll((done) => {
    require([
      "unitary/core/Engine",
      "unitary/core/Helpers",
      "unitary/core/ComponentMgr"
    ], (engine, helper, component) => {
      expect(engine).not.toBe(undefined);
      expect(helper).not.toBe(undefined);
      expect(component).not.toBe(undefined);
      done();
    });
  });



  it('All Functions are defined', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      let AW = AppWkr(window);
      expect(AW.layout).toBeDefined();

      expect(AW.contexts).toBeDefined();
      expect(typeof AW.contexts.create).toBe('function');
      expect(typeof AW.contexts.delete).toBe('function');
      expect(typeof AW.contexts.load).toBe('function');
      expect(typeof AW.contexts.list).toBe('function');

      expect(AW.components).toBeDefined();
      expect(typeof AW.components.listRegistered).toBe('function');
      expect(typeof AW.components.listInstances).toBe('function');
      expect(typeof AW.components.deleteInstance).toBe('function');

      expect(AW.messages).toBeDefined();
      expect(typeof AW.messages.sendMessage).toBe('function');
      expect(typeof AW.messages.sendTransaction).toBe('function');
      done();
    });
  });

  it('.contexts.create()', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"context:create"},"data":{"options":{"foo":"bar"}}}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = "my-context-id";
        data.header.action = "context:create<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).contexts.create({'foo':'bar'});
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual("my-context-id");
        done();
      });
    });
  });

  it('.contexts.delete()', (done) => {
    const ctx_id = 'my-context-id';
    require(['unitary/stub/AppStub'], (AppWkr) => {
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"context:delete"},"data":"'+ctx_id+'"}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = ctx_id;
        data.header.action = "context:delete<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).contexts.delete(ctx_id);
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual(ctx_id);
        done();
      });
    });
  });

  it('.contexts.load()', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      const ctx_id = 'my-context-id';
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"context:follow"},"data":"'+ctx_id+'"}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = ctx_id;
        data.header.action = "context:follow<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).contexts.load(ctx_id);
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual(ctx_id);
        done();
      });
    });
  });

  it('.components.listRegistered()', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      const ret_list = ['my-context-id1','my-context-id2'];
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"components:list"},"data":null}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = ret_list;
        data.header.action = "components:list<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).components.listRegistered();
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual(ret_list);
        done();
      });
    });
  });

  it('.components.listInstances()', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      const ret_list = ['my-context-id1','my-context-id2'];
      const ctx_id = 'my-context-id';
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"instances:list"},"data":null}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = ret_list;
        data.header.action = "instances:list<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).components.listInstances();
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual(ret_list);
        done();
      });
    });
  });


  it('.components.deleteInstance()', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      const ctx_id = 'my-context-id';
      let iframe = window.document.createElement('iframe');
      let body = window.document.getElementsByTagName("body")[0];
      body.appendChild(iframe);
      let msg_win = iframe.contentWindow;
      msg_win.addEventListener('message', (event) => {
        const data = event.data;
        if (data.header.to !== "AppMgr") return;
        let tmp = data.header.transaction;
        delete data.header.transaction;
        expect(JSON.stringify(data)).toBe('{"header":{"to":"AppMgr","from":"AppStub","action":"instances:delete"},"data":"'+ctx_id+'"}');
        // send response
        data.header.transaction = tmp;
        tmp = data.header.to;
        data.header.to = data.header.from;
        data.header.from = tmp;
        data.data = ctx_id;
        data.header.action = "instances:delete<reply";
        msg_win.postMessage(data);
      });
      let prom = AppWkr(msg_win).components.deleteInstance(ctx_id);
      expect(prom).toBeInstanceOf(Promise);
      prom.then((result) => {
        expect(result).toEqual(ctx_id);
        done();
      });
    });
  });

});
