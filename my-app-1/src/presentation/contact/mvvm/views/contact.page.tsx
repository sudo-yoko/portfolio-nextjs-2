//
// お問い合わせフォーム ページ
//
import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { SearchParams } from '@/presentation/_system/types/search-params3';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact.request-handler';
import Main from '@/presentation/contact/mvvm/views/contact.component.main';

export default async function Page(props: { searchParams?: SearchParams }) {
    return await withAdviceAsync(() => _());

    async function _() {
        const _result = await handleRequest(props);
        return (
            <>
                <div>
                    <Main />
                </div>
            </>
        );
    }
}
