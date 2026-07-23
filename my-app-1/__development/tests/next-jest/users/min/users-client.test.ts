//
// テスト実行方法
// ターミナルを２つ立ち上げて、一方で npm run mock2、もう一方で以下を実行する
// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/users/min/users-client.test.ts
//
import { send } from '@/presentation/users/min/modules/users.client';

const consolePrefix = '### test: users-client.test.ts >>> ';

test('test1-1', async () => {
  const result = await send(1, 19, { userName: 'test' });
  console.log(consolePrefix + JSON.stringify(result));
});
