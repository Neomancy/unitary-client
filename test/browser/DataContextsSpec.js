/**
 * Created by nbeni on 11/22/2020.
 */
describe("[DataContext functionality]", () => {


  describe("[Object creation & defaults]", () => {
    it('constructor exists', (done) => {
      require(['src/js/unitary/ctx/DataContext'], function(dctx) {
        expect(dctx).toBeDefined();
        let test = new dctx.DataContext();
        expect(test).toBeInstanceOf(dctx.DataContext);
        done();
      });
    });

    it('owner_id is correctly set', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.owner).toEqual(owner);
        done();
      })(dctx, helpers)});
    });

    // ### Defaults ###
    it('default elevated read=[]', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.elevated.read).toEqual([]);
        done();
      })(dctx, helpers)});
    });
    it('default elevated write=[]', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.elevated.write).toEqual([]);
        done();
      })(dctx, helpers)});
    });
    it('default normal read=[]', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.normal.read).toEqual([]);
        done();
      })(dctx, helpers)});
    });
    it('default normal write=[]', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.normal.write).toEqual([]);
        done();
      })(dctx, helpers)});
    });
    it('default globals read=false', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.global.read).toBe(false);
        done();
      })(dctx, helpers)});
    });
    it('default globals write=false', (done) => {
      require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
        let owner = helpers.generateID();
        let test_ctx = new dctx.DataContext(owner);
        expect(test_ctx._acl.global.write).toBe(false);
        done();
      })(dctx, helpers)});
    });
  });


  describe("[ACL tests]", () => {
    describe("Elevated-level modifications", () => {
      // ### Elevate Read ###
      it('owner elevated read add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclElevatedAdd(owner, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('owner elevated read delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = await helpers.generateID();
          let mod_uuid = await helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.read.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(owner, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid elevated read add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclElevatedAdd(permitted, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid elevated read delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.elevated.read.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(permitted, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid elevated read add fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclElevatedAdd(unpermitted, {"read": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.elevated.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid elevated read delete fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.elevated.read.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(unpermitted, {"read": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.elevated.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      // ### Elevate Write ###
      it('owner elevated write add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclElevatedAdd(owner, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('owner elevated write delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.write.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(owner, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid elevated write add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclElevatedAdd(permitted, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid elevated write delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.elevated.read.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(permitted, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.elevated.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid elevated write add fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclElevatedAdd(unpermitted, {"write": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.elevated.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid elevated write delete fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.elevated.write.push(mod_uuid);
          expect(test_ctx.aclElevatedDelete(unpermitted, {"write": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.elevated.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
    });

    describe("Normal-level modifications", () => {
      // ### Normal Read ###
      it('owner normal read add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclNormalAdd(owner, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('owner normal read delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.normal.read.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(owner, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid normal read add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclNormalAdd(permitted, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid normal read delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.normal.read.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(permitted, {"read": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid normal read add fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclNormalAdd(unpermitted, {"read": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.normal.read).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid normal read delete fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.normal.read.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(unpermitted, {"read": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.normal.read).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      // ### Normal Write ###
      it('owner normal write add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclNormalAdd(owner, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('owner normal write delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.normal.write.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(owner, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid normal write add success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclNormalAdd(permitted, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid normal write delete success', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.normal.read.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(permitted, {"write": [mod_uuid]})).toEqual(true);
          expect(test_ctx._acl.normal.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid normal write add fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclNormalAdd(unpermitted, {"write": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.normal.write).not.toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid normal write delete fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let mod_uuid = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.normal.write.push(mod_uuid);
          expect(test_ctx.aclNormalDelete(unpermitted, {"write": [mod_uuid]})).toEqual(false);
          expect(test_ctx._acl.normal.write).toContain(mod_uuid);
          done();
        })(dctx, helpers)});
      });
    });


    describe("Global-level modifications", () => {
      // ### Globals Read
      it('owner global read=true succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclGlobal(owner, {"read": true})).toEqual(true);
          expect(test_ctx._acl.global.read).toEqual(true);
          done();
        })(dctx, helpers)});
      });
      it('owner global read=false succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.global.read = true;
          expect(test_ctx.aclGlobal(owner, {"read": false})).toEqual(true);
          expect(test_ctx._acl.global.read).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid global read=true succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclGlobal(permitted, {"read": true})).toEqual(true);
          expect(test_ctx._acl.global.read).toEqual(true);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid global read=false succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.global.read = true;
          expect(test_ctx.aclGlobal(permitted, {"read": false})).toEqual(true);
          expect(test_ctx._acl.global.read).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid global read=true fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclGlobal(unpermitted, {"read": true})).toEqual(false);
          expect(test_ctx._acl.global.read).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid global read=false fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.global.read = true;
          expect(test_ctx.aclGlobal(unpermitted, {"read": false})).toEqual(false);
          expect(test_ctx._acl.global.read).toEqual(true);
          done();
        })(dctx, helpers)});
      });
      // ### Globals Write
      it('owner global write=true succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          expect(test_ctx.aclGlobal(owner, {"write": true})).toEqual(true);
          expect(test_ctx._acl.global.write).toEqual(true);
          done();
        })(dctx, helpers)});
      });
      it('owner global write=false succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.global.write = true;
          expect(test_ctx.aclGlobal(owner, {"write": false})).toEqual(true);
          expect(test_ctx._acl.global.write).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid global write=true succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclGlobal(permitted, {"write": true})).toEqual(true);
          expect(test_ctx._acl.global.write).toEqual(true);
          done();
        })(dctx, helpers)});
      });
      it('permitted-uuid global write=false succeed', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.global.write = true;
          expect(test_ctx.aclGlobal(permitted, {"write": false})).toEqual(true);
          expect(test_ctx._acl.global.write).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid global write=true fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          expect(test_ctx.aclGlobal(unpermitted, {"write": true})).toEqual(false);
          expect(test_ctx._acl.global.write).toEqual(false);
          done();
        })(dctx, helpers)});
      });
      it('unpermitted-uuid global write=false fail', (done) => {
        require(['src/js/unitary/ctx/DataContext', 'src/js/unitary/core/helpers'], (dctx, helpers) => {(async function(dctx, helpers) {
          let owner = helpers.generateID();
          let permitted = helpers.generateID();
          let unpermitted = helpers.generateID();
          let test_ctx = new dctx.DataContext(owner);
          test_ctx._acl.elevated.permissions.push(permitted);
          test_ctx._acl.global.write = true;
          expect(test_ctx.aclGlobal(unpermitted, {"write": false})).toEqual(false);
          expect(test_ctx._acl.global.write).toEqual(true);
          done();
        })(dctx, helpers)});
      });
    });
  });
});

/*
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

*/



