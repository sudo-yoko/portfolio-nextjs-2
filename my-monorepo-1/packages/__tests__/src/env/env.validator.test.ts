import assert from 'node:assert';
import test, { before, describe } from 'node:test';

import { NodeEnv } from '@/env/src/internal/isomophic/env.types';
import { assertThrows } from '@/tests/test-utils';

// clean & npm exec -- node --test --experimental-test-module-mocks --import tsx src/env/env.validator.test.ts
// clear & npm run node:test -- src/env/env.validator.test.ts
void describe('', () => {
    type moduleType = typeof import('@/env/src/internal/isomophic/env.validator');
    let isEnumValue: moduleType['isEnumValue'];
    let envValidateStringValue: moduleType['envValidateStringValue'];
    let envValidateNumValue: moduleType['envValidateNumValue'];
    let envValidateBooleanValue: moduleType['envValidateBooleanValue'];

    before(async () => {
        const moduleName = '@/env/src/internal/isomophic/env.validator';
        isEnumValue = (await import(moduleName)).isEnumValue;
        envValidateStringValue = (await import(moduleName)).envValidateStringValue;
        envValidateNumValue = (await import(moduleName)).envValidateNumValue;
        envValidateBooleanValue = (await import(moduleName)).envValidateBooleanValue;
    });

    ////////////////////////////////
    // 1. isEnumValue
    ////////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test1-1 src/env/env.validator.test.ts
    void test('test1-1', () => {
        const value = undefined;
        assert.equal(isEnumValue(value, NodeEnv), true);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-2 src/env/env.validator.test.ts
    void test('test1-2', () => {
        const value = 'development';
        assert.equal(isEnumValue(value, NodeEnv), true);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-3 src/env/env.validator.test.ts
    void test('test1-3', () => {
        const value = 'dev';
        assert.equal(isEnumValue(value, NodeEnv), false);
    });

    ////////////////////////////////
    // 2. envValidateStringValue
    ////////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test2-1 src/env/env.validator.test.ts
    void test('test2-1', (t) => {
        const value = undefined;
        // オプション指定あり
        const error1 = assertThrows(() => envValidateStringValue(value, { key: 'testKey' }));
        console.log(`${t.name}:\n`, error1);
        assert.match(error1.message, /環境変数が設定されていません。/);
        // オプション指定なし
        const error2 = assertThrows(() => envValidateStringValue(value));
        console.log(`${t.name}:\n`, error2);
        assert.match(error2.message, /環境変数が設定されていません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-2 src/env/env.validator.test.ts
    void test('test2-2', (t) => {
        const value = '　';
        const error = assertThrows(() => envValidateStringValue(value));
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /環境変数が設定されていません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-3 src/env/env.validator.test.ts
    void test('test2-3', (t) => {
        const value = '';
        const error = assertThrows(() => envValidateStringValue(value));
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /環境変数が設定されていません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-4 src/env/env.validator.test.ts
    void test('test2-4', (t) => {
        const value = 'ABC';
        const result = envValidateStringValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-5 src/env/env.validator.test.ts
    void test('test2-5', (t) => {
        const value = ' A BC ';
        const result = envValidateStringValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });

    ////////////////////////////////
    // 3. envValidateNumValue
    ////////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test3-1 src/env/env.validator.test.ts
    void test('test3-1', (t) => {
        const value = undefined;
        // オプション指定あり
        const error1 = assertThrows(() => envValidateNumValue(value, { key: 'testKey' }));
        console.log(`${t.name}:\n`, error1);
        assert.match(error1.message, /環境変数が設定されていません。/);
        // オプション指定なし
        const error2 = assertThrows(() => envValidateNumValue(value));
        console.log(`${t.name}:\n`, error2);
        assert.match(error2.message, /環境変数が設定されていません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test3-2 src/env/env.validator.test.ts
    void test('test3-2', (t) => {
        const value = 'ABC';
        // オプション指定あり
        const error1 = assertThrows(() => envValidateNumValue(value, { key: 'testKey' }));
        console.log(`${t.name}:\n`, error1);
        assert.match(error1.message, /環境変数が数値ではありません。/);
        // オプション指定なし
        const error2 = assertThrows(() => envValidateNumValue(value));
        console.log(`${t.name}:\n`, error2);
        assert.match(error2.message, /環境変数が数値ではありません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test3-3 src/env/env.validator.test.ts
    void test('test3-3', (t) => {
        const value = '12 3';
        const error = assertThrows(() => envValidateNumValue(value));
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /環境変数が数値ではありません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test3-4 src/env/env.validator.test.ts
    void test('test3-4', (t) => {
        const value = ' 123 ';
        const result = envValidateNumValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });

    // clear & npm run node:test -- --test-name-pattern=test3-5 src/env/env.validator.test.ts
    void test('test3-5', (t) => {
        const value = '123';
        const result = envValidateNumValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });

    ////////////////////////////////
    // 4. envValidateBooleanValue
    ////////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test4-1 src/env/env.validator.test.ts
    void test('test4-1', (t) => {
        const value = undefined;
        // オプション指定あり
        const error1 = assertThrows(() => envValidateBooleanValue(value, { key: 'testKey' }));
        console.log(`${t.name}:\n`, error1);
        assert.match(error1.message, /環境変数が設定されていません。/);
        // オプション指定なし
        const error2 = assertThrows(() => envValidateBooleanValue(value));
        console.log(`${t.name}:\n`, error2);
        assert.match(error2.message, /環境変数が設定されていません。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test4-2 src/env/env.validator.test.ts
    void test('test4-2', (t) => {
        const value = 'ABC';
        const error = assertThrows(() => envValidateBooleanValue(value));
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /真偽値は 1 または 0 を設定してください。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test4-3 src/env/env.validator.test.ts
    void test('test4-3', (t) => {
        const value = '2';
        const error = assertThrows(() => envValidateBooleanValue(value));
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /真偽値は 1 または 0 を設定してください。/);
    });

    // clear & npm run node:test -- --test-name-pattern=test4-4 src/env/env.validator.test.ts
    void test('test4-4', (t) => {
        const value = '0';
        const result = envValidateBooleanValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });

    // clear & npm run node:test -- --test-name-pattern=test4-5 src/env/env.validator.test.ts
    void test('test4-5', (t) => {
        const value = '1';
        const result = envValidateBooleanValue(value);
        console.log(`${t.name}: result=[${result}]`);
    });
});
