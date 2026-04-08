import 'server-only';

import { handleRequest } from '@/presentation/healthcheck/view-models/healthcheck.handler.request';

export default async function Page() {
    void handleRequest();
    return (
        <>
            <div>test</div>
        </>
    );
}
