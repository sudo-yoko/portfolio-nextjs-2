import assert from 'node:assert';
import test from 'node:test';

import { formatError } from '@/presentation/_system/error/error.helper.stringify';
import { isInvalid } from '@/presentation/_system/result/result.helpers';
import { Invalid, Tag } from '@/presentation/_system/result/result.types';
import {
    hasError,
    initialFormDataCore,
    validateFirst,
} from '@/presentation/_system/validation/validation.helpers';
import { Violations } from '@/presentation/_system/validation/validation.types';
import { validateMax } from '@/presentation/_system/validation/validators.length';
import { required } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[validation.helper.test.ts]', stdout: true });

// ==============================
// 1. hasError
// ==============================
// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-1', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: ['sss'],
        },
        {
            field: FormKeys.email,
            violation: ['aaa', 'bbb'],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(true);
    assert.strictEqual(result, true);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-2', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: [],
        },
        {
            field: FormKeys.email,
            violation: [],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(false);
    assert.strictEqual(result, false);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-3', () => {
    const violations: Violations<FormKeys> = [];
    const result = hasError(violations);
    // expect(result).toBe(false);
    assert.strictEqual(result, false);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-4$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-4', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: [],
        },
        {
            field: FormKeys.email,
            violation: ['a　aa'],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(true);
    assert.strictEqual(result, true);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-5$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-5', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: [''],
        },
        {
            field: FormKeys.email,
            violation: [],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(false);
    assert.strictEqual(result, false);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-6$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-6', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: [],
        },
        {
            field: FormKeys.email,
            violation: [' '],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(false);
    assert.strictEqual(result, false);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-7$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-7', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: ['　'],
        },
    ];
    const result = hasError(violations);
    // expect(result).toBe(false);
    assert.strictEqual(result, false);
});

// invalidでviolationsが無い場合のhasErrorのテスト
// npm exec -- node --test --import tsx --test-name-pattern='^test1-8$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-8', () => {
    // 不正なInvalid
    const result = {
        tag: Tag.Invalid,
    };
    // コンパイルエラーになること
    if (isInvalid(result)) {
        print(`result=${result.violations}`);
        expect(() => hasError(result.violations)).toThrow(Error);
        try {
            hasError(result.violations);
        } catch (error) {
            print(formatError({ error }).all);
        }
    }
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-9$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test1-9', () => {
    const result: Invalid<FormKeys> = {
        tag: Tag.Invalid,
        // violations: [{ field: FormKeys.body, violation: ['aaa', 'zzz'] }],
        violations: [],
    };
    if (isInvalid(result)) {
        print(`result=${JSON.stringify(result.violations)}`);
        const isError = hasError(result.violations);
        // expect(isError).toBe(false);
        assert.strictEqual(isError, false);
    }
});

// ==============================
// 3. initialFormData
// ==============================
// npm exec -- node --test --import tsx --test-name-pattern='^test3-1$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test3-1', () => {
    const formKeys = {
        test1: 'test1',
        test2: 'test2',
        test3: 'test3',
    } as const;
    const result = initialFormDataCore(formKeys);
    // print(JSON.stringify(result));
    print(result);
});

// ==============================
// 2. isViolations
// ==============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-1'
// test('test2-1', () => {
// const text = ''; // JSONパース不可
// const result = isViolations(text);
// expect(result).toBe(false);
// });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-2'
// test('test2-2', () => {
// const text = { name: [''], email: [''], body: [''] };
// const json = JSON.stringify(text);
// const result = isViolations(json);
// expect(result).toBe(true);
// });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-3'
// test('test2-3', () => {
// const text = { name: [''], email: [''], body: [''] };
// const json = JSON.stringify(text);
// const result = isViolations(json, 'name', 'email');
// expect(result).toBe(false);
// });

// ==============================
// ４. validateFirst
// ==============================
// npm exec -- node --test --import tsx --test-name-pattern='^test4-1$' __development/tests/node-test/presentation/system/validation/validation.helper.test.ts
test('test4-1', () => {
    // const value = 'nameaaaaaaaaaaaaaaaaaaaaa';
    const value = '';
    const label = '名前';
    const max = 10;

    const violation = validateFirst(
        value,
        label,
    )([
        // 必須チェック
        required,
        // 桁数チェック
        validateMax(max),
    ]);
    print(violation);
});
