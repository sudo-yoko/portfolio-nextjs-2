// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts
import { printf } from '@/__tests__/test-logger';
import {
  actionError,
  authError,
  ERR_TYPE,
  isActionError,
  isAuthError,
  isRouteError,
  routeError,
  validationError,
} from '@/presentation/(system)/errors/custom-error';
import { stringify } from '@/presentation/(system)/errors/stringify-error';
import { ActionResult } from '@/presentation/(system)/types/action-result';
import { Violations } from '@/presentation/(system)/validation/validation.types';

const print = printf({ logPrefix: '>>> [custom-error.test.test.ts]', stdout: true });

// ======================
// authError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test1-1$'
test('test1-1', () => {
  const e = authError();

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// actionError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test2-1$'
test('test2-1', () => {
  const result = ActionResult.abort();
  const e = actionError(result);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test2-2$'
test('test2-2', () => {
  const cause = '原因エラー';

  const result = ActionResult.abort(cause);
  const e = actionError(result);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test2-3$'
test('test2-3', () => {
  const result = ActionResult.complete({});
  print(`result=${JSON.stringify(result)}`);

  const e = actionError(result);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test2-4$'
test('test2-4', () => {
  type User = {
    userId: string;
    userName: string;
  };
  const users: User[] = [{ userId: '12345', userName: 'test taro' }];

  const result = ActionResult.complete(users);
  print(`result=${JSON.stringify(result)}`);

  const e = actionError(result);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// routeError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test3-1$'
test('test3-1', async () => {
  const status = 500;
  const e = await routeError(status);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test3-2$'
test('test3-2', async () => {
  const status = 500;
  const meta = { body: 'error!', method: 'GET', route: 'http://xxxxx' };

  const e = await routeError(status, meta);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// validationError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test4-1$'
test('test4-1', () => {
  type FormKeys = 'name' | 'email' | 'body';
  const violations: Violations<FormKeys> = {
    name: ['名前が長すぎます。', '名前が不正です。'],
    email: ['不正なメールアドレスです。'],
  };

  const e = validationError(violations);

  const errType = e[ERR_TYPE];
  print(`errType=${errType}`);

  const { message, all } = stringify(e);
  print(`message=${message}, all=${all}`);
});

// ======================
// isErrorOf Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t 'test5-'

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-1$'
test('test5-1', () => {
  const result = ActionResult.abort();
  const e = actionError(result);
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(true);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-2$'
test('test5-2', () => {
  const e = authError();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(true);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-3$'
test('test5-3', async () => {
  const status = 500;
  const meta = { body: 'error!', method: 'GET', route: 'http://xxxxx' };

  const e = await routeError(status, meta);
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-4$'
test('test5-4', () => {
  const e = new Error();
  expect(e instanceof Error).toBe(true);
  expect(isActionError(e)).toBe(false);
  expect(isAuthError(e)).toBe(false);
  expect(isRouteError(e)).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-5$'
test('test5-5', () => {
  try {
    const result = ActionResult.abort();
    throw actionError(result);
  } catch (e) {
    // e is unknown
    expect(isActionError(e)).toBe(true);
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/custom-error.test.ts -t '^test5-6$'
test('test5-6', () => {
  const e = new String('test');
  // e is string
  expect(isActionError(e)).toBe(false);
});
