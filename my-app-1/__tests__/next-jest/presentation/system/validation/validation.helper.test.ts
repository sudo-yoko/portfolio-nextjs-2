import { hasError, isViolations } from '@/presentation/(system)/validation/validation.helpers';
import { Violations } from '@/presentation/(system)/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

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
            violation: ['aaa'],
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
            violation: [''], // TODO: 空文字の場合もエラーとして判定される
        },
        {
            field: FormKeys.email,
            violation: [],
        },
    ];
    const result = hasError(violations);
    expect(result).toBe(true);
});

// ==============================
// 2. isViolations
// ==============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-1'
test('test2-1', () => {
    const text = ''; // JSONパース不可
    const result = isViolations(text);
    expect(result).toBe(false);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-2'
test('test2-2', () => {
    const text = { name: [''], email: [''], body: [''] };
    const json = JSON.stringify(text);
    const result = isViolations(json);
    expect(result).toBe(true);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.helper.test.ts -t 'test2-3'
test('test2-3', () => {
    const text = { name: [''], email: [''], body: [''] };
    const json = JSON.stringify(text);
    const result = isViolations(json, 'name', 'email');
    expect(result).toBe(false);
});
