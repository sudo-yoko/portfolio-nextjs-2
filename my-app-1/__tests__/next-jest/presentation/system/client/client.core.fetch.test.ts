import { printf } from '@/__tests__/test-logger';
import { clientImpl } from '@/presentation/_system/client/client.impl.fetch';
import { Method, Result } from '@/presentation/_system/client/client.types';
import { jest } from '@jest/globals';

// import { Method } from '@/presentation/(system)/client/client.types';

const print = printf({ logPrefix: '>>> [client.types.test.ts]', stdout: true });

interface ResBody {
  userId: string;
  userName: string;
}

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.core.fetch.test.ts -t 'test1-1'
test('test1-1', async () => {
  // fetch をモックする
  global.fetch = jest.fn().mockResolvedValue(
    new Response(null, {
      status: 200,
    }) as never,
  ) as unknown as typeof fetch;

  // 実行
  const result = await clientImpl.send({
    method: Method.GET,
    url: 'http://xxxxx',
  });
  print('result=' + JSON.stringify(result));
  // print('result=' + JSON.parse(result.rawBody));
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.core.fetch.test.ts -t 'test1-2'
test('test1-2', async () => {
  // fetch をモックする
  global.fetch = jest.fn().mockResolvedValue(
    new Response(null, {
      status: 500,
    }) as never,
  ) as unknown as typeof fetch;

  // 実行
  const result = await clientImpl.send({
    method: Method.GET,
    url: 'http://xxxxx',
  });
  print('result=' + JSON.stringify(result));
});

// レスポンスボディあり
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.core.fetch.test.ts -t 'test1-3'
test('test1-3', async () => {
  const resBody: ResBody = {
    userId: '1234',
    userName: 'taro',
  };
  // fetch をモックする
  global.fetch = jest.fn().mockResolvedValue(
    new Response(JSON.stringify(resBody), {
      status: 200,
    }) as never,
  ) as unknown as typeof fetch;

  // 実行
  const result = await clientImpl.send({
    method: Method.GET,
    url: 'http://xxxxx',
  });

  print('result=' + JSON.stringify(result));
  if (result.rawBody) {
    const body: Result = JSON.parse(result.rawBody);
    print('body=' + JSON.stringify(body));
  }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.core.fetch.test.ts -t 'test1-4'
test('test1-4', async () => {
  // fetch をモックする
  global.fetch = jest.fn().mockResolvedValue(
    new Response('aaaaaaaaaaaaaaaaa', {
      status: 500,
    }) as never,
  ) as unknown as typeof fetch;

  // 実行
  const result = await clientImpl.send({
    method: Method.GET,
    url: 'http://xxxxx',
  });

  print('result=' + JSON.stringify(result));

  if (result.status === 200) {
    if (result.rawBody) {
      const body: Result = JSON.parse(result.rawBody);
      print('body=' + JSON.stringify(body));
    }
  }
});
