import 'server-only';

import { withAdvice } from '@/presentation/_system/aspect/aspect.server';
import { authError } from '@/presentation/_system/error/error.factories';
import { SearchParams } from '@/presentation/_system/types/search-params';

export default function Page(props: { searchParams?: SearchParams }) {
    return withAdvice(() => {
        throw authError();
    });
    function _() {
        return (
            <>
                <div>エラーテストページ</div>
            </>
        );
    }
}
