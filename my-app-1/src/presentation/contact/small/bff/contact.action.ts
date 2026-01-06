//
// お問い合わせの送信 サーバーアクション
//
'use server';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.bff.action';
import logger from '@/presentation/(system)/logging/logger.s';
import { RESULT } from '@/presentation/(system)/result/result.core.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/contact/small/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';

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
