"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var debugLogger_exports = {};
__export(debugLogger_exports, {
  createDebugLogger: () => createDebugLogger,
  withLogger: () => withLogger
});
module.exports = __toCommonJS(debugLogger_exports);
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
      if (!isEnabled)
        return;
      const objects = entries.flatMap((entry, i) => formatter(entry, i));
      const output = Object.fromEntries(
        objects.map((obj) => {
          const { logKey, ...rest } = obj;
          return [logKey, rest];
        })
      );
      console.log(JSON.stringify({ _logger: `@clerk/nextjs ${name}`, ...output }));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDebugLogger,
  withLogger
});
//# sourceMappingURL=debugLogger.js.map