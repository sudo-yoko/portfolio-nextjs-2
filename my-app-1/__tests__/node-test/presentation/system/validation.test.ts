// テスト実行
// npm exec -- node --test --import tsx __tests__/node-test/presentation/system/validation.test.ts

import { requiredEmail } from '@/presentation/(system)/validation/validators.email';
import { required } from '@/presentation/(system)/validation/validators.presence';
import test from 'node:test';

const consolePrefix = '### test: validator.test.ts >>> ';

test('test1', async () => {
  const result = required('', 'userId');
  console.log(consolePrefix + `result -> ${result}`);
});

test('test2', async () => {
  const result = requiredEmail('aaa', 'email');
  console.log(consolePrefix + `result -> ${result}`);
});
