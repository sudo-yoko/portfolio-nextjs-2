import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/contact/small/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
    return await withAdviceAsync(() => _());

    async function _() {
        const formData: FormData<FormKeys> = await req.json();
        logger.info(logPrefix + `contactBody=${JSON.stringify(formData)}`);
        const result = await execute(formData);
        return result;
    }
}
