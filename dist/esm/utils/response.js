import { NextResponse } from "next/server";
import { constants as nextConstants } from "../constants";
const mergeResponses = (...responses) => {
  const normalisedResponses = responses.filter(Boolean).map((res) => {
    if (res instanceof NextResponse) {
      return res;
    }
    return new NextResponse(res.body, res);
  });
  if (normalisedResponses.length === 0) {
    return;
  }
  const lastResponse = normalisedResponses[normalisedResponses.length - 1];
  const finalResponse = new NextResponse(lastResponse.body, lastResponse);
  for (const response of normalisedResponses) {
    response.headers.forEach((value, name) => {
      finalResponse.headers.set(name, value);
    });
    response.cookies.getAll().forEach((cookie) => {
      const { name, value, ...options } = cookie;
      finalResponse.cookies.set(name, value, options);
    });
  }
  return finalResponse;
};
const isRedirect = (res) => {
  return res.headers.get(nextConstants.Headers.NextRedirect);
};
const setHeader = (res, name, val) => {
  res.headers.set(name, val);
  return res;
};
const stringifyHeaders = (headers) => {
  if (!headers) {
    return JSON.stringify({});
  }
  const obj = {};
  headers.forEach((value, name) => {
    obj[name] = value;
  });
  return JSON.stringify(obj);
};
export {
  isRedirect,
  mergeResponses,
  setHeader,
  stringifyHeaders
};
//# sourceMappingURL=response.js.map