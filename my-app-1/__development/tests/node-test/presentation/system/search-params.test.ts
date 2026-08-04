import test from 'node:test';

import {
    Form,
    QueryParams,
    toForm,
    toQueryParams,
    toQueryString,
    toURLSearchParams,
} from '@/presentation/_system/types/search-params';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[search-params.test.ts]', stdout: true });

//
// toQueryParams
//
// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test1-1', (t) => {
    const form: Form = {};
    form['name'] = 'aaa';
    form['email'] = 'aaa1@test.com';
    form['body'] = 'test';

    const result = toQueryParams(form);
    print(`[${t.name}]`, 'result ->', result);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test1-2', (t) => {
    const form: Form = {};
    form['name'] = 'aaa';
    form['email'] = ['aaa1@test.com', 'bbb2@test.com'];
    form['body'] = 'test';

    const result = toQueryParams(form);
    print(`[${t.name}]`, 'result ->', result);
});

//
// toURLSearchParams
//
// npm exec -- node --test --import tsx --test-name-pattern='^test2-1$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test2-1', (t) => {
    const params: QueryParams = [];
    params.push(
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2' },
        { key: 'key3', value: 'value3' },
    );
    const result = toURLSearchParams(params);
    print(`[${t.name}]`, 'result ->', result);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-2$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test2-2', (t) => {
    const params: QueryParams = [];
    params.push(
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2-1' },
        { key: 'key2', value: 'value2-2' },
        { key: 'key3', value: 'value3' },
    );
    const result = toURLSearchParams(params);
    print(`[${t.name}]`, 'result ->', result);
});

//
// toQueryString
//
// npm exec -- node --test --import tsx --test-name-pattern='^test3-1$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test3-1', (t) => {
    type ContactBody = {
        name: string;
        email: string;
        body: string;
    };
    const contact: ContactBody = {
        name: 'taro',
        email: 'test@test.com',
        body: 'test',
    };
    const result = toQueryString(contact);
    print(`[${t.name}]`, 'result ->', result);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test3-2$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test3-2', (t) => {
    type ContactBody = {
        name: string;
        email: string[];
        body: string;
    };
    const contact: ContactBody = {
        name: 'taro',
        email: ['test1@test.com', 'test2@test.com'],
        body: 'test',
    };
    const result = toQueryString(contact);
    print(`[${t.name}]`, 'result ->', result);
});

//
// toForm
//
// npm exec -- node --test --import tsx --test-name-pattern='^test4-1$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test4-1', (t) => {
    const params = new URLSearchParams();
    params.append('key1', 'value-1');
    params.append('key2', 'value-2-1');
    params.append('key2', 'value-2-2');
    params.append('key3', 'value-3');
    print(`[${t.name}]`, 'params ->', params);

    const form = toForm(params);
    print(`[${t.name}]`, 'form ->', form);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test4-2$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test4-2', (t) => {
    const params = new URLSearchParams();
    print(`[${t.name}]`, 'params ->', params);

    const form = toForm(params);
    print(`[${t.name}]`, 'form ->', form);
});
