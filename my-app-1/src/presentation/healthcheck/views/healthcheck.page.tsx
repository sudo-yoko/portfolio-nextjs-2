import 'server-only';

import { executeAsync } from '@/presentation/_system/aop/aop.server';
import { handleRequest } from '@/presentation/healthcheck/view-models/healthcheck.handler.request';

export default async function Page() {
    return executeAsync(() => fn());
    async function fn() {
        const result = await handleRequest();
        return (
            <>
                <div>{result}</div>
            </>
        );
    }
}
