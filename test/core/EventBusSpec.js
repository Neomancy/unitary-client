/**
 * Created by nbeni on 12/26/2020.
 */

describe('[EventBus]', () => {
  beforeAll(function(done){
    require(['unitary/core/EventBus'], function(EventBusFactory) {
      if (GLOBAL_EventBusFtry === undefined) GLOBAL_EventBusFtry = EventBusFactory;
      done();
    });
  });

  // it('EventBus...', (done) => {
  //   let local_EventBus = GLOBAL_EventBusFtry();
  //   expect(local_EventBus).toBeDefined();
  //   done();
  // });


});
