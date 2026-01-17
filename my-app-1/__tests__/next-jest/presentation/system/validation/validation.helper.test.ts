import { printf } from '@/__tests__/test-logger';
import { stringify } from '@/presentation/_system/error/error.helper.stringify';
import { isInvalid } from '@/presentation/_system/result/result.core.helpers';
import { Invalid, Tag } from '@/presentation/_system/result/result.core.types';
import { hasError, initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { Violations } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const print = printf({ logPrefix: '>>> [validation.types.test.ts]', stdout: true });

// ==============================
// 1. hasError
// ==============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-1'
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
    expect(result).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-2'
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
    expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-3'
test('test1-3', () => {
    const violations: Violations<FormKeys> = [];
    const result = hasError(violations);
    expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-4'
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
    expect(result).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-5'
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
    expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-6'
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
    expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-7'
test('test1-7', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: ['　'],
        },
    ];
    const result = hasError(violations);
    expect(result).toBe(false);
});

// invalidでviolationsが無い場合のhasErrorのテスト
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-8'
test('test1-8', () => {
    // 不正なInvalid
    const result = {
        tag: Tag.Invalid,
    };
    if (isInvalid(result)) {
        print(`result=${result.violations}`);
        expect(() => hasError(result.violations)).toThrow(Error);
        try {
            hasError(result.violations);
        } catch (e) {
            print(stringify(e).all);
        }
    }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test1-9'
test('test1-9', () => {
    const result: Invalid<FormKeys> = {
        tag: Tag.Invalid,
        // violations: [{ field: FormKeys.body, violation: ['aaa', 'zzz'] }],
        violations: [],
    };
    if (isInvalid(result)) {
        print(`result=${JSON.stringify(result.violations)}`);
        const isError = hasError(result.violations);
        expect(isError).toBe(false);
    }
});

// ==============================
// 3. initialFormData
// ==============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test3-1'
test('test3-1', () => {
    const formKeys = {
        test1: 'test1',
        test2: 'test2',
        test3: 'test3',
    } as const;
    const result = initialFormDataCore(formKeys);
    print(JSON.stringify(result));
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
