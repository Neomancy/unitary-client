/**
 * Created by nbeni on 11/22/2020.
 */

describe("[Helper functions]", () => {

  describe("ID-related", () => {
    it("functions exist", (done) => {
      require(["src/js/unitary/core/Helpers"], function(helpers) {
        expect(helpers).toBeDefined();
        expect(typeof helpers.generateID).toMatch("function");
        expect(typeof helpers.ID2String).toMatch("function");
        expect(typeof helpers.String2ID).toMatch("function");
        done();
      });
    });
    it(".ID2String()", (done) => {
      require(["src/js/unitary/core/Helpers"], function(helpers) {
        let ab = new Uint8Array(4);
        for (let i=0; i<4; i++) {
          ab[i] = "test".charCodeAt(i);
        }
        expect(helpers.ID2String(ab.buffer)).toEqual("dGVzdA");
        done();
      });
    });
    it(".String2ID()", (done) => {
      require(["src/js/unitary/core/Helpers"], function(helpers) {
        expect(new Uint8Array(helpers.String2ID("dGVzdA"))).toEqual(new Uint8Array([116,101,115,116]));
        done();
      });
    });

    it("cryptographically secure ID generation", (done) => {
      require(["src/js/unitary/core/Helpers"], function(helpers) {
        let promises = [];
        promises.push(helpers.generateID());
        promises.push(helpers.generateID());
        Promise.all(promises).then((results) => {
          let dv1 = new DataView(results[0],0);
          let dv2 = new DataView(results[1],0);
          let same = 0;
          let total = dv1.byteLength * 8;
          for (let idx = 0; idx < dv1.byteLength; idx++) {
            let by1 = dv1.getInt8(idx);
            let by2 = dv2.getInt8(idx);
            for (let bit=0; bit < 8; bit++) {
              let mask = Math.pow(2,bit);
              if ((by1 & mask) == (by2 & mask)) {
                same++;
              }
            }
          }
          var similarity = parseInt((same / total) * 1000) / 10;
          console.debug("crypto analysis of sequential keys is "+similarity+"% similar");
          expect(similarity).toBeLessThanOrEqual(55);
          done();
        });

      });
    });
  });
});
