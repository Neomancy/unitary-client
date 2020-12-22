/**
 * Created by nbeni on 11/22/2020.
 */


describe("[DataContext Object creation]", () => {
  it('function exists', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      expect(dctx).toBeDefined();
      let test = new dctx.DataContext();
      expect(test).toBeInstanceOf(dctx.DataContext);
      done();
    });
  });
});


describe("[DataContext _checkLocation]", () => {
  it('function exists', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      expect(typeof test._checkLocation).toEqual("function");
      done();
    });
  });

  it('read invalid simple location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      expect(test._checkLocation("bad_loc")).toEqual(false);
      done();
    });
  });

  it('read valid simple location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = "foobar";
      expect(test._checkLocation("my_loc")).toEqual(true);
      done();
    });
  });

  it('read valid nested location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = {"sub_item": "foobar"};
      expect(test._checkLocation("my_loc.sub_item")).toEqual(true);
      done();
    });
  });

  it('read invalid nested location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = {"sub_item": "foobar"};
      expect(test._checkLocation("my_loc.bad_sub_item")).toEqual(false);
      done();
    });
  });

  it('read valid arrayed location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_array"] = ["foobar"];
      expect(test._checkLocation("my_array[0]")).toEqual(true);
      done();
    });
  });

  it('read invalid arrayed location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_array"] = ["foobar"];
      expect(test._checkLocation("my_array[999]")).toEqual(false);
      done();
    });
  });

});



describe("[DataContext _checkLocation2]", () => {
  it('function exists', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      expect(typeof test._checkLocation).toEqual("function");
      done();
    });
  });

  it('read invalid simple location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      expect(test._checkLocation("bad_loc")).toEqual(false);
      done();
    });
  });

  it('read valid simple location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = "foobar";
      expect(test._checkLocation("my_loc")).toEqual(true);
      done();
    });
  });

  it('read valid nested location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = {"sub_item": "foobar"};
      expect(test._checkLocation("my_loc.sub_item")).toEqual(true);
      done();
    });
  });

  it('read invalid nested location', (done) => {
    require(['src/js/unitary/ctx/DataContext'], function(dctx) {
      let test = new dctx.DataContext();
      test._data["my_loc"] = {"sub_item": "foobar"};
      expect(test._checkLocation("my_loc.bad_sub_item")).toEqual(true);
      done();
    });
  });
});


