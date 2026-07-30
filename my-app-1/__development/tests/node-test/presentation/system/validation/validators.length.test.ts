import assert from 'node:assert';
import test from 'node:test';

import { validateMax, validateMax5 } from '@/presentation/_system/validation/validators.length';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[validators.length.test.ts]', stdout: true });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/validation/validators.length.test.ts
test('test1-1', (t) => {
    const validator = validateMax(10);

    const result1 = validator('1234567890', 'ユーザーID');
    assert.strictEqual(result1.length, 0);
    print(`[${t.name}]`, 'result ->', result1);

    const result2 = validator('12345678901', 'ユーザーID');
    assert.strictEqual(result2.length, 1);
    print(`[${t.name}]`, 'result ->', result2);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/system/validation/validators.length.test.ts
test('test1-2', (t) => {
    const validator = validateMax(10);

    const result1 = validator('１２３４５６７８９０', 'ユーザーID');
    assert.strictEqual(result1.length, 0);
    print(`[${t.name}]`, 'result ->', result1);

    const result2 = validator('１２３４５６７８９０1', 'ユーザーID');
    assert.strictEqual(result2.length, 1);
    print(`[${t.name}]`, 'result ->', result2);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __development/tests/node-test/presentation/system/validation/validators.length.test.ts
test('test1-3', (t) => {
    const validator = validateMax(10);

    const result1 = validator('1２3４5６7８9０', 'ユーザーID');
    assert.strictEqual(result1.length, 0);
    print(`[${t.name}]`, 'result ->', result1);

    const result2 = validator('1２3４5６7８9０a', 'ユーザーID');
    assert.strictEqual(result2.length, 1);
    print(`[${t.name}]`, 'result ->', result2);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-4$' __development/tests/node-test/presentation/system/validation/validators.length.test.ts
test('test1-4', (t) => {
    const validator = validateMax(10);

    const result1 = validator('ｱｲｳｴｵｶｷｸｹｺ', 'ユーザー名');
    assert.strictEqual(result1.length, 0);
    print(`[${t.name}]`, 'result ->', result1);

    const result2 = validator('ｱｲｳｴｵｶｷｸｹｺ ', 'ユーザー名');
    assert.strictEqual(result2.length, 1);
    print(`[${t.name}]`, 'result ->', result2);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-1$' __development/tests/node-test/presentation/system/validation/validators.length.test.ts
test('test2-1', (t) => {
    const result1 = validateMax5('12345', 'ユーザーID');
    assert.strictEqual(result1.length, 0);
    print(`[${t.name}]`, 'result ->', result1);

    const result2 = validateMax5('123456', 'ユーザーID');
    assert.strictEqual(result2.length, 1);
    print(`[${t.name}]`, 'result ->', result2);
});
