/**
 * Created by nbeni on 12/26/2020.
 */

let GLOBAL_EventBusFtry = null;

describe("[EventBus]", () => {
  beforeAll(function(done){
    require(["src/js/unitary/core/EventBus"], function(EventBusFactory) {
      GLOBAL_EventBusFtry = EventBusFactory;
      done();
    });
  });

  it("EventBus should initialize", (done) => {
    let local_EventBus = GLOBAL_EventBusFtry();
    let success = local_EventBus.initalize();
    expect(success).toBeTrue("EventBus.initialize() returned FALSE!");
    done();
  });


});
