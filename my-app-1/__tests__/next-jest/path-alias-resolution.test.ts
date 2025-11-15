// モジュールのパス(@エイリアス)が解決できるかテストする

// 静的インポートの型解決をテストする。ここがエラーにならないこと
import logger from "@/presentation/(system)/logging/logger.s";
import { printf } from "@/__tests__/next-jest/test-logger";

import { jest } from '@jest/globals';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/path-alias-resolution.test.ts -t 'test1-1'
const print = printf({ logPrefix: ">>> [test-logger.test.ts]", stdout: true });
test("test1-1", () => {
  logger.info("logger OK!");
  print("test-logger OK!");
});

// 実行時（動的）インポートのパス解決をテストする
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/path-alias-resolution.test.ts -t 'test1-2'
test("test1-2", async () => {
  jest.unstable_mockModule("@/presentation/(system)/env/env-testable", () => ({
    __esModules: true,
    envByStaticKey: {
      get NODE_ENV() {
        return "production";
      },
      get NEXT_PUBLIC_DEBUG_LOGGER() {
        // return undefined;
        return "true";
      },
    },
  }));

  const debug = (
    await import("@/presentation/(system)/logging/logging.core.debug")
  ).default;

  print("start");
  debug("debug");
  print("end");
});
