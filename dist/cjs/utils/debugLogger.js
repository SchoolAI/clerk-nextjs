"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var debugLogger_exports = {};
__export(debugLogger_exports, {
  createDebugLogger: () => createDebugLogger,
  withLogger: () => withLogger
});
module.exports = __toCommonJS(debugLogger_exports);
var import_package = __toESM(require("next/package.json"));
var import_logFormatter = require("./logFormatter");
const createDebugLogger = (name, formatter) => () => {
  const entries = [];
  let isEnabled = false;
  return {
    enable: () => {
      isEnabled = true;
    },
    debug: (...args) => {
      if (isEnabled) {
        entries.push(args.map((arg) => typeof arg === "function" ? arg() : arg));
      }
    },
    commit: () => {
      if (isEnabled) {
        console.log(debugLogHeader(name));
        for (const log of entries) {
          let output = formatter(log);
          output = output.split("\n").map((l) => `  ${l}`).join("\n");
          if (process.env.VERCEL) {
            output = truncate(output, 4096);
          }
          console.log(output);
        }
        console.log(debugLogFooter(name));
      }
    }
  };
};
const withLogger = (loggerFactoryOrName, handlerCtor) => {
  return (...args) => {
    const factory = typeof loggerFactoryOrName === "string" ? createDebugLogger(loggerFactoryOrName, import_logFormatter.logFormatter) : loggerFactoryOrName;
    const logger = factory();
    const handler = handlerCtor(logger);
    try {
      const res = handler(...args);
      if (typeof res === "object" && "then" in res && typeof res.then === "function") {
        return res.then((val) => {
          logger.commit();
          return val;
        }).catch((err) => {
          logger.commit();
          throw err;
        });
      }
      logger.commit();
      return res;
    } catch (err) {
      logger.commit();
      throw err;
    }
  };
};
function debugLogHeader(name) {
  return `[clerk debug start: ${name}]`;
}
function debugLogFooter(name) {
  return `[clerk debug end: ${name}] (@clerk/nextjs=${"4.30.0"},next=${import_package.default.version})`;
}
function truncate(str, maxLength) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  const encodedString = encoder.encode(str);
  const truncatedString = encodedString.slice(0, maxLength);
  return decoder.decode(truncatedString).replace(/\uFFFD/g, "");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDebugLogger,
  withLogger
});
//# sourceMappingURL=debugLogger.js.map