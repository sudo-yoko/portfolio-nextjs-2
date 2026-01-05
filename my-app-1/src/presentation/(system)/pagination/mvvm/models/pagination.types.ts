import { Aborted, Invalid, OkData } from '@/presentation/(system)/result/result.core.types';

/**
 * ページネーションのRESULT型
 */
export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD> | Aborted; // TODO; Abortを返さないでエラーをスローしている
