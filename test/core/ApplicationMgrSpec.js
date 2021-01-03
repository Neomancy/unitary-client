/**
 * Created by nbeni on 12/30/2020.
 */


describe('[ApplicationMgr Tests]', () => {

  let c_Mediator= null;

  // describe('[Display tests]', () => {
  // });
  describe('[Contexts tests]', () => {
    it('create', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        let Mediator = MediatorFtry();
        let txn_id = Helpers.popID();
        let mock_EventBus = {SendMessage: (packet) => {
          expect(packet.data).toEqual("my-new-context-id");
          delete packet.data;
          expect(packet).toEqual({
            header: {
              to: 'AppStub',
              from: 'AppMgr',
              action: 'context:create',
              reply: true,
              transaction: txn_id
            }
          });
          done();
        }};
        let mock_ContextMgr = {
          create: () => {return new Promise((resolve) => { resolve("my-new-context-id")});}
        };
        Mediator.setReference('EventBus', mock_EventBus);
        Mediator.setReference('ContextMgr', mock_ContextMgr);
        Mediator.setReference('Helpers', Helpers);
        let myAppMgr = AppMgrFtry(Mediator);
        myAppMgr.ReceiveMessage({
          header: {
            to: 'AppMgr',
            from: 'AppStub',
            action: 'context:create',
            transaction: txn_id
          }, data: null
        });
      });
    });
    it('delete', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        let Mediator = MediatorFtry();
        let txn_id = Helpers.popID();
        let ctx_id = "my-existing-context-id";
        let mock_EventBus = {SendMessage: (packet) => {
          expect(packet.data).toEqual(ctx_id);
          delete packet.data;
          expect(packet).toEqual({
            header: {
              to: 'AppStub',
              from: 'AppMgr',
              action: 'context:delete',
              reply: true,
              transaction: txn_id
            }
          });
          done();
        }};
        let mock_ContextMgr = {
          delete: (id) => {return new Promise((resolve) => {
            expect(id).toEqual(ctx_id);
            resolve("my-existing-context-id")});
          }
        };
        Mediator.setReference('EventBus', mock_EventBus);
        Mediator.setReference('ContextMgr', mock_ContextMgr);
        Mediator.setReference('Helpers', Helpers);
        let myAppMgr = AppMgrFtry(Mediator);
        myAppMgr.ReceiveMessage({
          header: {
            to: 'AppMgr',
            from: 'AppStub',
            action: 'context:delete',
            transaction: txn_id
          }, data: ctx_id
        });
      });
    });
    it('follow', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        let Mediator = MediatorFtry();
        let txn_id = Helpers.popID();
        let ctx_id = "my-existing-context-id";
        let mock_EventBus = {SendMessage: (packet) => {
          expect(packet.data).toEqual(ctx_id);
          delete packet.data;
          expect(packet).toEqual({
            header: {
              to: 'AppStub',
              from: 'AppMgr',
              action: 'context:follow',
              reply: true,
              transaction: txn_id
            }
          });
          done();
        }};
        let mock_ContextMgr = {
          follow: (id) => {return new Promise((resolve) => {
            expect(id).toEqual(ctx_id);
            resolve(ctx_id)});
          }
        };
        Mediator.setReference('EventBus', mock_EventBus);
        Mediator.setReference('ContextMgr', mock_ContextMgr);
        Mediator.setReference('Helpers', Helpers);
        let myAppMgr = AppMgrFtry(Mediator);
        myAppMgr.ReceiveMessage({
          header: {
            to: 'AppMgr',
            from: 'AppStub',
            action: 'context:follow',
            transaction: txn_id
          }, data: ctx_id
        });
      });
    });
    it('list', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        let Mediator = MediatorFtry();
        let txn_id = Helpers.popID();
        let mock_EventBus = {SendMessage: (packet) => {
          expect(packet.data).toEqual("my-existing-context-id");
          delete packet.data;
          expect(packet).toEqual({
            header: {
              to: 'AppStub',
              from: 'AppMgr',
              action: 'context:list',
              reply: true,
              transaction: txn_id
            }
          });
          done();
        }};
        let mock_ContextMgr = {
          list: () => {return new Promise((resolve) => { resolve("my-existing-context-id")});}
        };
        Mediator.setReference('EventBus', mock_EventBus);
        Mediator.setReference('ContextMgr', mock_ContextMgr);
        Mediator.setReference('Helpers', Helpers);
        let myAppMgr = AppMgrFtry(Mediator);
        myAppMgr.ReceiveMessage({
          header: {
            to: 'AppMgr',
            from: 'AppStub',
            action: 'context:list',
            transaction: txn_id
          }, data: null
        });
      });
    });
  });
  describe('[Components tests]', () => {
    // TODO: There should also be a create widget
    xit('Create Widget', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
    // TODO: There should also be a create library
    xit('Create Library', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
    xit('List Components', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
    xit('List Instances', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
    xit('Delete Instances', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
  });
  describe('[Messages tests]', () => {
    xit('Send', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers', 'unitary/core/EngineMediator'], (AppMgrFtry, Helpers, MediatorFtry) => {
        done();
      });
    });
  });
  // describe('[DragDrop tests]', () => {
  // });

});

