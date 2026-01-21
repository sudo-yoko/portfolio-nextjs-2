import { printf } from '@/__tests__/test-logger';
import { requiredAny } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';

const print = printf({ logPrefix: '>>> [validation.types.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/validation/validators.presence.test.ts -t 'test1-1'
test('test1-1', () => {
    const values: string[] = ['', ''];
    const labels: string[] = [FormKeys.userId, FormKeys.userName];
    const result = requiredAny(values, labels);
    print(result);
});
