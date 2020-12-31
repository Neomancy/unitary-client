/**
 * Created by nbeni on 12/24/2020.
 */

describe("[Engine functions]", () => {
    beforeAll((done) => {
      require([
        "unitary/core/Engine",
        "unitary/core/Helpers",
        "unitary/core/ComponentMgr"
      ], (engine, helper, component) => {
        expect(engine).not.toBe(undefined);
        expect(helper).not.toBe(undefined);
        expect(component).not.toBe(undefined);
        done();
      });
    });

  // describe("Debug functionality", () => {
  //   it("should not exist unless \"debug\" is set in sessionStorage", (done) => {
  //     sessionStorage.removeItem("debug");
  //     require(["src/js/unitary/core/Engine"], (engine) => {
  //       let module = "";
  //       expect(Unitary).toBeDefined();
  //       console.log(JSON.stringify(Unitary));
  //       for (module in Unitary) {
  //         console.log("Checking that [Unitary."+module+".debug] is not present");
  //         expect(Unitary[module].debug).toBeDefined();
  //       }
  //       done();
  //     });
  //   });
  //   it("should exist when \"debug\" is set in sessionStorage", (done) => {
  //     sessionStorage.setItem("debug", true);
  //     require(["src/js/unitary/core/Engine"], (engine) => {
  //       let module = "";
  //       expect(Unitary).toBeDefined();
  //       console.log(JSON.stringify(Unitary));
  //       for (module in Unitary) {
  //         console.log("Checking that [Unitary."+module+".debug] is not present");
  //         expect(Unitary[module].debug).not.toBeDefined();
  //       }
  //       sessionStorage.removeItem("debug");
  //       done();
  //     });
  //   });
  // });


});
