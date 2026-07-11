//
// お問い合わせフォーム ページ
//
import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aop/aop.server';
import { SearchParams } from '@/presentation/_system/types/search-params';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact.handler.request';
import Main from '@/presentation/contact/mvvm/views/contact.component.main';

export default async function Page(props: { searchParams?: SearchParams }) {
    return await withAdviceAsync(() => _());

    async function _() {
        const _result = handleRequest(props);
        return (
            <>
                <div>
                    <Main />
                </div>
            </>
        );
    }
}
