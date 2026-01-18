import 'client-only';

import { Tag } from '@/presentation/_system/result/result.core.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

type SendRequest = {
    (formData: FormData<FormKeys>): Promise<ApiResult>;
};

interface ResBody {
    customerId: string;
    customerName: string;
}

const mock: SendRequest = async () => {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const body: ResBody = {
        customerId: '1234567890',
        customerName: 'Gemini',
    };
    const result: ApiResult = {
        tag: Tag.OkData,
        data: {
            responseTime: '142',
            status: '200',
            body: JSON.stringify(body),
        },
    };
    return result;
};

export const sendRequest: SendRequest = mock;
