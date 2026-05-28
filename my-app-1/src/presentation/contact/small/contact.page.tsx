//
// お問い合わせフォーム ページ
//
import 'server-only';

import { executeAsync } from '@/presentation/_system/aop/aop.server';
import logger from '@/presentation/_system/logging/logger.s';
import { getSearchParams, SearchParams } from '@/presentation/_system/types/search-params';
import Main from '@/presentation/contact/small/components/contact.main';
import { ContactParams } from '@/presentation/contact/small/models/contact.types';

const logPrefix = 'contact.handler.request.ts: ';

export default async function Page(props: { searchParams?: SearchParams }) {
    return await executeAsync(() => func());

    async function func() {
        // クエリパラメータを取得する
        const params: ContactParams = await getSearchParams(props.searchParams, 'category', 'from');
        logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
        return (
            <>
                <div>
                    <Main />
                </div>
            </>
        );
    }
}
