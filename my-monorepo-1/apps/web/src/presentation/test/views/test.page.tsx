import 'server-only';

import { handleRequest } from '@/presentation/test/server/test.request-handler';

export default async function Page() {
    await handleRequest();
    return (
        <>
            <div>test!</div>
        </>
    );
}
