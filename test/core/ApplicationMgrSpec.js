/**
 * Created by nbeni on 12/30/2020.
 */


describe('[ApplicationMgr Test]', () => {
  beforeAll((done) => {
    require([
      'unitary/core/Engine',
      'unitary/core/Helpers',
      'unitary/core/ComponentMgr'
    ], (engine, helper, component) => {

      // create an iframe for use as a loopback
      expect(engine).toBeDefined();
      expect(helper).toBeDefined();
      expect(component).toBeDefined();
      done();
    });
  });

  it('All Functions are defined', (done) => {
    require(['unitary/stub/AppStub'], (AppWkr) => {
      let aw = AppWkr(window);
      expect(aw.layout).toBeDefined();
      done();
    });
  });
});

