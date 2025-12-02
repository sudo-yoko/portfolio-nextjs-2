import { printf } from '@/__tests__/test-logger';
import { BffError, CustomError, ErrType } from '@/presentation/(system)/errors/error.types';

const print = printf({ logPrefix: '>>> [error.types.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-1$'
test('test1-1', () => {
  const error: CustomError<typeof ErrType.AuthError> = {
    errType: ErrType.AuthError,
    name: 'name',
    message: 'message',
    cause: 'cause',
    stack: 'stack',
  };
  print(`error.errType=${error.errType}`);
  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-2$'
test('test1-2', () => {
  const error: BffError = {
    errType: ErrType.BffError,
    name: 'name',
    message: 'message',
    cause: 'cause',
    stack: 'stack',
    bffResult: {
      tag: 'abort',
    },
  };
  print(`error.errType=${error.errType}`);
  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
  print(`error.bffResult=${JSON.stringify(error.bffResult)}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-3$'
test('test1-3', () => {
  const error: Error = {
    name: 'name',
    message: 'message',
    cause: 'cause',
    stack: 'stack',
  };
  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
});
