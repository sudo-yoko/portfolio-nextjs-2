import { printf } from '@/__tests__/test-logger';
import { invalid } from '@/presentation/_system/result/result.core.factories';
import { isInvalid } from '@/presentation/_system/result/result.core.helpers';
import { Invalid } from '@/presentation/_system/result/result.core.types';
import { Violations } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/users/min/modules/users.types';

const print = printf({ logPrefix: '>>> [result.core.helpers.test.ts]', stdout: true });

test('test1-1', () => {
    const violations: Violations<FormKeys> = {
        userName: ['検索条件を入力してください。'],
    };
    const result: Invalid<FormKeys> = invalid(violations);

    if (isInvalid<FormKeys>(result)) {
        print(JSON.stringify(result));
        return;
    }
    print(JSON.stringify(result));
});
