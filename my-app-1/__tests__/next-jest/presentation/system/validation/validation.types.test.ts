import { printf } from '@/__tests__/test-logger';
import { getViolationsMap } from '@/presentation/(system)/validation/validation.helpers';
import {
    FormData,
    FormValidator,
    Violations,
    Validator,
    Violation,
} from '@/presentation/(system)/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const print = printf({ logPrefix: '>>> [validation.types.test.ts]', stdout: true });

// =============================
// 1. type FormData のテスト
// =============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.types.test.ts -t 'test1-1'
test('test1-1', () => {
    // キーの定義
    const FormKeys = {
        name: 'name',
        email: 'email',
        body: 'body',
    } as const;
    type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

    // データの定義
    const formData: FormData<FormKeys> = { name: 'test name', email: 'test mail', body: 'test body' };
    print(JSON.stringify(formData));

    // データの定義（配列の場合）
    const formDataArray: FormData<FormKeys, string[]> = {
        name: ['test name'],
        email: ['test mail'],
        body: ['test body'],
    };
    print(JSON.stringify(formDataArray));
});

// =============================
// 3. type Validator のテスト
// =============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.types.test.ts -t 'test3-1'
test('test3-1', () => {
    const validate: Validator = (value, label) => {
        // const violation: Violation<FormKeys> = {
        // field,
        // messages: [],
        // };
        // const messages: string[] = [];
        const errors: string[] = [];
        if (value === '') {
            errors.push(`${label}が未入力です。`);
        }
        if (value === '') {
            errors.push(`${label}がありません。`);
        }
        // return errors;
        // violation.messages.push(...messages); // TODO: readonlyについて
        return errors;
    };
    const result = validate('', 'ユーザー名');
    print(JSON.stringify(result));
    //print(result);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.types.test.ts -t 'test3-2'
test('test3-2', () => {
    type Users = 'user1' | 'user2';
    const validate: Validator<FormData<Users>> = (value, label) => {
        const errors: Violation = [];
        if (value.user1 === '' && value.user2 === '') {
            errors.push(`${label}が未入力です。`);
        }
        // return errors;
        //violation.messages.push(...messages);
        return errors;
    };
    const formData: FormData<Users> = {
        user1: '',
        user2: '',
    };
    const result = validate(formData, 'ユーザー');
    print(JSON.stringify(result));
});

// =============================
// 5. type FormValidator のテスト
// =============================
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.types.test.ts -t 'test5-1'
test('test5-1', () => {
    // 必須入力バリデーターを定義
    const required: Validator = (value, label) => {
        const errors: Violation = [];
        if (value === '') {
            errors.push(`${label}を入力してください。`);
        }
        // violation.messages.push(...messages);
        return errors;
    };

    const formValidator: FormValidator<FormKeys> = (formData) => {
        const violations: Violations<FormKeys> = [];
        violations.push({
            field: FormKeys.body,
            violation: required(formData[FormKeys.body], 'お問い合わせ内容'),
        });
        violations.push({ field: FormKeys.email, violation: required(formData.email, 'メールアドレス') });
        violations.push({ field: FormKeys.name, violation: required(formData.name, 'お名前') });
        return violations;
    };

    const formData: FormData<FormKeys> = {
        body: '',
        email: '',
        name: '',
    };
    const result = formValidator(formData);
    print(JSON.stringify(result));
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validation.types.test.ts -t 'test6-1'
test('test6-1', () => {
    const violations: Violations<FormKeys> = [
        {
            field: FormKeys.body,
            violation: ['aaa', 'bbb'],
        },
        {
            field: FormKeys.email,
            violation: ['ssss'],
        },
    ];
    const result = getViolationsMap(violations);
    print(`ModelViolations=${JSON.stringify(violations)}`);
    print(`UiViolations=${JSON.stringify(result)}`);
});
