'use server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server-action';
import { RESULT } from '@/presentation/_system/result/result.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/users/standard/bff/users.interactor';
import { FormKeys } from '@/presentation/users/standard/models/users.types';

export async function action(offset: string, limit: string, formData: FormData<FormKeys>): Promise<RESULT> {
    return await withAdviceAsync(() => _());

    async function _() {
        const result = await execute(offset, limit, formData);
        // return JSON.stringify(result);
        return result;
    }
}
