'use server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server-action';
import { RESULT } from '@/presentation/_system/result/result.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/users/min/modules/users.interactor';
import { FormKeys } from '@/presentation/users/min/modules/users.types';

export async function action(offset: number, limit: number, query: FormData<FormKeys>): Promise<RESULT> {
    // return await withErrorHandlingAsync(() => func());
    return await withAdviceAsync(() => _());

    async function _() {
        const result = await execute(offset, limit, query);
        // return JSON.stringify(result);
        return result;
    }
}
