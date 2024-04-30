import { logFormatter } from "./logFormatter";
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
      const output = Object.fromEntries(objects.map((obj) => {
        const { logKey, ...rest } = obj;
        return [logKey, rest];
      }));
      console.log(`@clerk/nextjs ${name}`, output);
    }
  };
};
const withLogger = (loggerFactoryOrName, handlerCtor) => {
  return (...args) => {
    const factory = typeof loggerFactoryOrName === "string" ? createDebugLogger(loggerFactoryOrName, logFormatter) : loggerFactoryOrName;
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
export {
  createDebugLogger,
  withLogger
};
//# sourceMappingURL=debugLogger.js.map