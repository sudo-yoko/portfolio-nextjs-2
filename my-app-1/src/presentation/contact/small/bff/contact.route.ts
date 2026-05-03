import 'server-only';

import { executeAsync } from '@/presentation/_system/aop/aop.bff.route';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/contact/small/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
    return executeAsync(() => func());

    async function func() {
        const formData: FormData<FormKeys> = await req.json();
        logger.info(logPrefix + `contactBody=${JSON.stringify(formData)}`);
        const result = await execute(formData);
        return result;
    }
}
