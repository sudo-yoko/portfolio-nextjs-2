import test from 'node:test';

import { printf } from '@/__tests__/test-logger';
import { QueryParam } from '@/presentation/_system/client/client.types';

const print = printf({ logPrefix: '>>> [client.types.test.ts]', stdout: true });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __tests__/node-test/presentation/system/client.types.test.ts
await test('test1-1', () => {
    const queryParam: QueryParam = [{ key: '', value: '' }];
    print(JSON.stringify(queryParam));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __tests__/node-test/presentation/system/client.types.test.ts
await test('test1-2', () => {
    const queryParam: QueryParam = [{ key: 'offset', value: '1' }];
    print(JSON.stringify(queryParam));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __tests__/node-test/presentation/system/client.types.test.ts
await test('test1-3', () => {
    const queryParam: QueryParam = [
        { key: 'userIds', value: '0001' },
        { key: 'userIds', value: '0002' },
    ];
    print(JSON.stringify(queryParam));
});
