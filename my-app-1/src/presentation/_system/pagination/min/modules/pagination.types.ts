import { Aborted, Invalid, OkData } from '@/presentation/_system/result/result.types';

/**
 * ページネーションのRESULT型
 */
export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD> | Aborted;
