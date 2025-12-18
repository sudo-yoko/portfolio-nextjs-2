import { printf } from '@/__tests__/test-logger';

const print = printf({ logPrefix: '>>> [aop.core.exception.bff.action.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/aop/aop.core.exception.bff.action.test.ts -t '^test1-1$'
test('test1-1', () => {
  const message1 = 'message1';
  const message2 = 'message2';
  const message3 = 'message3';

  let args = {}; // オブジェクト型ではなく、何も保証しない広い型
  args = { m1: message1 };
  args = { ...args, m2: message2 };
  args = { ...args, m3: message3 };

  print(JSON.stringify(args));
});
