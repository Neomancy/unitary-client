/**
 * Created by nbeni on 12/24/2020.
 */

let GLOBAL_CompMgrFtry = null;

describe("[ComponentMgr]", () => {
  beforeAll(function(done){
    require(['src/js/unitary/core/ComponentMgr'], function(comp_mgr_factory) {
      GLOBAL_CompMgrFtry = comp_mgr_factory;
      done();
    });
  });

  it('Registers a valid component definition', (done) => {
    let local_CompMgr = GLOBAL_CompMgrFtry();
    let success = local_CompMgr.RegisterComponent({
      id: "my-test-component",
      title: "my title"
    });
    expect(success).toBeTrue("RegisterComponent returned FALSE!");
    done();
  });

  it('Fails registration of component with invalid definition', (done) => {
    let local_CompMgr = GLOBAL_CompMgrFtry();
    expect(() => {
      local_CompMgr.RegisterComponent({});
    }).toThrowError("ComponentMgr.RegisterComponent: ID is not set");
    done();
  });

  it('.listComponents()', (done) => {
    let local_CompMgr = GLOBAL_CompMgrFtry();
    local_CompMgr.RegisterComponent({id: "my-test-component1"});
    local_CompMgr.RegisterComponent({id: "my-test-component2"});

    let list = local_CompMgr.listComponents();
    console.log(list);
    expect(list.length).toBe(2);
    expect(list).toContain("my-test-component1");
    expect(list).toContain("my-test-component2");
    done();
  });

  it('.getComponent()', (done) => {
    let local_CompMgr = GLOBAL_CompMgrFtry();
    local_CompMgr.RegisterComponent({id: "my-test-component1", name:"test1"});
    local_CompMgr.RegisterComponent({id: "my-test-component2", name:"test2"});
    local_CompMgr.RegisterComponent({id: "my-test-component3", name:"test3"});

    let component = local_CompMgr.getComponent("my-test-component2");
    expect(component.id).toBe("my-test-component2");
    expect(component.name).toBe("test2");
    done();
  });


  it('.CreateWidgetInstance() creates an iframe', async (done) => {
    let local_CompMgr = GLOBAL_CompMgrFtry();
    let c_iframe_window = null;
    local_CompMgr.RegisterComponent({
      id: "my-test-widget",
      name: "test name",
      tabTitle: "test tab",
      tabDesc: false,
      isWidget: true,
      url: "/base/test/fixtures/iframe-load.html",
      singleton: false
    });
    // create a DIV to put the widget inside
    let trgt_el = document.createElement("div");
    document.body.appendChild(trgt_el);

    window.addEventListener("message", (event) => {
      if (event.source === c_iframe_window) {
        console.log("got message");
        // this is message from our window
        expect(event.data.msg).toEqual("READY");
        done();
      }
    });

    let component = await local_CompMgr.CreateWidgetInstance("my-test-widget", trgt_el, "");
    expect(component).toBeInstanceOf(ArrayBuffer);
    expect(trgt_el.childElementCount).toEqual(1);
    let iframe_ref = trgt_el.childNodes[0];
    c_iframe_window = iframe_ref.contentWindow;
    expect(iframe_ref.tagName).toEqual("IFRAME");
  });


});
