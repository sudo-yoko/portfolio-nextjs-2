'use server';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.bff.action';
import { RESULT } from '@/presentation/(system)/result/result.core.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/users/min/modules/users.interactor';
import { FormKeys } from '@/presentation/users/min/modules/users.types';

export async function action(offset: number, limit: number, query: FormData<FormKeys>): Promise<RESULT> {
    // return await withErrorHandlingAsync(() => func());
    return await executeAsync(() => func());

    async function func() {
        const result = await execute(offset, limit, query);
        // return JSON.stringify(result);
        return result;
    }
}
