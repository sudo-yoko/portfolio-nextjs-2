import { printf } from '@/__tests__/test-logger';
import { jest } from '@jest/globals';

const print = printf({ logPrefix: '>>> [client.impl.fetch.test.ts]', stdout: true });

test('test1-1', () => {
  global.fetch = jest.fn().mockResolvedValue(
    new Response(null, {
      status: 200,
    }) as never,
  ) as unknown as typeof fetch;
});
