import 'client-only';

import { Tag } from '@/presentation/_system/result/result.core.types';
import { SendRequest } from '@/presentation/admin-console/api-console/_individual/_shared/models/api-console.individual.requester';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

interface ResBody {
    customerId: string;
    customerName: string;
}

const mock: SendRequest<FormKeys> = async () => {
    const start: number = performance.now();
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const body: ResBody = {
        customerId: '1234567890',
        customerName: 'Gemini',
    };
    const end: number = performance.now();
    const duration: number = Math.floor(end - start);
    const result: ApiResult = {
        tag: Tag.OkData,
        data: {
            responseTime: duration,
            status: '200',
            body: JSON.stringify(body),
        },
    };
    return result;
};

export const sendRequest: SendRequest<FormKeys> = mock;
