/**
 * Created by nbeni on 12/30/2020.
 */


describe('[ApplicationMgr Tests]', () => {

  let c_helpers = null;
  let c_AppMgrFtry = null;

  beforeAll((done) => {
    require([
      'unitary/core/Engine',
      'unitary/core/Helpers',
      'unitary/core/ApplicationMgr'
    ], (engine, helpers, AppMgr) => {

      // create an iframe for use as a loopback
      expect(engine).toBeDefined();
      expect(helper).toBeDefined();
      expect(component).toBeDefined();
      c_AppMgrFtry = AppMgr;
      c_helpers = helpers;
      done();
    });
  });

  // describe('[Display tests]', () => {
  // });
  describe('[Contexts tests]', () => {
    it('create', (done) => {
      require(['unitary/core/ApplicationMgr', 'unitary/core/Helpers'], (AppMgrFtry, helpers) => {
        let txn_id = helpers.popID();
        let mock_EventBus = {SendMessage: (packet) => {
          expect(packet.data).not.toEqual("my-new-context-id");
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
          create: () => {return new Promise((resolve) => { console.warn('run promise'); resolve("my-new-context-id")});}
        }
        let myAppMgr = AppMgrFtry(mock_EventBus, mock_ContextMgr);
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
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
    it('follow', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
    it('list', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
  });
  describe('[Components tests]', () => {
    // TODO: There should also be a create widget
    xit('Create Widget', (done) => {
      done();
    });
    // TODO: There should also be a create library
    xit('Create Library', (done) => {
      done();
    });
    it('List Components', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
    it('List Instances', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
    it('Delete Instances', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
  });
  describe('[Messages tests]', () => {
    it('Send', (done) => {
      require(['unitary/core/ApplicationMgr'], (AppMgrFtry) => {
        done();
      });
    });
  });
  // describe('[DragDrop tests]', () => {
  // });

});

