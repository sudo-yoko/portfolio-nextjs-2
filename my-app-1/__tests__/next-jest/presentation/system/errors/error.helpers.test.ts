import { printf } from '@/__tests__/test-logger';
import { BffResult } from '@/__tests__/_bk/_/result.bff.types';
import { actionError, authError, backendError, routeError } from '@/presentation/(system)/error/error.factories';
import {
  isActionError,
  isAuthError,
  isCustomError,
  isRouteError,
} from '@/presentation/(system)/error/error.helpers';
import { CUSTOM_ERROR_TAG, CustomError, ErrType } from '@/presentation/(system)/error/error.types';
import { ActionResult } from '@/presentation/(system)/types/action-result';

const print = printf({ logPrefix: '>>> [error.factories.test.ts]', stdout: true });

// ======================
// isCustomError Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.helpers.test.ts -t '^test1-1$'
test('test1-1', () => {
  const e = new Error();
  expect(isCustomError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.helpers.test.ts -t '^test1-2$'
test('test1-2', () => {
  const e = authError();
  print(e[CUSTOM_ERROR_TAG]);
  expect(isCustomError(e)).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.helpers.test.ts -t '^test1-3$'
test('test1-3', () => {
  const bffResult: BffResult = {
    tag: 'abort',
  };
  const e = backendError(bffResult);
  print(e[CUSTOM_ERROR_TAG]);
  expect(isCustomError(e)).toBe(true);
});

// ======================
// isErrorOf Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t 'test5-'

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-1$'
test('test5-1', () => {
  try {
    const result = ActionResult.abort();
    throw actionError(result);
  } catch (e) {
    expect(e instanceof Error).toBe(true);
    expect(isActionError(e)).toBe(true);
    expect(isAuthError(e)).toBe(false);
    expect(isRouteError(e)).toBe(false);

    // 型ガードによる型絞り込みをテストする。
    if (isActionError(e)) {
      // ここでコンパイルエラーにならなければOK
      const _: CustomError<typeof ErrType.ActionError> = e;
    }
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-2$'
test('test5-2', () => {
  try {
    throw authError();
  } catch (e) {
    expect(e instanceof Error).toBe(true);
    expect(isActionError(e)).toBe(false);
    expect(isAuthError(e)).toBe(true);
    expect(isRouteError(e)).toBe(false);

    // 型ガードによる型絞り込みをテストする。
    if (isAuthError(e)) {
      // ここでコンパイルエラーにならなければOK
      const _: CustomError<typeof ErrType.AuthError> = e;
    }
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-3$'
test('test5-3', async () => {
  const status = 500;
  const meta = { body: 'error!', method: 'GET', route: 'http://xxxxx' };

  try {
    throw routeError(status, meta);
  } catch (e) {
    expect(e instanceof Error).toBe(true);
    expect(isActionError(e)).toBe(false);
    expect(isAuthError(e)).toBe(false);
    expect(isRouteError(e)).toBe(true);

    // 型ガードによる型絞り込みをテストする。
    if (isRouteError(e)) {
      // ここでコンパイルエラーにならなければOK
      const _: CustomError<typeof ErrType.RouteError> = e;
    }
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-4$'
test('test5-4', () => {
  const e = new Error();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-5$'
test('test5-5', () => {
  try {
    const result = ActionResult.abort();
    throw actionError(result);
  } catch (e) {
    // e is unknown
    expect(isActionError(e)).toBe(true);
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test5-6$'
test('test5-6', () => {
  const e = new String('test');
  // e is string
  expect(isActionError(e)).toBe(false);
});
