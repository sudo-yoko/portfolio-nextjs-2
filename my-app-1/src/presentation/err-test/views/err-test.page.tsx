// 例外処理テスト用のページ
import 'server-only';

import { withAdvice, withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { applicationError, authError } from '@/presentation/_system/error/error.factories';
import { getStringParam, SearchParams } from '@/presentation/_system/types/search-params2';
import Input from '@/presentation/err-test/views/err-test.component.input';

export default async function Page(props: { searchParams?: SearchParams }) {
    return withAdvice(() => _());

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
                <Input err={err} />
            </>
        );
    }
}
