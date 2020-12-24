/**
 * Created by nbeni on 12/24/2020.
 */


describe("[Components]", () => {
  it('App Component creates a WebWorker', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      expect(dctx).toBeDefined();
      let test = new dctx.DataContext();
      expect(test).toBeInstanceOf(dctx.DataContext);
      done();
    });
  });
});
