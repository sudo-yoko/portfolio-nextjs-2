import { printf } from '@/__tests__/test-logger';
import { Client, Method, Req, Result } from '@/presentation/_system/client/client.types';
// import { Method } from '@/presentation/(system)/client/client.types';

const print = printf({ logPrefix: '>>> [client.types.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.types.test.ts -t 'test1-1'
test('test1-1', async () => {
  const req: Req = {
    method: Method.GET,
    url: 'http://localhost:3000',
  };

  const res: Result = {
    status: 200,
    rawBody: '',
  };

  const client: Client = {
    send: async (_req) => {
      //   const res = await client.get<RES>(url, { params: { offset, limit, ...query } });
      //   const result = await axios.create().get(req.url);
      //   const res: Response = {
      // status: result.status,
      //   };
      return res;
    },
  };

  const result = await client.send(req);
  print(JSON.stringify(result));
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/client/client.types.test.ts -t 'test1-2'
test('test1-2', async () => {
  type ReqBody = {
    userId: string;
    userName: string;
  };
  const reqBody: ReqBody = {
    userId: '12345',
    userName: 'taro',
  };
  const req: Req<ReqBody> = {
    method: Method.GET,
    url: 'http://localhost:3000',
    body: reqBody,
  };

  const res: Result = {
    status: 200,
    rawBody: '',
  };

  const client: Client = {
    send: async (_req) => {
      return res;
    },
  };

  const result = await client.send<ReqBody>(req);
  print(JSON.stringify(req));
  print(JSON.stringify(result));
});
