/**
 * Created by nbeni on 12/24/2020.
 */

describe('[ComponentMgr]', () => {
  // beforeAll(function(done){
  //   require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
  //     let Mediator = MediatorFtry();
  //     Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
  //     Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
  //     done();
  //   });
  // });

  it('Registers a valid component definition', (done) => {
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
      let Mediator = MediatorFtry();
      Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
      Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
      let local_CompMgr = Mediator.getReference("ComponentMgr");
      let success = local_CompMgr.RegisterComponent({
        id: 'my-test-component',
        title: 'my title'
      });
      expect(success).toBeTrue('RegisterComponent returned FALSE!');
      done();
    });
  });

  it('Fails registration of component with invalid definition', (done) => {
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
      let Mediator = MediatorFtry();
      Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
      Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
      let local_CompMgr = Mediator.getReference("ComponentMgr");
      expect(() => {
        local_CompMgr.RegisterComponent({});
      }).toThrowError('ComponentMgr.RegisterComponent: ID is not set');
      done();
    });
  });

  it('.listComponents()', (done) => {
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
      let Mediator = MediatorFtry();
      Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
      Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
      let local_CompMgr = Mediator.getReference("ComponentMgr");
      local_CompMgr.RegisterComponent({id: 'my-test-component1'});
      local_CompMgr.RegisterComponent({id: 'my-test-component2'});

      let list = local_CompMgr.listComponents();
      expect(list.length).toBe(2);
      expect(list).toContain('my-test-component1');
      expect(list).toContain('my-test-component2');
      done();
    });
  });

  it('.getComponent()', (done) => {
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
      let Mediator = MediatorFtry();
      Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
      Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
      let local_CompMgr = Mediator.getReference("ComponentMgr");
      local_CompMgr.RegisterComponent({id: 'my-test-component1', name: 'test1'});
      local_CompMgr.RegisterComponent({id: 'my-test-component2', name: 'test2'});
      local_CompMgr.RegisterComponent({id: 'my-test-component3', name: 'test3'});

      let component = local_CompMgr.getComponent('my-test-component2');
      expect(component.id).toBe('my-test-component2');
      expect(component.name).toBe('test2');
      done();
    });
  });


  it('.CreateWidgetInstance() creates an iframe', async (done) => {
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus', 'unitary/core/EngineMediator'], function(CompMgrFtry, EventBusFtry, MediatorFtry) {
      let Mediator = MediatorFtry();
      Mediator.setReference("EventBus", EventBusFtry(window, Mediator));
      Mediator.setReference("ComponentMgr", CompMgrFtry(Mediator));
      let local_EventBus = Mediator.getReference("EventBus");
      let local_CompMgr = Mediator.getReference("ComponentMgr");
      let spyEventBus = spyOn(local_EventBus, 'RegisterSource');
      let c_iframe_window = null;
      local_CompMgr.RegisterComponent({
        id: 'my-test-widget',
        name: 'test name',
        tabTitle: 'test tab',
        tabDesc: false,
        isWidget: true,
        url: '/base/test/fixtures/iframe-load.html',
        singleton: false
      });
      // create a DIV to put the widget inside
      let trgt_el = document.createElement('div');
      document.body.appendChild(trgt_el);

      window.addEventListener('message', (event) => {
        if (event.source === c_iframe_window) {
          // this is message from our window
          expect(event.data.msg).toEqual('READY');
          done();
        }
      });

      local_CompMgr.CreateWidgetInstance('my-test-widget', trgt_el, '').then((component) => {
        expect(component).toBeInstanceOf(String);
        expect(trgt_el.childElementCount).toEqual(1);
        let iframe_ref = trgt_el.childNodes[0];
        c_iframe_window = iframe_ref.contentWindow;
        expect(iframe_ref.tagName).toEqual('IFRAME');

        // make sure the EventBus was notified to monitor iframe for events
        expect(local_EventBus.RegisterSource).toHaveBeenCalled();
        let temp = local_EventBus.RegisterSource.calls.argsFor(0);
        expect(temp[0] === c_iframe_window).toBeTrue();
        expect(temp[1] === component).toBeTrue();
      });
    });
  });


});
