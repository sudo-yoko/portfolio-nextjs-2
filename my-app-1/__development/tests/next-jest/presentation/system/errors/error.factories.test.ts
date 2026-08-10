// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts
import { RawResponse, RequestConfig } from '@/presentation/_system/client/client.types';
import { applicationError, authError } from '@/presentation/_system/error/error.factories';
import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import { ERR_TYPE } from '@/presentation/_system/error/error.types';
import { deserUtil } from '@/presentation/_system/io/deserialize.utils';
import { actionAdapter } from '@/presentation/_system/logging/internal/logging.winston.action.adapter';
import logger from '@/presentation/_system/logging/logger.s';
import { deserialize } from '@/presentation/backend-lib/users/users.deserializer';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '>>> [error.factories.test.ts]', stdout: true });
const logPrefix = 'error.factories.test.ts: ';

// ======================
// authError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test1-1$'
test('test1-1', () => {
    const e = authError();

    print(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    print(`error.name=${e.name}`);
    print(`error.message=${e.message}`);
    print(`error.cause=${e.cause}`);
    print(`error.stack=${e.stack}`);
});

// ======================
// applicationError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-1$'
test('test2-1', () => {
    const res: RawResponse = {
        status: 200,
        rawBody: '{"total":"10","users":[{"userId":"00001"},{"userId":"00002"},{"userId":"00003"}]}',
    };
    const config: RequestConfig = {
        method: 'GET',
        url: 'aaaa',
    };
    try {
        deserUtil.withErrorHandling(() => deserialize(res.rawBody), { req: config, res });
        // deserialize(res.rawBody)
    } catch (error) {
        // if(error instanceof Error){
        //     error.
        // }
        logger.error(logPrefix + errLog(error, 'error.factories.test.ts#test2-1').all);
    }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-2$'
test('test2-2', () => {
    const cause1 = applicationError({ message: 'error1', extra: { test: 'test1', test2: 'test2' } });
    const cause2 = applicationError({ message: 'error2', extra: { aaa: 'aaa', bbb: 'bbb' }, cause: cause1 });
    const cause3 = applicationError({ message: 'error3', extra: { aaa: '333', bbb: '3333' }, cause: cause2 });
    const cause4 = applicationError({ message: 'error4', cause: cause3 });
    const e = applicationError({ message: 'error5', extra: { vvv: '555', ggg: '555' }, cause: cause4 });
    logger.error(logPrefix + errLog(e, 'error.factories.test.ts#test2-2').all);
});

test('test2-3', () => {
    const rec: Record<string, object> = {};
    rec['aaa'] = { aaaa: '1234' };
});

function errLog(e: unknown, location?: string) {
    const errProps: Parameters<typeof formatError>[0] = {};
    errProps.error = e;
    errProps.location = location;
    errProps.description = 'エラーログテスト';
    if (isCustomError(e)) {
        errProps.details = { customError: getCustomErrorProperties(e) };
    }
    return formatError(errProps);
}

// ======================
// actionError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-1$'
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

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-2$'
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

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-3$'
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

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test2-4$'
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

// ======================
// routeError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test3-1$'
// test('test3-1', async () => {
//   const status = 500;
//   const e = routeError(status);

//   print(`error[CUSTOM_ERROR_TAG]=${e[CUSTOM_ERROR_TAG]}`);
//   print(`error.name=${e.name}`);
//   print(`error.message=${e.message}`);
//   print(`error.cause=${e.cause}`);
//   print(`error.stack=${e.stack}`);
// });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test3-2$'
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

// ======================
// validationError() Test
// ======================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.factories.test.ts -t '^test4-1$'
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
