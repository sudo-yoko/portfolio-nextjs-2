import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import { requestAddress } from '@/presentation/backend-lib/zipcloud/zipcloud.client';
import {
    ZipCloudRequest,
    ZipCloudResponse,
    ZipCloudResponseOk,
} from '@/presentation/backend-lib/zipcloud/zipcloud.types';
import { errLog, printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[zipcloud.client.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/backend-lib/zipcloud.client.test.ts -t 'test1-1'
test('test1-1', async () => {
    const req: ZipCloudRequest = {
        // zipcode: '1000001', // 1件あり
        // zipcode: '0790177', // 複数件あり
        zipcode: '0000000', // 該当なし
    };
    try {
        const result = await requestAddress(req);
        print(`[${expect.getState().currentTestName}]`, 'result ->', result);
    } catch (e) {
        print(errLog(e));
    }
});
