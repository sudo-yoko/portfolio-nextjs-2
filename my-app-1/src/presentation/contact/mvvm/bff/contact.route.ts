import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import { deserUtil } from '@/presentation/_system/io/deserialize.utils';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { deserialize } from '@/presentation/contact/mvvm/models/contact.deserializer';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
    return await withAdviceAsync(() => _());
    // await withBodyParser(() => parse(req), (context:RouteContext<Body>) => _(context))
    // async function _(context: RouteContext<Body>) {
    async function _() {
        // TODO: Route Handler用のパーサー
        // const contactBody: ContactBody = await req.json();
        // NOTE: req.json()で取得すると型がanyになる。req.text()で取得するとstringになるので、こちらの方が扱いやすい
        // const body = await req.text();
        const { body } = await deserUtil.withErrorHandlingAsync(() => deserialize(req));
        // const body = context.body

        logger.info(logPrefix + `contactBody=${JSON.stringify(body)}`);

        // const formData: FormData<FormKeys> = {
        //     name: body.name,
        //     email: body.email,
        //     zipcode: body.zipcode,
        //     address1: body.address1,
        //     address2: body.address2,
        //     body: body.body,
        // };
        // TODO: 以下の書き方でもOK？
        // const formData: FormData<FormKeys> = {
        //     ...contactBody
        // }
        const result = await execute(body);
        // const result = await execute(formData);
        // return resultResponse(result);
        return result;
    }
}
