import { expectTypeOf } from "expect-type";
import { withLogger } from "./debugLogger";
describe("withLogger", () => {
  let logger;
  beforeEach(() => {
    logger = {
      enable: jest.fn(),
      log: jest.fn(),
      commit: jest.fn()
    };
  });
  it("should return the type of the passed handler", () => {
    const handler = withLogger(
      () => logger,
      (logger2) => (opts) => {
        logger2.commit();
        return opts.name;
      }
    );
    expectTypeOf(handler).toMatchTypeOf();
  });
  it("should log upon return of a sync function", () => {
    const handler = withLogger(
      () => logger,
      (logger2) => () => {
        logger2.enable();
        logger2.log("test");
        return "test";
      }
    );
    expect(logger.enable).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
    expect(logger.commit).not.toHaveBeenCalled();
    handler();
    expect(logger.enable).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalled();
    expect(logger.commit).toHaveBeenCalled();
  });
  it("should log before an error is thrown inside of a sync function", () => {
    const handler = withLogger(
      () => logger,
      (logger2) => () => {
        logger2.enable();
        logger2.log("test");
        throw new Error();
      }
    );
    expect(logger.enable).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
    expect(logger.commit).not.toHaveBeenCalled();
    try {
      handler();
    } catch (e) {
      expect(e).toBeDefined();
      expect(logger.enable).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalled();
      expect(logger.commit).toHaveBeenCalled();
    }
  });
  it("should log upon return of a async function", async () => {
    const handler = withLogger(
      () => logger,
      (logger2) => async () => {
        logger2.enable();
        logger2.log("test");
        const res = await new Promise((resolve) => {
          resolve("test");
        });
        return res;
      }
    );
    expect(logger.enable).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
    expect(logger.commit).not.toHaveBeenCalled();
    await handler();
    expect(logger.enable).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalled();
    expect(logger.commit).toHaveBeenCalled();
  });
  it("should log before an error is thrown inside of an async function", async () => {
    const handler = withLogger(
      () => logger,
      (logger2) => async () => {
        logger2.enable();
        logger2.log("test");
        const res = await new Promise((_, reject) => {
          reject(new Error());
        });
        return res;
      }
    );
    expect(logger.enable).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
    expect(logger.commit).not.toHaveBeenCalled();
    try {
      await handler();
    } catch (e) {
      expect(e).toBeDefined();
      expect(logger.enable).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalled();
      expect(logger.commit).toHaveBeenCalled();
    }
  });
  it("should truncate bytes to 4096 when deploying on vercel", () => {
    process.env.VERCEL = "true";
    const oldConsoleLog = console.log.bind(console);
    const log = jest.fn();
    console.log = log;
    const veryLongString = new Array(6e3).join("a");
    const handler = withLogger("test-logger", (logger2) => () => {
      logger2.enable();
      logger2.debug(veryLongString);
      logger2.debug(veryLongString);
    });
    handler();
    for (const mockCall of log.mock.calls) {
      console.info("~~mockCall", mockCall[0]);
      expect(mockCall[0].length).toBeLessThanOrEqual(4096);
    }
    process.env.VERCEL = void 0;
    console.log = oldConsoleLog;
  });
});
//# sourceMappingURL=debugLogger.test.js.map