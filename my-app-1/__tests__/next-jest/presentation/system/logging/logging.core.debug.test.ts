import { printf } from '@/__tests__/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [logging.core.debug.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/logging/logging.core.debug.test.ts -t 'test1-1'
test('test1-1', async () => {
    jest.unstable_mockModule('@/presentation/(system)/env/env.helper.validated', () => ({
        __esModules: true,
        envByStaticKey: {
            get NODE_ENV() {
                return 'production';
            },
            get NEXT_PUBLIC_DEBUG_LOGGER() {
                // return undefined;
                return 'true';
            },
        },
    }));

    const debug = (await import('@/presentation/_system/logging/logging.core.debug')).default;

    print('start');
    const param1 = 'param1';
    const param2 = 'param2';
    debug('debug', { param1, param2 }); // TODO: console.logは、このような書き方ができる。
    print('end');
});
