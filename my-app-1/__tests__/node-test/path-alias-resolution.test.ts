// モジュールのパス(@エイリアス)が解決できるかテストする
// npm exec -- node --test --experimental-test-module-mocks --import tsx __tests__/node-test/path-alias-resolution.test.ts
import test from 'node:test';

//
// 静的インポートのパス解決をテストする
//
import { printf } from '@/__tests__/test-logger'; // パス解決ができること
import { required } from '@/presentation/_system/validation/validators.presence'; // パス解決ができること
const print = printf({ logPrefix: '>>> [test-logger.test.ts]', stdout: false });
await test('test1-1', async () => {
  const result = required('', 'ユーザーID');
  print(result);
});

//
// 実行時（動的）インポートのパス解決をテストする
//
await test('test1-2', async (t) => {
  // server-onlyをモックする
  t.mock.module('server-only', { defaultExport: {}, namedExports: {} });
  // モックしてからloggerを読み込む
  const logger = (await import('@/presentation/_system/logging/logger.s')).default; // パス解決ができること
  logger.info('aaaaaaaaaa');
});
