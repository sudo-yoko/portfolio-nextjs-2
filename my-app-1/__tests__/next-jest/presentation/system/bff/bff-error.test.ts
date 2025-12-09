import { printf } from '@/__tests__/test-logger';
import { Aborted } from '@/presentation/(system)/result/result.bff.types';
import { bffError, isBffAuthError } from '@/presentation/(system)/errors/bff-error';
import { ErrType } from '@/presentation/(system)/errors/error.types';

const print = printf({ logPrefix: '>>> [bff-error.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/bff/bff-error.test.ts -t '^test1-1$'
test('test1-1', () => {
  const aborted: Aborted = {
    tag: 'abort',
    cause: '認証エラー１',
  };
  const err = bffError(aborted, '認証エラー２');
  print(`err[BFF_RESULT]=${JSON.stringify(err.bffResult)}`);
  print(`err.name=${err.name}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/bff/bff-error.test.ts -t '^test1-2$'
test('test1-2', () => {
  const aborted: Aborted = {
    tag: 'abort',
    type: ErrType.AuthError,
    cause: '認証エラー１',
  };
  const err = bffError(aborted, '認証エラー２');
  print(`err[BFF_RESULT]=${JSON.stringify(err.bffResult)}`);
  print(`err.name=${err.name}`);

  const r = isBffAuthError(aborted);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/bff/bff-error.test.ts -t '^test1-3$'
test('test1-3', () => {
  const aborted: Aborted = {
    tag: 'abort',
    type: ErrType.AuthError,
    cause: '認証エラー１',
  };
  expect(isBffAuthError(aborted)).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/bff/bff-error.test.ts -t '^test1-4$'
test('test1-4', () => {
  const aborted: Aborted = {
    tag: 'abort',
    type: ErrType.BffError,
    cause: '認証エラー１',
  };
  expect(isBffAuthError(aborted)).toBe(false);
});
