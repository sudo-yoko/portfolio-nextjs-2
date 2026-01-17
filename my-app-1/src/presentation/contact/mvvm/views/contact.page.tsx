//
// お問い合わせフォーム ページ
//
import 'server-only';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.server';
import { SearchParams } from '@/presentation/_system/types/search-params';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact.handler.request';
import Main from '@/presentation/contact/mvvm/views/contact.component.main';

export default async function Page(props: { searchParams?: SearchParams }) {
    return await executeAsync(() => func());

    async function func() {
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
