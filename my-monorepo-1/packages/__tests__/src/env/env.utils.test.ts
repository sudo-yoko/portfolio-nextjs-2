import assert from 'node:assert';
import test from 'node:test';

import { envRequiredNumValue, envRequiredStringValue } from '@/env/src/internal/env.utils';

//
// envRequiredStringValue
//
// npm exec -- node --test --import tsx --test-name-pattern=test1-1 src/env/env.utils.test.ts
void test('test1-1', () => {
    const value = undefined;
    try {
        envRequiredStringValue(value, 'testKey');
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-2 src/env/env.utils.test.ts
void test('test1-2', () => {
    const value = '　';
    try {
        envRequiredStringValue(value, 'testKey');
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-3 src/env/env.utils.test.ts
void test('test1-3', () => {
    const value = '';
    try {
        envRequiredStringValue(value, 'testKey');
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-4 src/env/env.utils.test.ts
void test('test1-4', () => {
    const value = 'ABC';
    const result = envRequiredStringValue(value, 'testKey');
    console.log(`result=[${result}]`);
});

// npm exec -- node --test --import tsx --test-name-pattern=test1-5 src/env/env.utils.test.ts
void test('test1-5', () => {
    const value = ' A BC ';
    const result = envRequiredStringValue(value, 'testKey');
    console.log(`result=[${result}]`);
});

//
// envRequiredNumValue
//
// npm exec -- node --test --import tsx --test-name-pattern=test2-1 src/env/env.utils.test.ts
void test('test2-1', () => {
    const value = '';
    try {
        const result = envRequiredNumValue(value, 'testKey');
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
        const result = envRequiredNumValue(value, 'testKey');
        console.log(`result=${result}`);
        assert.fail();
    } catch (e) {
        console.log(e);
    }
});

// npm exec -- node --test --import tsx --test-name-pattern=test2-3 src/env/env.utils.test.ts
void test('test2-3', () => {
    const value = ' 123 ';
    const result = envRequiredNumValue(value, 'testKey');
    console.log(`result=${result}`);
});
