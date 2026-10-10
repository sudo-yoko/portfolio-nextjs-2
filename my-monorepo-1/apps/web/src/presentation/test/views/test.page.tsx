import 'server-only';

import { handleRequest } from '@/presentation/test/server/test.request-handler';
import Component from '@/presentation/test/views/test.component';

export default async function Page() {
    await handleRequest();
    return (
        <>
            <div>test!</div>
            <Component />
        </>
    );
}
