import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { Method, RequestConfig } from '@/presentation/_system/client/client.types';
import { deserUtil } from '@/presentation/_system/io/deserialize.utils';
import logger from '@/presentation/_system/logging/logger.c';
import { toQueryParams } from '@/presentation/_system/types/search-params';
import { deserialize } from '@/presentation/backend-lib/zipcloud/zipcloud.deserializer';
import { normalizeValue } from '@/presentation/backend-lib/zipcloud/zipcloud.normalizer';
import {
    ZipCloudRequest,
    ZipCloudResponse,
    ZipCloudResponseError,
} from '@/presentation/backend-lib/zipcloud/zipcloud.types';

const logPrefix = 'zipcloud.client.ts: ';

export async function requestAddress(req: ZipCloudRequest): Promise<ZipCloudResponse> {
    const { zipcode, limit } = req;
    const config: RequestConfig = {
        url: 'https://zipcloud.ibsnet.co.jp/api/search',
        method: Method.GET,
        query: toQueryParams({ zipcode, limit }),
        validateStatus: () => true,
    };
    const res = await client.send(config);

    // レスポンスを型付きオブジェクトにデシリアライズする
    const deserialized = (() => {
        if (res.status === 200) {
            const deserialized = deserUtil.withErrorHandling(() => deserialize(res.rawBody), {
                req: config,
                res,
            });
            if (deserialized.status !== 200) {
                void logger.errorAsync(
                    logPrefix + `zipCloudのエラー ${JSON.stringify({ res, deserialized })}`,
                );
            }
            return deserialized;
        } else {
            void logger.errorAsync(logPrefix + `zipCloudのエラー ${JSON.stringify(res)}`);
            const deserialized: ZipCloudResponseError = { status: res.status, message: res.rawBody };
            return deserialized;
        }
    })();

    // アプリケーション側で扱いやすい形に正規化する
    const normalized = normalizeValue(deserialized);
    return normalized;
}
