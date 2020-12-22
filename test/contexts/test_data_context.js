
let expect = require('chai').expect;
let ctx = require('../../src/js/ctx/DataContext.js');
let hlpr = require('../../src/js/core/helpers');

describe('#DataContext()', function() {

  context('create', function() {
    it('should return correct class', function() {
      let componentId = hlpr.generateID();
      console.dir(componentId);
      let dataCtx = new ctx.DataContext(componentId);
      expect(dataCtx.constructor.name).to.equal("DataContext")
    })
  })

})
