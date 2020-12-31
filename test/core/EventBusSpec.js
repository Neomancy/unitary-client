/**
 * Created by nbeni on 12/26/2020.
 */

let GLOBAL_EventBusFtry = null;

describe('[EventBus]', () => {
  beforeAll(function(done){
    require(['unitary/core/EventBus'], function(EventBusFactory) {
      GLOBAL_EventBusFtry = EventBusFactory;
      done();
    });
  });

  it('EventBus...', (done) => {
    let local_EventBus = GLOBAL_EventBusFtry();
    expect(true).toBeTrue();
    done();
  });


});
