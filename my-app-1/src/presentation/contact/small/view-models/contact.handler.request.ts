//
// お問い合わせフォーム リクエストハンドラー
//
import 'server-only';

import logger from '@/presentation/_system/logging/logger.s';
import { getQueryParams, SearchParams } from '@/presentation/_system/types/search-params';
import { ContactParams } from '@/presentation/contact/small/models/contact.types';

const logPrefix = '/contact/small/view-models/request-handler.ts: ';

export async function handleRequest(props: { searchParams?: SearchParams }): Promise<ContactParams> {
    // クエリパラメータを取得する
    const params: ContactParams = await getQueryParams(props.searchParams, 'category', 'from');
    logger.info(logPrefix + `category=${params.category}, from=${params.from}`);
    return params;
}
