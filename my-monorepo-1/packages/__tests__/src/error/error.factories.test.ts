import assert from 'node:assert';
import test from 'node:test';

import { applicationError, authError } from '@/error/src/internal/error.factories';
import { formatError } from '@/error/src/internal/error.helper.stringify';
import { ERR_TYPE, ErrType, LOCATION } from '@/error/src/internal/error.types';

// clear & npm run node:test -- src/error/error.factories.test.ts

// ======================
// authError
// ======================
// clear & npm run node:test -- --test-name-pattern='^test1-1$' src/error/error.factories.test.ts
void test('test1-1', () => {
    const e = authError();

    assert.equal(e[ERR_TYPE] === ErrType.AuthError, true);

    console.log('ALL=\n', e);
    console.log(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    console.log(`error[LOCATION]=${e[LOCATION]}`);
    console.log(`error.name=${e.name}`);
    console.log(`error.message=${e.message}`);
    console.log(`error.cause=${e.cause}`);
    console.log(`error.stack=${e.stack}`);
});

// clear & npm run node:test -- --test-name-pattern='^test1-2$' src/error/error.factories.test.ts
void test('test1-2', () => {
    const e = authError({ location: 'error.factories.test.ts' });

    assert.equal(e[ERR_TYPE] === ErrType.AuthError, true);

    console.log('ALL=\n', e);
    console.log(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    console.log(`error[LOCATION]=${e[LOCATION]}`);
    console.log(`error.name=${e.name}`);
    console.log(`error.message=${e.message}`);
    console.log(`error.cause=${e.cause}`);
    console.log(`error.stack=${e.stack}`);
});

// ======================
// applicationError
// ======================

// clear & npm run node:test -- --test-name-pattern='^test2-1$' src/error/error.factories.test.ts
void test('test2-1', () => {
    const cause1 = applicationError({ message: 'error1', extra: { test: 'test1', test2: 'test2' } });
    const cause2 = applicationError({ message: 'error2', extra: { aaa: 'aaa', bbb: 'bbb' }, cause: cause1 });
    const cause3 = applicationError({ message: 'error3', extra: { aaa: '333', bbb: '3333' }, cause: cause2 });
    const cause4 = applicationError({ message: 'error4', cause: cause3 });
    const e = applicationError({ message: 'error5', extra: { vvv: '555', ggg: '555' }, cause: cause4 });

    assert.equal(e[ERR_TYPE] === ErrType.ApplicationError, true);

    console.log('ALL=\n', e);
    console.log(`error[ERR_TYPE]=${e[ERR_TYPE]}`);
    console.log(`error[LOCATION]=${e[LOCATION]}`);
    console.log(`error.name=${e.name}`);
    console.log(`error.message=${e.message}`);
    console.log(`error.cause=${e.cause}`);
    console.log(`error.stack=${e.stack}`);

    console.log('formatError=\n', formatError({ error: e }).all);
});
