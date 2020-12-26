/**
 * Created by nbeni on 12/24/2020.
 */

describe('[Engine functions]', () => {
  beforeAll((done) => {
    require([
      'src/js/unitary/core/Engine',
      'src/js/unitary/core/Helpers',
      'src/js/unitary/core/ComponentMgr'
    ], (engine, helper, component) => {
      expect(engine).not.toBe(undefined);
      expect(helper).not.toBe(undefined);
      expect(component).not.toBe(undefined);
      done();
    });
  });

  describe('READY FOR PROD?', () => {
    it('Check for debug functions presence (should pass for production rollout)', (done) => {
      require(['src/js/unitary/core/Engine'], (engine) => {
        console.log("This test should pass for production rollout!");
        let module = "";
        expect(Unitary).toBeDefined();
        console.log(JSON.stringify(Unitary));
        for (module in Unitary) {
          console.log("Checking that [Unitary."+module+".debug] is not present");
          expect(Unitary[module].debug).not.toBeDefined();
        }
        done();
      });
    });
  });
});
