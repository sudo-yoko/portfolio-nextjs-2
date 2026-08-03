import test from 'node:test';

import { printf } from '@/tests/test-logger';
import { getQueryString } from '@/presentation/_system/types/search-params';

const print = printf({ logPrefix: '[search-params.test.ts]', stdout: true });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test1-1', (t) => {
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
    const query = getQueryString(contact);
    print(`[${t.name}]`, 'result ->', query);
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/presentation/system/search-params.test.ts
test('test1-2', (t) => {
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
    const query = getQueryString(contact);
    print(`[${t.name}]`, 'result ->', query);
});

// // npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/presentation/system/search-params.test.ts
// test('test1-1', (t) => {
//     let queryParam: QueryParam = [];
//     queryParam = [
//         {
//             key: 'key1',
//             value: 'key1Value2',
//         },
//         {
//             key: 'key1',
//             value: 'key1Value2',
//         },
//     ];
//     const result = getURLSearchParams(queryParam);
//     print('result -> ', result);

//     const query = getQueryString(queryParam);
//     print('query -> ', query);
// });
