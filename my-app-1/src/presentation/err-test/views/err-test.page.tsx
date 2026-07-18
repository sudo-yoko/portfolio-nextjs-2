// 例外処理テスト用のページ
import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { applicationError, authError } from '@/presentation/_system/error/error.factories';
import { getStringParam, SearchParams } from '@/presentation/_system/types/search-params';
import { send } from '@/presentation/err-test/models/health-check.client';
import Input from '@/presentation/err-test/views/err-test.component.input';

export default async function Page(props: { searchParams?: SearchParams }) {
    return await withAdviceAsync(() => _());

    async function _() {
        const err = await getStringParam(props.searchParams, 'err');
        switch (err) {
            case '11':
                throw authError();
            case '12':
                throw applicationError({ message: err });
            case '13':
                await send();
        }
        return (
            <>
                <div>エラーテストページ</div>
                <Input err={err} />
            </>
        );
    }
}
