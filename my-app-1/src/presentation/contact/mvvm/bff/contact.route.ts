import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { parse } from '@/presentation/contact/mvvm/bff/contact.route.parser';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
    return await withAdviceAsync(() => _());

    async function _() {
        // TODO: Route Handler用のパーサー
        // const contactBody: ContactBody = await req.json();
        // NOTE: req.json()で取得すると型がanyになる。req.text()で取得するとstringになるので、こちらの方が扱いやすい
        // const body = await req.text();
        const { body } = await parse(req);

        logger.info(logPrefix + `contactBody=${JSON.stringify(body)}`);

        const formData: FormData<FormKeys> = {
            name: body.name,
            email: body.email,
            body: body.body,
        };
        // TODO: 以下の書き方でもOK？
        // const formData: FormData<FormKeys> = {
        //     ...contactBody
        // }
        const result = await execute(formData);
        // return resultResponse(result);
        return result;
    }
}
