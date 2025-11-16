// テスト実行
// npm exec -- node --test --import tsx __tests__/node-test/presentation/system/validation.test.ts

import { requiredEmail } from '@/presentation/(system)/validation/validators.email';
import { required } from '@/presentation/(system)/validation/validators.presence';
import test from 'node:test';

const consolePrefix = '### test: validator.test.ts >>> ';

void test('test1', () => {
  const result = required('', 'userId');
  console.log(consolePrefix + `result -> ${result}`);
});

void test('test2', () => {
  const result = requiredEmail('aaa', 'email');
  console.log(consolePrefix + `result -> ${result}`);
});
