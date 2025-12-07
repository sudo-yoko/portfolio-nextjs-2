// 型推論の検証

import { okData } from '@/presentation/(system)/result/result.core.factories';
import { isAborted, isInvalid } from '@/presentation/(system)/result/result.core.helpers';
import { Aborted, Invalid, OkData, OkEmpty } from '@/presentation/(system)/result/result.core.types';

type Ok<DATA = void> = [DATA] extends [void] ? OkEmpty : OkData<DATA>;
type BffResult<DATA = void, FIELD extends string = never> = Ok<DATA> | Invalid<FIELD> | Aborted;

// この書き方だと、OkEmptyとOkDataのどっちなのかを推論できない。
// type BffResult<DATA = void, FIELD extends string = never> = OkEmpty | OkData<DATA> | Invalid<FIELD> | Aborted;

type Data = {
  userId: string;
};
const data: Data = {
  userId: '12345',
};
const result: BffResult<Data> = okData(data);

if (isAborted(result)) {
  throw Error();
}
if (isInvalid(result)) {
  process.exit();
}
console.log(result.data);
