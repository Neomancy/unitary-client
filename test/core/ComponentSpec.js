/**
 * Created by nbeni on 12/24/2020.
 */

let GLOBAL_CompMgrFtry = null;
let GLOBAL_EventBusFtry = null;

describe('[ComponentMgr]', () => {
  beforeAll(function(done){
    require(['unitary/core/ComponentMgr', 'unitary/core/EventBus'], function(comp_mgr_factory, event_bus_factory) {
      GLOBAL_CompMgrFtry = comp_mgr_factory;
      GLOBAL_EventBusFtry = event_bus_factory;
      done();
    });
  });

  it('Registers a valid component definition', (done) => {
    let local_EventBus = GLOBAL_EventBusFtry(window);
    let local_CompMgr = GLOBAL_CompMgrFtry(local_EventBus);
    let success = local_CompMgr.RegisterComponent({
      id: 'my-test-component',
      title: 'my title'
    });
    expect(success).toBeTrue('RegisterComponent returned FALSE!');
    done();
  });

  it('Fails registration of component with invalid definition', (done) => {
    let local_EventBus = GLOBAL_EventBusFtry(window);
    let local_CompMgr = GLOBAL_CompMgrFtry(local_EventBus);
    expect(() => {
      local_CompMgr.RegisterComponent({});
    }).toThrowError('ComponentMgr.RegisterComponent: ID is not set');
    done();
  });

  it('.listComponents()', (done) => {
    let local_EventBus = GLOBAL_EventBusFtry(window);
    let local_CompMgr = GLOBAL_CompMgrFtry(local_EventBus);
    local_CompMgr.RegisterComponent({id: 'my-test-component1'});
    local_CompMgr.RegisterComponent({id: 'my-test-component2'});

    let list = local_CompMgr.listComponents();
    expect(list.length).toBe(2);
    expect(list).toContain('my-test-component1');
    expect(list).toContain('my-test-component2');
    done();
  });

  it('.getComponent()', (done) => {
    let local_EventBus = GLOBAL_EventBusFtry(window);
    let local_CompMgr = GLOBAL_CompMgrFtry(local_EventBus);
    local_CompMgr.RegisterComponent({id: 'my-test-component1', name:'test1'});
    local_CompMgr.RegisterComponent({id: 'my-test-component2', name:'test2'});
    local_CompMgr.RegisterComponent({id: 'my-test-component3', name:'test3'});

    let component = local_CompMgr.getComponent('my-test-component2');
    expect(component.id).toBe('my-test-component2');
    expect(component.name).toBe('test2');
    done();
  });


  it('.CreateWidgetInstance() creates an iframe', async (done) => {
    let local_EventBus = GLOBAL_EventBusFtry(window);
    let spyEventBus = spyOn(local_EventBus, 'RegisterSource');
    let local_CompMgr = GLOBAL_CompMgrFtry(local_EventBus);
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

    let component = await local_CompMgr.CreateWidgetInstance('my-test-widget', trgt_el, '');
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
