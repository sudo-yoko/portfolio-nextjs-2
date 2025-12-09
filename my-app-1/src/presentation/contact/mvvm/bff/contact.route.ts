import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { bffRouteResponse } from '@/presentation/(system)/result/result.bff.factories.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff.route';
import logger from '@/presentation/(system)/logging/logger.s';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { ContactBody, FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const contactBody: ContactBody  = await req.json();
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
