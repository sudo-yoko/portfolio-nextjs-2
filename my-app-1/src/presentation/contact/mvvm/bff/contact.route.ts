import 'server-only';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.bff.route';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { ContactBody, FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
    return executeAsync(() => func());

    async function func() {
        const contactBody: ContactBody = await req.json();
        logger.info(logPrefix + `contactBody=${JSON.stringify(contactBody)}`);

        const formData: FormData<FormKeys> = {
            name: contactBody.name,
            email: contactBody.email,
            body: contactBody.body,
        };
        const result = await execute(formData);
        // return resultResponse(result);
        return result;
    }
}
