import { printf } from '@/__tests__/test-logger';
import {
  BFF_RESULT,
  BffError,
  CUSTOM_ERROR_TAG,
  CustomError,
  ErrType,
} from '@/presentation/(system)/errors/error.types';

const print = printf({ logPrefix: '>>> [error.types.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-1$'
test('test1-1', () => {
  const error: CustomError<typeof ErrType.AuthError> = {
    [CUSTOM_ERROR_TAG]: ErrType.AuthError,
    name: 'name',
    message: 'message',
    cause: 'cause',
    stack: 'stack',
  };
  print(`error[CUSTOM_ERROR_TAG]=${error[CUSTOM_ERROR_TAG]}`);
  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-2$'
test('test1-2', () => {
  const error: BffError = {
    [CUSTOM_ERROR_TAG]: ErrType.BffError,
    name: 'name',
    message: 'message',
    cause: 'cause',
    stack: 'stack',
    [BFF_RESULT]: {
      tag: 'abort',
    },
  };
  print(`error[CUSTOM_ERROR_TAG]=${error[CUSTOM_ERROR_TAG]}`);
  print(`error[BFF_RESULT]=${JSON.stringify(error[BFF_RESULT])}`);
  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
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

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __tests__/next-jest/presentation/system/errors/error.types.test.ts -t '^test1-4$'
test('test1-4', () => {
  const error = new Error();

  print(`error.name=${error.name}`);
  print(`error.message=${error.message}`);
  print(`error.cause=${error.cause}`);
  print(`error.stack=${error.stack}`);
});
