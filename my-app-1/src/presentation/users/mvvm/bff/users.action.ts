'use server';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.bff.action';
import { RESULT } from '@/presentation/_system/result/result.core.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/users/mvvm/bff/users.interactor';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

export async function action(offset: string, limit: string, formData: FormData<FormKeys>): Promise<RESULT> {
    return await executeAsync(() => func());

    async function func() {
        const result = await execute(offset, limit, formData);
        // return JSON.stringify(result);
        return result;
    }
}
