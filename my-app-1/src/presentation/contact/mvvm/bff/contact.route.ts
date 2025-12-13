import 'server-only';

import { withInterceptionAsync } from '@/presentation/(system)/interceptor/interceptor.bff.route';
import logger from '@/presentation/(system)/logging/logger.s';
import { bffRouteResponse } from '@/presentation/(system)/result/result.bff.factories.s';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { ContactBody, FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withInterceptionAsync(() => func());

  async function func() {
    const contactBody: ContactBody = await req.json();
    logger.info(logPrefix + `contactBody=${JSON.stringify(contactBody)}`);

    const formData: FormData<FormKeys> = {
      name: contactBody.name,
      email: contactBody.email,
      body: contactBody.body,
    };
    const result = await execute(formData);
    return bffRouteResponse(result);
  }
}
