"use strict";
var import_server = require("next/server");
var import_response = require("./response");
describe("mergeResponses", function() {
  it("should fail unless one response is passed", function() {
    expect((0, import_response.mergeResponses)(null, void 0)).toBe(void 0);
  });
  it("should handle non-response values", function() {
    const response1 = new import_server.NextResponse();
    response1.headers.set("foo", "1");
    const finalResponse = (0, import_response.mergeResponses)(null, void 0, response1);
    expect(finalResponse.headers.get("foo")).toEqual("1");
  });
  it("should merge the headers", function() {
    const response1 = new import_server.NextResponse();
    const response2 = new import_server.NextResponse();
    response1.headers.set("foo", "1");
    response1.headers.set("bar", "1");
    response2.headers.set("bar", "2");
    const finalResponse = (0, import_response.mergeResponses)(response1, response2);
    expect(finalResponse.headers.get("foo")).toEqual("1");
    expect(finalResponse.headers.get("bar")).toEqual("2");
  });
  it("should merge the cookies", function() {
    const response1 = new import_server.NextResponse();
    const response2 = new import_server.NextResponse();
    response1.cookies.set("foo", "1");
    response1.cookies.set("second", "2");
    response1.cookies.set("bar", "1");
    response2.cookies.set("bar", "2");
    const finalResponse = (0, import_response.mergeResponses)(response1, response2);
    expect(finalResponse.cookies.get("foo")).toEqual(response1.cookies.get("foo"));
    expect(finalResponse.cookies.get("second")).toEqual(response1.cookies.get("second"));
    expect(finalResponse.cookies.get("bar")).toEqual(response2.cookies.get("bar"));
  });
  it("should merge the cookies with non-response values", function() {
    const response2 = import_server.NextResponse.next();
    response2.cookies.set("foo", "1");
    response2.cookies.set({
      name: "second",
      value: "2",
      path: "/",
      sameSite: "none",
      secure: true
    });
    response2.cookies.set("bar", "1", {
      sameSite: "none",
      secure: true
    });
    const finalResponse = (0, import_response.mergeResponses)(null, response2);
    expect(finalResponse.cookies.get("foo")).toEqual(response2.cookies.get("foo"));
    expect(finalResponse.cookies.get("second")).toEqual(response2.cookies.get("second"));
    expect(finalResponse.cookies.get("bar")).toEqual(response2.cookies.get("bar"));
  });
  it("should use the status of the last response", function() {
    const response1 = new import_server.NextResponse("", { status: 200, statusText: "OK" });
    const response2 = new import_server.NextResponse("", { status: 201, statusText: "Created" });
    const finalResponse = (0, import_response.mergeResponses)(response1, response2);
    expect(finalResponse.status).toEqual(response2.status);
    expect(finalResponse.statusText).toEqual(response2.statusText);
  });
  it("should use the body of the last response", function() {
    const response1 = new import_server.NextResponse("1");
    const response2 = new import_server.NextResponse("2");
    const finalResponse = (0, import_response.mergeResponses)(response1, response2);
    expect(finalResponse.body).toEqual(response2.body);
  });
});
//# sourceMappingURL=response.test.js.map