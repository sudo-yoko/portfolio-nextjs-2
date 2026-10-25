import assert from 'node:assert';
import test from 'node:test';

import { applicationError, authError } from '@/error/src/internal/error.factories';
import { isApplicationError, isAuthError, isCustomError } from '@/error/src/internal/error.helpers';

/////////////////////////
// isCustomError
/////////////////////////

// clear & npm run node:test -- --test-name-pattern='^test1-1$' src/error/error.helpers.test.ts
void test('test1-1', () => {
    const e = authError();
    assert.equal(isCustomError(e), true);
});

// clear & npm run node:test -- --test-name-pattern='^test1-2$' src/error/error.helpers.test.ts
void test('test1-2', () => {
    const e = new Error();
    assert.equal(isCustomError(e), false);
});

/////////////////////////
// isAuthError
/////////////////////////

// clear & npm run node:test -- --test-name-pattern='^test2-1$' src/error/error.helpers.test.ts
void test('test2-1', () => {
    const e = authError();
    assert.equal(isAuthError(e), true);
    assert.equal(isCustomError(e), true);
    assert.equal(isApplicationError(e), false);
});

// clear & npm run node:test -- --test-name-pattern='^test2-2$' src/error/error.helpers.test.ts
void test('test2-2', () => {
    const e = applicationError();
    assert.equal(isAuthError(e), false);
    assert.equal(isCustomError(e), true);
    assert.equal(isApplicationError(e), true);
});
