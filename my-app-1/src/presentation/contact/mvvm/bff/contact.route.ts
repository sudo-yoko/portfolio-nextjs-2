import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { bffRouteResponse } from '@/presentation/(system)/bff/bff.result.factories.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff.route';
import logger from '@/presentation/(system)/logging/logger.s';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.route.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const contactBody: ContactBody = await req.json();
    logger.info(logPrefix + `formData=${JSON.stringify(contactBody)}`);

    const result = await execute({ ...contactBody });
    return bffRouteResponse(result);
  }
}
