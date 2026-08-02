import test from 'node:test';

import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[webToCase.client.test.ts]', stdout: true });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/backend-lib/webToCase.client.test.ts
test('test1-1', (t) => {
    const record: Record<string, string> = {};
    record['key1'] = 'key1Value1';
    record['key1'] = 'key1Value2';
    record['key2'] = 'key2Value';
    print(`[${t.name}]`, record);

    const params = new URLSearchParams(record).toString();
    print('searchParams -> ' + params);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/backend-lib/webToCase.client.test.ts
test('test1-2', (t) => {
    const record: Record<string, string | string[]> = {};
    record['key1'] = ['key1Value1', 'key1Value2'];
    record['key2'] = 'key2Value';
    print(`[${t.name}]`, record);

    // TODO
    // const params = new URLSearchParams(record).toString();
    // print('searchParams -> ' + params);
});
