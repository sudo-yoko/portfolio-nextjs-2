import 'server-only';

import { handleRequest } from '@/presentation/test/navigation/server/test.navigation.request-handler';
import Main from '@/presentation/test/navigation/views/test.navigation.main';

export default async function Page() {
    await handleRequest();
    return <Main />;
}
