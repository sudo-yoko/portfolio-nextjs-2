import assert from 'node:assert';
import test from 'node:test';

import { NodeEnv } from '@/env/src/internal/env.types';
import { envValidateNumValue, envValidateStringValue, isEnumValue } from '@/env/src/internal/env.utils';

// clear & npm exec -- node --test --import tsx src/env/env.utils.test.ts

//
// envRequiredStringValue
//
// npm exec -- node --test --import tsx --test-name-pattern=test1-1 src/env/env.utils.test.ts
void test('test1-1', () => {
    const value = undefined;
    try {
        envValidateStringValue(value, { key: 'testKey' });
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-2 src/env/env.utils.test.ts
void test('test1-2', () => {
    const value = '　';
    try {
        envValidateStringValue(value, { key: 'testKey' });
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-3 src/env/env.utils.test.ts
void test('test1-3', () => {
    const value = '';
    try {
        envValidateStringValue(value, { key: 'testKey' });
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-4 src/env/env.utils.test.ts
void test('test1-4', () => {
    const value = 'ABC';
    const result = envValidateStringValue(value, { key: 'testKey' });
    console.log(`result=[${result}]`);
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-5 src/env/env.utils.test.ts
void test('test1-5', () => {
    const value = ' A BC ';
    const result = envValidateStringValue(value, { key: 'testKey' });
    console.log(`result=[${result}]`);
});

//
// envRequiredNumValue
//
// npm exec -- node --test --import tsx --test-name-pattern=test2-1 src/env/env.utils.test.ts
void test('test2-1', () => {
    const value = '';
    try {
        const result = envValidateNumValue(value, { key: 'testKey' });
        console.log(`result=${result}`);
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test2-2 src/env/env.utils.test.ts
void test('test2-2', () => {
    const value = '12 3';
    try {
        const result = envValidateNumValue(value, { key: 'testKey' });
        console.log(`result=${result}`);
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test2-3 src/env/env.utils.test.ts
void test('test2-3', () => {
    const value = ' 123 ';
    const result = envValidateNumValue(value, { key: 'testKey' });
    console.log(`result=${result}`);
});

//
// isEnumValue
//
// npm exec -- node --test --import tsx --test-name-pattern=test3-1 src/env/env.utils.test.ts
void test('test3-1', () => {
    const value = undefined;
    assert.equal(isEnumValue(value, NodeEnv), true);
});

// npm exec -- node --test --import tsx --test-name-pattern=test3-2 src/env/env.utils.test.ts
void test('test3-2', () => {
    const value = 'development';
    assert.equal(isEnumValue(value, NodeEnv), true);
});

// npm exec -- node --test --import tsx --test-name-pattern=test3-3 src/env/env.utils.test.ts
void test('test3-3', () => {
    const value = 'dev';
    assert.equal(isEnumValue(value, NodeEnv), false);
});
