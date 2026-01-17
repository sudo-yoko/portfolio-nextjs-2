//
// お問い合わせの送信 サーバーアクション
//
'use server';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.bff.action';
import logger from '@/presentation/_system/logging/logger.s';
import { RESULT } from '@/presentation/_system/result/result.core.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.action.ts: ';

export async function post(formData: FormData<FormKeys>): Promise<RESULT> {
    return await executeAsync(() => func());

    async function func() {
        logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
        const result = await execute(formData);
        // return JSON.stringify(result);
        return result;
    }
}
