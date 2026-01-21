import 'client-only';

import { Tag } from '@/presentation/_system/result/result.core.types';
import { SendRequest } from '@/presentation/admin-console/api-console/_individual/_shared/models/api-console.individual.requester';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models//api-console.types';

interface Body {
    total: string;
    users: User[];
}

interface User {
    userId: string;
    userName: string;
}

const mock: SendRequest<FormKeys> = async (formData) => {
    const start = performance.now();
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });

    const total = 10;
    const users: User[] = [];
    for (let i = 1; i <= total; i++) {
        const userId = String(i).padStart(5, '0');
        const userName = `テスト 太郎 ${i}`;
        users.push({ userId, userName });
    }
    const segment = users.slice(
        Number(formData.offset) - 1,
        Number(formData.offset) + Number(formData.limit),
    );

    const status = '200';
    const body: Body = {
        total: String(total),
        users: segment,
    };
    const end = performance.now();
    const duration = Math.floor(end - start);
    const result: ApiResult = {
        tag: Tag.OkData,
        data: {
            status,
            body: JSON.stringify(body),
            responseTime: duration,
        },
    };
    return result;
};

export const sendRequest: SendRequest<FormKeys> = mock;
