/**
 * Created by nbeni on 12/28/2020.
 */


describe('[App Test]', () => {
  describe('[AppWorker Stub]', () => {
    beforeAll((done) => {
      require([
        'unitary/core/Engine',
        'unitary/core/Helpers',
        'unitary/core/ComponentMgr'
      ], (engine, helper, component, module) => {
        expect(engine).toBeDefined();
        expect(helper).toBeDefined();
        expect(component).toBeDefined();
        done();
      });
    });
  });
});

