import { printf } from '../../../test-logger';
import { PaginationResult } from '@/presentation/_system/pagination/standard/models/pagination.types';
import { PageData } from '@/presentation/_system/pagination/standard/models/pagination.types.c';
import {
    isAborted,
    isInvalid,
    isOkData,
    isOkEmpty,
    isRetryable,
} from '@/presentation/_system/result/result.helpers';
import {
    Aborted,
    BffResult,
    Invalid,
    OkData,
    OkEmpty,
    Retryable,
} from '@/presentation/_system/result/result.types';

const print = printf({ logPrefix: '>>> [search-params.test.ts]', stdout: true });

// type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD>;
// type PageData<ITEMS> = { items: ITEMS; total: number };

test('test1-1', () => {
    // 型パラメータのままでも型推論が正しく維持されるかをテストする
    // 型パラメーターを持つ即時実行関数。この関数がコンパイルエラーにならないこと自体がテスト
    <ITEMS, FIELD extends string>(result: BffResult<PaginationResult<PageData<ITEMS>, FIELD>>) => {
        if (isOkEmpty(result)) {
            const expected: OkEmpty = result;
            print(expected);
            return;
        }
        if (isInvalid(result)) {
            const expected: Invalid<FIELD> = result; // 代入できること
            print(expected);
            return;
        }
        if (isOkData(result)) {
            const expected: OkData<PageData<ITEMS>> = result; // 代入できること
            print(expected);
            return;
        }
        if (isAborted(result)) {
            const expected: Aborted = result; // 代入できること
            print(expected);
            return;
        }
        if (isRetryable(result)) {
            const expected: Retryable = result; // 代入できること
            print(expected);
            return;
        }
        print(result);
    };
});

// function validate<ITEMS, FIELD extends string>(
//     result: BffResult<PaginationResult<PageData<ITEMS>, FIELD>>,
// ): RESULT {
//     if (isInvalid(result)) {
//         const invalid: Invalid<FIELD> = result;
//         return invalid;
//     }
//     if (isOkData(result)) {
//         const ok: OkData<PageData<ITEMS>> = result;
//         return ok;
//     }
//     return result;
// }

// type User = { userId: string; userName: string };
// const FormKeys = { keyword: 'keyword' } as const;
// type TFormKeys = (typeof FormKeys)[keyof typeof FormKeys];

// test('test1-1', () => {
//     //
//     // OkData
//     //
//     const users: User[] = [
//         { userId: '1', userName: 'ユーザー１' },
//         { userId: '2', userName: 'ユーザー２' },
//     ];
//     const pageData: PageData<User[]> = {
//         items: users,
//         total: 2,
//     };
//     const ok = okData<PageData<User[]>>(pageData);
//     //
//     // Invalid
//     //
//     const errors: Violations<TFormKeys> = [];
//     errors.push({
//         field: FormKeys.keyword,
//         violation: ['エラー'],
//     });
//     const inv = invalid<TFormKeys>(errors);
//     //
//     // 検証
//     //
//     const result: PaginationResult<PageData<User[]>, TFormKeys> = inv;
//     if (isInvalid(result)) {
//         result.violations;
//         const inf: Invalid<TFormKeys> = result;

//         print(inf);
//         return;
//     }
//     if (isOkData(result)) {
//         print(result);
//         return;
//     }
//     print(result);
// });
