import { Invalid, OkData } from '@/presentation/_system/result/result.core.types';

/**
 * ページネーションのRESULT型
 */
// export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD> | Aborted; // TODO; Abortを返さないでエラーをスローしている
export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD>;
