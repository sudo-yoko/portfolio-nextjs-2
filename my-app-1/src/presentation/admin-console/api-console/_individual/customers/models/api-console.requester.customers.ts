import 'client-only';

import { Tag } from '@/presentation/_system/result/result.core.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

export const FormKeys = {
    customerId: 'customerId',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

type SendRequest = {
    (formData: FormData<FormKeys>): Promise<ApiResult>;
};

const mock: SendRequest = async () => {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    const result: ApiResult = {
        tag: Tag.OkData,
        data: {
            status: '200',
        },
    };
    return result;
};

export const sendRequest: SendRequest = mock;
