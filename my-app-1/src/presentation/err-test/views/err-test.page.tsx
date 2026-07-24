// 例外処理テスト用のページ
import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server';
import { applicationError } from '@/presentation/_system/error/error.factories';
import { getStringParam, SearchParams } from '@/presentation/_system/types/search-params';
import { send } from '@/presentation/err-test/bff/health-check.client';
import ErrTestInput from '@/presentation/err-test/views/err-test.input';

const logPrefix = 'err-test.page.tsx: ';

// NOTE: ページのコンポーネント名は固有の名前で付けてOK。export default されていること。
// NOTE: 固有の名前を付けることで、スタックトレースに関数名が出るので追いやすくなる。
// export default async function Page(props: { searchParams?: SearchParams }) {
export default async function ErrTestPage(props: { searchParams?: SearchParams }) {
    return await withAdviceAsync(() => _());

    async function _() {
        const err = await getStringParam(props.searchParams, 'err');
        switch (err) {
            case '11':
                // 認証エラーはenvのAUTH_ERROR=trueにしてテストする
                // throw authError({ location: 'ErrTestPage' });
                break;
            case '12':
                throw applicationError({ message: err, location: logPrefix + 'ErrTestPage' });
                break;
            case '13':
                await send();
                break;
        }
        return (
            <>
                <div>エラーテストページ</div>
                <ErrTestInput err={err} />
            </>
        );
    }
}
