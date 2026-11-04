import 'server-only';

import { handleRequest } from '@/presentation/test/client/server/test.client.request-handler';
import Main from '@/presentation/test/client/views/test.client.main';

export default async function Page() {
    await handleRequest();
    return <Main />;
}
