import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { Method, RequestConfig } from '@/presentation/_system/client/client.types';
import { deserUtil } from '@/presentation/_system/io/deserialize.utils';
import { toQueryParams } from '@/presentation/_system/types/search-params';
import { deserialize } from '@/presentation/backend-lib/zipcloud/zipcloud.deserializer';
import { ZipCloudRequest, ZipCloudResponse } from '@/presentation/backend-lib/zipcloud/zipcloud.types';

export async function requestAddress(req: ZipCloudRequest): Promise<ZipCloudResponse> {
    const { zipcode, limit } = req;
    const config: RequestConfig = {
        url: 'https://zipcloud.ibsnet.co.jp/api/search',
        method: Method.GET,
        query: toQueryParams({ zipcode, limit }),
        validateStatus: () => true,
    };
    const res = await client.send(config);
    const result = deserUtil.withErrorHandling(() => deserialize(res.rawBody), { req: config, res });
    return result;
}
