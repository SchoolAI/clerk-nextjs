import * as publicExports from "../index";
describe("/app-beta public exports", () => {
  it("should not include a breaking change", () => {
    expect(Object.keys(publicExports).sort()).toMatchSnapshot();
  });
});
//# sourceMappingURL=exports.test.js.map