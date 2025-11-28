import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.route';
import logger from '@/presentation/(system)/logging/logger.s';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';

const logPrefix = '/contact/route.impl.ts: ';

export async function POST(req: Request): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const contactBody: ContactBody = await req.json();
    logger.info(logPrefix + `formData=${JSON.stringify(contactBody)}`);

    const result = await execute({ ...contactBody });
    return new Response(JSON.stringify(result), { status: 200 });
  }
}
