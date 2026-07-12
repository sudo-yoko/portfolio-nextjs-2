import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { handleRequest } from '@/presentation/healthcheck/view-models/healthcheck.handler.request';

export default async function Page() {
    return withAdviceAsync(() => _());
    async function _() {
        const result = await handleRequest();
        return (
            <>
                <div>{result}</div>
            </>
        );
    }
}
