import test from 'node:test';

import { printf } from '../../../test-logger';
import { authError } from '@/presentation/_system/error/error.factories';
import { ERR_TYPE, LOCATION } from '@/presentation/_system/error/error.types';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';

const print = printf({ logPrefix: '>>> [error.factories.test.ts]', stdout: true });

// ======================
// authError() Test
// ======================
// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __tests__/node-test/presentation/system/error.factories.test.ts
test('test1-1', () => {
    const e = authError();

    print(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    print(`error[LOCATION]=${e[LOCATION]}`);
    print(`error.name=${e.name}`);
    print(`error.message=${e.message}`);
    print(`error.cause=${e.cause}`);
    print(`error.stack=${e.stack}`);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __tests__/node-test/presentation/system/error.factories.test.ts
test('test1-2', () => {
    const e = authError({ location: 'error.factories.test.ts' });

    print(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    print(`error[LOCATION]=${e[LOCATION]}`);
    print(`error.name=${e.name}`);
    print(`error.message=${e.message}`);
    print(`error.cause=${e.cause}`);
    print(`error.stack=${e.stack}`);

    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const { text } = getCustomErrorProperties(e);
        errProps.details = text;
        print(`errProps.details=${JSON.stringify(errProps.details)}`);
        const { all } = formatError(errProps);
        print(`all=${all}`);
    }
});

// // ======================
// // actionError() Test
// // ======================
// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-1$'
// test('test2-1', () => {
//   const result = ActionResult.abort();
//   const e = actionError(result);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);

//   const { message, all } = formatError(e);
//   print(`message=${message}`);
//   print(`all=${all}`);
// });

// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-2$'
// test('test2-2', () => {
//   const cause = '原因エラー';

//   const result = ActionResult.abort(cause);
//   const e = actionError(result);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-3$'
// test('test2-3', () => {
//   const result = ActionResult.complete({});
//   print(`result=${JSON.stringify(result)}`);

//   const e = actionError(result);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-4$'
// test('test2-4', () => {
//   type User = {
//     userId: string;
//     userName: string;
//   };
//   const users: User[] = [{ userId: '12345', userName: 'test taro' }];

//   const result = ActionResult.complete(users);
//   print(`result=${JSON.stringify(result)}`);

//   const e = actionError(result);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// // ======================
// // routeError() Test
// // ======================
// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test3-1$'
// test('test3-1', async () => {
//   const status = 500;
//   const e = routeError(status);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test3-2$'
// test('test3-2', async () => {
//   const status = 500;
//   const meta = { body: 'error!', method: 'GET', route: 'http://xxxxx' };

//   const e = routeError(status, meta);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// // ======================
// // validationError() Test
// // ======================
// // npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test4-1$'
// test('test4-1', () => {
//   type FormKeys = 'name' | 'email' | 'body';
//   const violations: Violations<FormKeys> = {
//     name: ['名前が長すぎます。', '名前が不正です。'],
//     email: ['不正なメールアドレスです。'],
//   };

//   const e = validationError(violations);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });
