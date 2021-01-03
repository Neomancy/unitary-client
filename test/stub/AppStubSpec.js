/**
 * Created by nbeni on 12/30/2020.
 */

describe("[AppStub functions]", () => {

  it('All Functions are defined', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      let AW = AppWkr(window, null);
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


  describe("[Context functions]", () => {
    it('.create()', (done) => {
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);

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
          data.header.reply = true;
          data.data = "my-context-id";
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).contexts.create({'foo':'bar'});
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual("my-context-id");
          done();
        });
      });
    });

    it('.delete()', (done) => {
      const ctx_id = 'my-context-id';
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);
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
          data.header.reply = true;
          data.data = ctx_id;
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).contexts.delete(ctx_id);
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual(ctx_id);
          done();
        });
      });
    });

    it('.load()', (done) => {
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);
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
          data.header.reply = true;
          data.data = ctx_id;
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).contexts.load(ctx_id);
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual(ctx_id);
          done();
        });
      });
    });
  });

  describe("[Component functions]", () => {
    it('.listRegistered()', (done) => {
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);
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
          data.header.reply = true;
          data.data = ret_list;
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).components.listRegistered();
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual(ret_list);
          done();
        });
      });
    });

    it('.listInstances()', (done) => {
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);
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
          data.header.reply = true;
          data.data = ret_list;
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).components.listInstances();
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual(ret_list);
          done();
        });
      });
    });

    it('.deleteInstance()', (done) => {
      require(['unitary/stub/AppStub', 'unitary/core/EngineMediator', 'unitary/core/Helpers'], (AppWkr, MediatorFtry, Helpers) => {
        let Mediator = MediatorFtry();
        Mediator.setReference("Helpers", Helpers);
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
          data.header.reply = true;
          data.data = ctx_id;
          msg_win.postMessage(data);
        });
        let prom = AppWkr(msg_win, Mediator).components.deleteInstance(ctx_id);
        expect(prom).toBeInstanceOf(Promise);
        prom.then((result) => {
          expect(result).toEqual(ctx_id);
          done();
        });
      });
    });
  });

});
