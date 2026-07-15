import test from 'node:test';

import { printf } from '@/__tests__/test-logger';
import { getArrayParam, getStringParam, SearchParams } from '@/presentation/_system/types/search-params';

const print = printf({ logPrefix: '>>> [search-params.test.ts]', stdout: false });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __tests__/node-test/presentation/system/search-params.test.ts
test('test1-1', async (t) => {
    const logPrefix = `${t.name}: `;

    const str = await getStringParam(undefined, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(undefined, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __tests__/node-test/presentation/system/search-params.test.ts
test('test1-2', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: 'key1',
    });
    const str = await getStringParam(searchParams, 'key0');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key0');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __tests__/node-test/presentation/system/search-params.test.ts
test('test1-3', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: '',
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-4$' __tests__/node-test/presentation/system/search-params.test.ts
test('test1-4', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: undefined,
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-5$' __tests__/node-test/presentation/system/search-params.test.ts
test('test1-5', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: '  　',
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-1$' __tests__/node-test/presentation/system/search-params.test.ts
test('test2-1', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: ['', 'key1'],
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-2$' __tests__/node-test/presentation/system/search-params.test.ts
test('test2-2', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: ['  　', 'key1'],
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-3$' __tests__/node-test/presentation/system/search-params.test.ts
test('test2-3', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: [' key10 　', 'key1'],
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test2-4$' __tests__/node-test/presentation/system/search-params.test.ts
test('test2-4', async (t) => {
    const logPrefix = `${t.name}: `;

    const searchParams: SearchParams = Promise.resolve({
        key1: ['key11', 'key12'],
        key2: 'key2',
    });
    const str = await getStringParam(searchParams, 'key1');
    print(logPrefix + `result -> str=|${str}|`);

    const arr = await getArrayParam(searchParams, 'key1');
    print(logPrefix + 'result -> arr=', arr);

    const str2 = await getStringParam(searchParams, 'key2');
    print(logPrefix + `result -> str=|${str2}|`);

    const arr2 = await getArrayParam(searchParams, 'key2');
    print(logPrefix + 'result -> arr=', arr2);
});
