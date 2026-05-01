import test from 'node:test';

import { printf } from '@/__tests__/test-logger';
import { queryParam } from '@/presentation/_system/client/client.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { UsersQuery } from '@/presentation/users/mvvm/models/users.types';

const print = printf({ logPrefix: '>>> [client.helpers.test.ts]', stdout: true });

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-1', () => {
    const result = queryParam({ offset: '1', limit: '100' });
    print(JSON.stringify(result));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-2', () => {
    const result = queryParam({ userIds: ['0001', '0002'] });
    print(JSON.stringify(result));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-3$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-3', () => {
    const result = queryParam({ userIds: [] });
    print(JSON.stringify(result));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-4$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-4', () => {
    type FormKeys = 'userId' | 'userName';
    const formData: FormData<FormKeys> = {
        userId: '1234',
        userName: '',
    };
    const result = queryParam(formData);
    print(JSON.stringify(result));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-5$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-5', () => {
    const usersQuery: UsersQuery = {
        limit: '1',
        offset: '10',
    };
    const result = queryParam(usersQuery);
    print(JSON.stringify(result));
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-6$' __tests__/node-test/presentation/system/client.helpers.test.ts
await test('test1-6', () => {
    const usersQuery: UsersQuery = {
        limit: '1',
        offset: '10',
    };
    const result = queryParam({ ...usersQuery });
    print(JSON.stringify(result));
});
