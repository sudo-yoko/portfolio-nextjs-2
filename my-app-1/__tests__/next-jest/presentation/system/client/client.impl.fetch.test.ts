import { printf } from '@/__tests__/test-logger';
import { clientImpl } from '@/presentation/(system)/client/client.impl.fetch';
import { Method } from '@/presentation/(system)/client/client.types';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [client.impl.fetch.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.impl.fetch.test.ts -t '^test1-1$'
test('test1-1', async () => {
  global.fetch = jest.fn().mockResolvedValue(
    new Response('zzzzzzzzzzzzzzzzz', {
      status: 500,
    }) as never,
  ) as unknown as typeof fetch;

  try {
    await clientImpl.send({
      method: Method.GET,
      url: 'http://xxxxxxxx',
    });
  } catch (e) {
    const { all, message } = stringify(e);
    print(`message=${message}`);
    print(`all=${all}`);
  }
});
