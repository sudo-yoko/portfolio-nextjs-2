import 'server-only';

import { ACCEPT_APPLICATION_JSON } from '@/presentation/_system/client/client.constants';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
// import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { ApiResponse } from '@/presentation/admin-console/api-console/models/api-console.types';

// const logPrefix = 'api-console.customers.client.ts: ';

/**
 * バックエンドのアドレス
 */
const url = (formData: FormData<FormKeys>): string => {
    const url = env('CUSTOMERS_API');
    const replaced = url.replaceAll('{:customerId}', formData.customerId);
    return replaced;
};

/**
 * バックエンドを呼び出す
 */
export async function send(formData: FormData<FormKeys>): Promise<ApiResponse> {
    const start = performance.now();

    // バックエンド呼び出し
    const result = await client.send({
        url: url(formData),
        method: Method.GET,
        headers: {
            ...ACCEPT_APPLICATION_JSON,
        },
    });

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
