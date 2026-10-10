import 'server-only';

import { handleRequest } from '@/presentation/test/env/server/test.env.request-handler';
import Component from '@/presentation/test/env/views/test.env.component';

export default async function Page() {
    await handleRequest();
    return (
        <>
            <div>test!</div>
            <Component />
        </>
    );
}
