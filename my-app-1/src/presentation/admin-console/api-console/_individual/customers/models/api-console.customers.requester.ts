import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { RequestConfig } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.c';
import { parseResult } from '@/presentation/_system/result/result.core.helpers';
import { Tag } from '@/presentation/_system/result/result.core.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { SendRequest } from '@/presentation/admin-console/api-console/_individual/_shared/models/api-console.individual.requester';
import {
    FormKeys,
    requestConfig,
} from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

const logPrefix = 'api-console.customers.requester.ts: ';

/**
 * Route Handlers 経由バックエンド呼び出し
 */
const viaRoute: SendRequest<FormKeys> = async (formData) => {
    const config: RequestConfig<never, FormData<FormKeys>> = {
        url: '/api/bff/admin-console/api-console/customers',
        query: formData,
        ...requestConfig(),
    };
    logger.info(logPrefix + `config=${JSON.stringify(config)}`);
    const res = await client.send(config);
    const result = parseResult(res.rawBody);
    return result as ApiResult<FormKeys>;
};

/**
 * バックエンド呼び出しのモックコード
 */
const _mock: SendRequest<FormKeys> = async () => {
    const start: number = performance.now();
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const body: {
        customerId: string;
        customerName: string;
    } = {
        customerId: '1234567890',
        customerName: 'Gemini',
    };
    const end: number = performance.now();
    const duration: number = Math.floor(end - start);
    const result: ApiResult<FormKeys> = {
        tag: Tag.OkData,
        data: {
            responseTime: duration,
            status: 200,
            body: JSON.stringify(body),
        },
    };
    return result;
};

export const sendRequest: SendRequest<FormKeys> = viaRoute;
