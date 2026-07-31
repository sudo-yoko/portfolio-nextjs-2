import { OkData, OkEmpty } from '@/presentation/_system/result/result.types';

export type ErrTestResult = OkEmpty;
export type UsersResult<DATA> = OkData<DATA>;
