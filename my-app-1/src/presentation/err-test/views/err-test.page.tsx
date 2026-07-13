// 例外処理テスト用のページ
import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { applicationError, authError } from '@/presentation/_system/error/error.factories';
import { getStringParam, SearchParams } from '@/presentation/_system/types/search-params2';

export default async function Page(props: { searchParams?: SearchParams }) {
    return withAdviceAsync(() => _());

    async function _() {
        const err = await getStringParam(props.searchParams, 'err');
        switch (err) {
            case '1':
                throw authError();
            case '2':
                throw applicationError();
        }
        return (
            <>
                <div>エラーテストページ</div>
            </>
        );
    }
}
