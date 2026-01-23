import 'server-only';

import client from '@/presentation/_system/client/client.s';
import { env } from '@/presentation/_system/env/env.helper.validated';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import {
    FormKeys,
    requestConfig,
} from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { ApiResponse } from '@/presentation/admin-console/api-console/models/api-console.types';

const logPrefix = 'api-console.customers.client.ts: ';

export async function send(formData: FormData<FormKeys>): Promise<ApiResponse> {
    const start = performance.now();

    let url = env('CUSTOMERS_API');
    url = url.replaceAll('{:customerId}', formData.customerId);
    logger.info(logPrefix + `Request -> url=${url}`);

    // バックエンド呼び出し
    const result = await client.send({ url, ...requestConfig() });

    // 処理時間
    const end = performance.now();
    const duration = Math.floor(end - start);

    const response: ApiResponse = {
        status: result.status,
        body: result.rawBody,
        responseTime: duration,
    };
    return response;
}
