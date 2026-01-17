import { ok } from '../../../../_proto/result.bff.factories';

test('test1-1', () => {
  const result = ok();
});

test('test1-2', () => {
  const data = {
    userName: 'test taro',
  };
  const result = ok(data);
});

test('test1-3', () => {
  // TODO: dataにnullも入れられる
  const result = ok(null);
});
