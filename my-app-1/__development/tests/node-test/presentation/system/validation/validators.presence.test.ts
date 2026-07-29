// すべてのテストを実行
// npm exec -- node --test --import tsx __development/tests/node-test/presentation/system/validation/validators.presence.test.ts

import assert from 'node:assert';
import test from 'node:test';

import { isBlank, required, requiredAny } from '@/presentation/_system/validation/validators.presence';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[validators.presence.test.ts]', stdout: false });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/validation/validators.presence.test.ts
test('test1-1', async (t) => {
    const value = undefined;
    const result = isBlank(value);
    assert.strictEqual(result, true);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/system/validation/validators.presence.test.ts
test('test1-2', async (t) => {
    const value = null;
    const result = isBlank(value);
    assert.strictEqual(result, true);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __development/tests/node-test/presentation/system/validation/validators.presence.test.ts
test('test1-3', async (t) => {
    const value = '　';
    const result = isBlank(value);
    assert.strictEqual(result, true);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-1$' __development/tests/node-test/presentation/system/validation/validators.presence.test.ts
test('test2-1', (t) => {
    const result = required('', 'userId');
    print(`[${t.name}] result -> ${result}`);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test3-1$' __development/tests/node-test/presentation/system/validation/validators.presence.test.ts
test('test3-1', (t) => {
    const FormKeys = {
        offset: 'offset',
        limit: 'limit',
        userId: 'userId',
        userName: 'userName',
    } as const;
    type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

    const values: string[] = ['', ''];
    const labels: string[] = [FormKeys.userId, FormKeys.userName];
    const result = requiredAny(values, labels);
    print(`[${t.name}] result -> `, result);
});

// void test('test2', () => {
//   const result = requiredEmail('aaa', 'email');
//   console.log(consolePrefix + `result -> ${result}`);
// });
